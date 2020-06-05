using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    public class Security
    {
        public Security()
        {
            DataSeries = new List<DataSerie>();
        }

        public string Name                          { get; set; }

        public DateTime? Maturity                   { get; set; }

        public List<DataSerie> DataSeries           { get; set; }

        public SecurityType SecurityType            { get; set; }

        public double Strike                        { get; set; }
    }
}
