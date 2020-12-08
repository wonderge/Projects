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
    /// Interaction logic for FabricWeightAmountWindow.xaml
    /// </summary>
    public partial class FabricWeightAmountWindow : Window {
        public FabricWeightAmountWindow() {
            InitializeComponent();
        }

        private void btnCalculate_Click(object sender, RoutedEventArgs e) {
            double weight, tubeWeight, fabricWeight, fabricAmount, result;
            double.TryParse(txtWeight.Text, out weight);
            double.TryParse(txtFabricAmount.Text, out fabricAmount);
            weight = weight * 1000;

            tubeWeight = GetTubeWeight();
            fabricWeight = GetFabricWeight();

            if (fabricAmount == 0) {
                result = (weight - tubeWeight) / fabricWeight;
                lblResult.Text = $"{result:F1}y";
            } else if (weight == 0) {
                result = fabricAmount * fabricWeight + tubeWeight;
                lblResult.Text = $"{result / 1000:F1}kg";
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

        private double GetTubeWeight() {
            if (radBtnSmall.IsChecked.Value) {
                return 220;
            } else if (radBtnBig.IsChecked.Value) {
                return 278;
            } else {
                return 0;
            }
        }

        private double GetFabricWeight() {
            if (radBtnPoplin.IsChecked.Value) {
                return 250;
            } else if (radBtnSatin.IsChecked.Value) {
                return 210;
            } else {
                return 0;
            }
        }

        private void Clear() {
            txtWeight.Text = "";
            lblResult.Text = "";
        }
    }
}
