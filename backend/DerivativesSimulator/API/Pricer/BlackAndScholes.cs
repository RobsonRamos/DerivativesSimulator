using API.Math;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Pricer
{
    public static class BlackAndScholes
    {

        public static double ComputePrice(double S, double K, double r, double sigma, double T, double t)
        {
            // ((LN(J10/$J$2))+($J$3+(0,5*($J$4^2)))*(J11-$J$5))/($J$4*RAIZ(J11-$J$5))
            return S * 
                StandardNormalDistribution.NormSDist(D1(S, K, r, sigma, T, t))
                    - K * (System.Math.Exp(-r * (T - t)) * 
                    StandardNormalDistribution.NormSDist(D2(S, K, r, sigma, T, t)));
        }

        private static double D1(double S, double K, double r, double sigma, double T, double t)
        {
            // ((LN(J10/$J$2))+($J$3+(0,5*($J$4^2)))*(J11-$J$5))/($J$4*RAIZ(J11-$J$5))
            return (System.Math.Log(S / K) + ((r + 0.5 * System.Math.Pow(sigma, 2.0))*(T - t) )) / (sigma * System.Math.Pow((T - t),  0.5));
        }

        private static double D2(double S, double K, double r, double sigma, double T, double t)
        {
            return D1(S, K, r, sigma, T, t) - sigma * System.Math.Pow((T - t), 0.5);
        }
    }
}
