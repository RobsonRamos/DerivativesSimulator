using API.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Math
{
    public static class ReturnCalculator
    {
        public static void ComputeReturn(List<DataSerie> data)
        {
            data = data.OrderByDescending(x => x.Date).ToList();

            data.ForEach(x =>
            {
                var previousPrice = data.FirstOrDefault(y => y.Date < x.Date);

                if (previousPrice != null)
                {
                    x.Return = System.Math.Log(x.Price / previousPrice.Price);
                }
            });
        }
    }
}
