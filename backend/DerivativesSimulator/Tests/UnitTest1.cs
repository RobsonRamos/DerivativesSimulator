using API;
using API.Math;
using API.Pricer;
using API.Service;
using NUnit.Framework;
using System;

namespace Tests
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void Test1()
        {
            var service = new DerivativeService();
            service.ComputeSimulation(null);

            /* new SecurityRepository();

            var price = Black76.ComputePrice(
                4153.6730,
                3000,
                4.5 / 100,
                0.712553464/100,
                27.0/252.0,
                0
                );

            Console.WriteLine(price); */
        }
    }
}