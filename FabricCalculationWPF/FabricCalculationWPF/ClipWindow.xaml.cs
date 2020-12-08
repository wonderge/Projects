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
    /// Interaction logic for ClipWindow.xaml
    /// </summary>
    public partial class ClipWindow : Window {
        public ClipWindow() {
            InitializeComponent();
        }

        private void btnCalculate_Click(object sender, RoutedEventArgs e) {
            double amount, length, width, fabricWidth, skirtAmount, skirtLength;
            double.TryParse(txtAmount.Text, out amount);
            double.TryParse(txtLength.Text, out length);
            double.TryParse(txtWidth.Text, out width);
            double.TryParse(txtFabricWidth.Text, out fabricWidth);
            double.TryParse(txtSkirtAmount.Text, out skirtAmount);
            double.TryParse(txtSkirtLength.Text, out skirtLength);

            double yards = (amount * skirtLength * skirtAmount) / Math.Floor(fabricWidth / length) * width / 36;
            double meters = yards * 36 / 39;

            lblResult.Text = $"{yards * 1.03 + 0.1:F1}y\n{meters * 1.03 + 0.1:F1}m";
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
            txtLength.Text = "";
            txtWidth.Text = "";
            txtFabricWidth.Text = "";
            txtSkirtAmount.Text = "";
            txtSkirtLength.Text = "";
            lblResult.Text = "";
        }
    }
}
