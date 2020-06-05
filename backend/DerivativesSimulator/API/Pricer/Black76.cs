using API.Math;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace API.Pricer
{
    public static class Black76
    {
        public static double ComputePrice(double S, double K, double r, double sigma, double T, double t)
        {
            // ((LN(J10/$J$2))+($J$3+(0,5*($J$4^2)))*(J11-$J$5))/($J$4*RAIZ(J11-$J$5))
            return System.Math.Exp(-r * T) *
                (S * StandardNormalDistribution.NormSDist(D1(S, K, r, sigma, T, t))
                -
                K * StandardNormalDistribution.NormSDist(D2(S, K, r, sigma, T, t)));
        }

        private static double D1(double S, double K, double r, double sigma, double T, double t)
        {
            // ((LN(J10/$J$2))+($J$3+(0,5*($J$4^2)))*(J11-$J$5))/($J$4*RAIZ(J11-$J$5))
            return (System.Math.Log(S / K) + (System.Math.Pow(sigma, 2.0)/2))/(sigma * System.Math.Pow((T - t), 0.5));
        }

        private static double D2(double S, double K, double r, double sigma, double T, double t)
        {
            return D1(S, K, r, sigma, T, t) - sigma * System.Math.Pow((T - t), 0.5);
        }
    }
}
