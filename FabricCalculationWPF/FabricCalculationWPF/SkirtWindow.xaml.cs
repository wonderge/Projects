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
    /// <summary>
    /// Interaction logic for SkirtWindow.xaml
    /// </summary>
    public partial class SkirtWindow : Window {
        public SkirtWindow() {
            InitializeComponent();
        }

        private void btnCalculate_Click(object sender, RoutedEventArgs e) {
            double amount, feet, inch, height, fabricWidth, fabricAmount;
            double.TryParse(txtAmount.Text, out amount);
            double.TryParse(txtFabricAmount.Text, out fabricAmount);
            double.TryParse(txtFabricWidth.Text, out fabricWidth);
            double.TryParse(txtFeet.Text, out feet);
            double.TryParse(txtHeight.Text, out height);
            double.TryParse(txtInch.Text, out inch);

            double multiplier = GetMultiplier();
            double length = (feet * 12 + inch) * multiplier + ExtraLength();
            height += ExtraHeight();

            double ratio = fabricWidth / height;
            double yards, meters;

            if (fabricAmount == 0) {
                if (ratio >= 2) {
                    yards = Math.Ceiling(height / fabricWidth * amount) * length / 36;
                } else {
                    yards = Math.Ceiling(length / fabricWidth * amount) * height / 36;
                }
                meters = yards * 36 / 39;
                lblResult.Text = $"{yards * 1.03 + 0.1:F1}y\n{meters * 1.03 + 0.1:F1}m";
            } else if (amount == 0) {
                if (ratio >= 2) {
                    amount = Math.Floor(fabricAmount * 36 / length / (height / fabricWidth) / 1.03);
                } else {
                    amount = Math.Floor(fabricAmount * 36 / height / (length / fabricWidth) / 1.03);
                }
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

        private double GetMultiplier() {
            if (radBtnDense.IsChecked.Value) {
                return 2.5;
            } else if (radBtnPleat.IsChecked.Value || radBtnOne.IsChecked.Value || radBtnTwo.IsChecked.Value || radBtnThree.IsChecked.Value) {
                return 3;
            } else {
                return 1;
            }
        }

        private double ExtraHeight() {
            if (radBtnHemmed.IsChecked.Value) {
                return 1.5;
            } else if (radBtnMarrow.IsChecked.Value) {
                return 0.5;
            } else {
                return 0;
            }
        }

        private double ExtraLength() {
            if (radBtnHemmed.IsChecked.Value) {
                return 2;
            } else {
                return 0;
            }
        }

        private void Clear() {
            txtAmount.Text = "";
            txtFabricAmount.Text = "";
            txtFabricWidth.Text = "";
            txtFeet.Text = "";
            txtHeight.Text = "";
            txtInch.Text = "";
            lblResult.Text = "";
        }
    }
}
