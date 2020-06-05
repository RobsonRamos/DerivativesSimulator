using API.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Math
{
    public static class StdDev
    {
        public static double ComputeStdDev(List<DataSerie> data, int timeWindow)
        {
            data = data.OrderByDescending(x => x.Date).Take(timeWindow).ToList();

            double ret = 0;

            if (data.Count() > 0)
            {
                //Compute the Average      
                double avg = data.Select(x => x.Return).Average();

                //Perform the Sum of (value-avg)_2_2      
                double sum = data.Select(x => x.Return).Sum(d => System.Math.Pow(d - avg, 2));

                //Put it all together      
                ret = System.Math.Sqrt((sum) / (data.Count() - 1));
            }
            return ret;
        }
    }
}
