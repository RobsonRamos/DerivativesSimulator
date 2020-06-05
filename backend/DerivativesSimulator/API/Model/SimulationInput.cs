using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    public class SimulationInput
    {
        public int? TimeWindow  { get; set; }

        public double? RiskFree { get; set; }

        public double? Sigma    { get; set; }

        public double? Lambda   { get; set; }
    }
}
