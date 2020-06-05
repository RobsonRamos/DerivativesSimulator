using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    public class DataSerie
    {
        public DateTime Date            { get; set; }

        public double Price             { get; set; }

        public double Return            { get; set; }

        public int? TTM                 { get; set; }

        public double Weight            { get; set; }
    }
}
