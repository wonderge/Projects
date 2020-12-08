using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FabricCalculationWPF
{
    class Number
    {
        /// <summary>
        /// Rounds a value to a specified number of decimal places
        /// </summary>
        /// <param name="value">The value to be rounded</param>
        /// <param name="decimalPlaces">The number of decimal places</param>
        /// <returns>The rounded value to the number of decimal places</returns>
        public static double Round(double value, int decimalPlaces)
        {
            double powerOfTen = 10 * decimalPlaces;
            return Math.Round(value * powerOfTen) / powerOfTen;
        }
    }
}
