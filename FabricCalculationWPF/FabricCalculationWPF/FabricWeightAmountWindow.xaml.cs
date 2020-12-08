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
    /// Interaction logic for FabricWeightAmountWindow.xaml
    /// </summary>
    public partial class FabricWeightAmountWindow : Window
    {
        public FabricWeightAmountWindow()
        {
            InitializeComponent();
        }

        private void btnCalculate_Click(object sender, RoutedEventArgs e)
        {
            double weight, tubeWeight = 0, fabricWeight = 0;
            double.TryParse(txtWeight.Text, out weight);
            weight = weight * 1000;

            if (radBtnSatin.IsChecked.Value)
            {
                fabricWeight = 210;
            }

            else if (radBtnPoplin.IsChecked.Value)
            {
                fabricWeight = 250;
            }

            if (radBtnBig.IsChecked.Value)
            {
                tubeWeight = 278;
            }

            else if (radBtnSmall.IsChecked.Value)
            {
                tubeWeight = 220;
            }

            double result = (weight - tubeWeight) / fabricWeight;
            result = Number.Round(result, 1);
            lblResult.Text = $"{result:F1}y";
        }
    }
}
