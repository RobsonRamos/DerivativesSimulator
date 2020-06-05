using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    public class SimulationDataSerie
    {
        public DateTime Date                    { get; set; }

        public double Volatility                { get; set; }

        public double BlackAndScholesPrice      { get; set; }

        public double Black76Price              { get; set; }

        public double MarketPrice               { get; set; }

        public double UnderlyingPrice           { get; set; }

        public double EWMAVol                   { get; set; }

        public double Black76PriceEWMA          { get; set; }

        public double BlackAndScholesPriceEWMA { get;  set; }
    }
}
