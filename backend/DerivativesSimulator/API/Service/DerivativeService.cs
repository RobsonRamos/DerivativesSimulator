using API.Math;
using API.Model;
using API.Pricer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Service
{
    public class DerivativeService
    {
        SecurityRepository _repository;

        public DerivativeService()
        {
            _repository = new SecurityRepository();
        }

        public SimulationOutput ComputeSimulation(SimulationInput input)
        {
            var securities = _repository.GetSecurities();
            var underlying = securities.FirstOrDefault(x => x.SecurityType == SecurityType.Underlying);
            var future = securities.FirstOrDefault(x => x.SecurityType == SecurityType.Future);
            var call = securities.FirstOrDefault(x => x.SecurityType == SecurityType.Option);

            ReturnCalculator.ComputeReturn(underlying.DataSeries);

            var output = new SimulationOutput();
            output.Type = SimulationType.FixedVol;

            if (input != null && input.TimeWindow.HasValue)
            {
                output.TimeWindow = input.TimeWindow;
            }
            else
            {
                output.TimeWindow = 252;
            }

            if (input != null && input.Sigma.HasValue && input.Sigma.Value != 0)
            {
                output.Sigma = input.Sigma / 100;
            }
            else
            {
                output.Sigma = StdDev.ComputeStdDev(underlying.DataSeries, 252);
            } 

            if (input != null && input.RiskFree.HasValue)
            {
                output.RiskFree = input.RiskFree / 100;
            }
            else
            {
                output.RiskFree = 4.5 / 100;
            }


            var minDate = call.DataSeries.Min(x => x.Date);

            var initialVol = EWMA.ComputeInitalVol(underlying.DataSeries, input.Lambda.Value, minDate, input.TimeWindow.Value);

            var count = 0;
            double volYesterday = 0, returnYesterday = 0;

            call.DataSeries
                .OrderByDescending(x => x.Date)
                .ToList()
                .ForEach(x =>
                {
                    var underPrice = future.DataSeries.Where(y => y.Date == x.Date).FirstOrDefault();

                    if (underPrice != null)
                    {
                        var simulationDataSerie = new SimulationDataSerie();
                        simulationDataSerie.Volatility = output.Sigma.Value;
                        simulationDataSerie.Date = x.Date;
                        simulationDataSerie.BlackAndScholesPrice =
                            BlackAndScholes.ComputePrice(underPrice.Price, call.Strike, output.RiskFree.Value, output.Sigma.Value, (x.TTM.Value / 252.0), 0);

                        simulationDataSerie.Black76Price =
                            Black76.ComputePrice(underPrice.Price, call.Strike, output.RiskFree.Value, output.Sigma.Value, (x.TTM.Value / 252.0), 0);

                        simulationDataSerie.UnderlyingPrice = underPrice.Price;
                        simulationDataSerie.MarketPrice = x.Price;

                        if (count == 0)
                        {
                            simulationDataSerie.EWMAVol = initialVol;                            
                        }
                        else
                        {
                            simulationDataSerie.EWMAVol  = EWMA.ComputeVol(volYesterday, returnYesterday, input.Lambda.Value);
                        }

                        simulationDataSerie.BlackAndScholesPriceEWMA =
                            BlackAndScholes.ComputePrice(underPrice.Price, call.Strike, output.RiskFree.Value, simulationDataSerie.EWMAVol * 100, (x.TTM.Value / 252.0), 0);

                        simulationDataSerie.Black76PriceEWMA =
                            Black76.ComputePrice(underPrice.Price, call.Strike, output.RiskFree.Value, simulationDataSerie.EWMAVol, (x.TTM.Value / 252.0), 0);

                        returnYesterday =  underlying.DataSeries.OrderByDescending(y => y.Date).First( y => y.Date < x.Date).Return;
                        volYesterday = simulationDataSerie.EWMAVol;

                        output.DataSeries.Add(simulationDataSerie);
                        count++;
                    }
                });

            output.DataSeries = output.DataSeries.OrderBy(x => x.Date).ToList();

            return output;
        }
    }
}
