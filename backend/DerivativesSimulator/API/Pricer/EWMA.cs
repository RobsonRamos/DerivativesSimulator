using API.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Pricer
{
    public static class EWMA
    {
        public static double ComputeVol(double volYesterday, double returnYesterday, double lamda)
        {
            // =$G$2*G7+(1-$G$2)*F7
            return System.Math.Sqrt(
                lamda * System.Math.Pow(volYesterday, 2) + (1 - lamda) * System.Math.Pow(returnYesterday, 2));
        }

        public static double ComputeInitalVol(List<DataSerie> dataSeries, double lambda, DateTime sinceDate, int timeWindow)
        {
            var count = 0;
            //=(1-Lambda)*Lambda^(I6)
            dataSeries = dataSeries.Where(x => x.Date < sinceDate).OrderByDescending(x => x.Date).Take(timeWindow).ToList();

            foreach (var data in dataSeries)
            {
                if (lambda == 1)
                {
                    data.Weight = 1;
                }
                else
                {
                    data.Weight = (1 - lambda) * System.Math.Pow(lambda, count);
                }
                count++;
            }

            var vol = System.Math.Sqrt(dataSeries.Sum(x => x.Weight * System.Math.Pow(x.Return, 2)));
            return vol;

        }
    }
}
