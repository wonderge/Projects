using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace FabricCalculationWPF
{
    /// <summary>
    /// Interaction logic for RoundclothWindow.xaml
    /// </summary>
    public partial class RoundclothWindow : Window
    {
        public RoundclothWindow()
        {
            InitializeComponent();
        }

        private void btnCalculate_Click(object sender, RoutedEventArgs e)
        {
            double amount, diameter, fabricWidth, fabricAmount;
            double.TryParse(txtAmount.Text, out amount);
            double.TryParse(txtDiameter.Text, out diameter);
            double.TryParse(txtFabricAmount.Text, out fabricAmount);
            double.TryParse(txtFabricWidth.Text, out fabricWidth);

            double radius = diameter / 2;
            double halffabricWidth = fabricWidth / 2;
            double[] sideLength = CalculateSidePieceLength(fabricWidth, diameter);

            double yards = 0, meters = 0;

            if (fabricAmount == 0) {
                if ((diameter / fabricAmount) < 1) {
                    yards = diameter * amount / 36;
                } else if ((diameter / fabricWidth) < 2) {
                    yards = ((diameter + sideLength[0]) * amount + sideLength[0] * Math.Ceiling((radius - fabricWidth) * 2 * amount / fabricWidth)) / 36;
                } else {
                    yards = ((diameter + sideLength[0]) * amount + sideLength[1] * Math.Ceiling((radius - fabricWidth) * 2 * amount / fabricWidth)) / 36;
                }
                meters = yards * 36 / 39;
                lblResult.Text = $"{yards * 1.03 + 0.1:F1}y\n{meters * 1.03 + 0.1:F1}m";
            } else if (amount == 0) {
                amount = Math.Floor(fabricAmount * 36 / (sideLength[1] * ((radius - fabricWidth) * 2 / fabricWidth) + (diameter + sideLength[0])) / 1.03);
                lblResult.Text = $"{amount:F0}pcs";
            }

        }

        private void btnClear_Click(object sender, RoutedEventArgs e) {
            Clear();
        }

        private void btnBack_Click(object sender, RoutedEventArgs e) {
            Clear();
            new StartWindow().Show();
            Close();
        }

        private double[] CalculateSidePieceLength(double fabricWidth, double diameter) {
            double halfFabricWidth = fabricWidth / 2;
            double radius = diameter / 2;
            double[] sideLength = { 0, 0 };

            if ((diameter / fabricWidth) < 1) {
                sideLength = new double[]{ 0, 0 };
            } else if ((diameter / fabricWidth) < 2) {
                sideLength[0] = Math.Ceiling(Math.Sqrt(Math.Pow(radius, 2) - Math.Pow(halfFabricWidth, 2)) * 2);
                sideLength[1] = 0;
            } else {
                sideLength[0] = Math.Ceiling(Math.Sqrt(Math.Pow(radius, 2) - Math.Pow(halfFabricWidth, 2)) * 2);
                sideLength[1] = Math.Ceiling(Math.Sqrt(Math.Pow(radius, 2) - Math.Pow(fabricWidth, 2)) * 2);
            }

            return sideLength;
        }

        private void Clear() {
            txtAmount.Text = "";
            txtDiameter.Text = "";
            txtFabricAmount.Text = "";
            txtFabricWidth.Text = "";
            lblResult.Text = "";
        }
    }
}
