using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    public class SimulationOutput
    {
        public SimulationOutput()
        {
            DataSeries = new List<SimulationDataSerie>();
        }

        public double? RiskFree         { get; set; }

        public double? Sigma            { get; set; }

        public double? Lambda           { get; set; }

        public SimulationType Type      { get; set; }

        public List<SimulationDataSerie> DataSeries { get; set; }

        public int? TimeWindow          { get; set; }
    }
}
