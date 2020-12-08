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

namespace FabricCalculationWPF {
    public partial class NapkinWindow : Window {
        public NapkinWindow() {
            InitializeComponent();
        }

        private void btnCalculate_Click(object sender, RoutedEventArgs e) {
            double amount, fabricWidth, length, width, fabricAmount, meters, yards;
            double.TryParse(txtAmount.Text.ToString(), out amount);
            double.TryParse(txtFabricWidth.Text.ToString(), out fabricWidth);
            double.TryParse(txtLength.Text.ToString(), out length);
            double.TryParse(txtWidth.Text.ToString(), out width);
            double.TryParse(txtFabricAmount.Text.ToString(), out fabricAmount);

            if (radBtnhemmed.IsChecked.Value) {
                length += 1.5;
                width += 1.5;
            }

            if (fabricWidth % length < fabricWidth % width) {
                (yards, meters, amount) = CalculateAmounts(amount, length, width, fabricWidth, fabricAmount);
                lblResult.Text = GetLabelText(yards, meters, amount);
            } else {
                (yards, meters, amount) = CalculateAmounts(amount, width, length, fabricWidth, fabricAmount);
                lblResult.Text = GetLabelText(yards, meters, amount);
            }
        }

        private (double yards, double meters, double amount) CalculateAmounts(double amount, double side1, double side2, double fabricWidth, double fabricYard) {
            double yards = 0, meters = 0, resultAmount = 0;
            if (fabricYard == 0) {
                yards = Math.Ceiling(amount / Math.Floor(fabricWidth / side1)) * side2 / 36;
                meters = (yards * 36) / 39;
            } else {
                resultAmount = Math.Floor(fabricYard * 36 / side2 * Math.Floor(fabricWidth / side1) / 1.03);
            }
            return (yards, meters, resultAmount);
        }

        private string GetLabelText(double yards, double meters, double amount) {
            if (amount == 0) {
                return $"{yards * 1.03 + 0.1:F1}y\n{meters * 1.03 + 0.1:F1}m";
            } else {
                return $"{amount / 1.03:F0}pcs";
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

        private void Clear() {
            txtAmount.Text = "";
            txtFabricWidth.Text = "";
            txtFabricAmount.Text = "";
            txtLength.Text = "";
            txtWidth.Text = "";
            lblResult.Text = "";
        }
    }
}
