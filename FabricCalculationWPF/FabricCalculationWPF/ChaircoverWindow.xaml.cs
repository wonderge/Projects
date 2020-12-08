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
    /// Interaction logic for ChaircoverWindow.xaml
    /// </summary>
    public partial class ChaircoverWindow : Window {
        public ChaircoverWindow() {
            InitializeComponent();
        }

        private void btnCalculate_Click(object sender, RoutedEventArgs j) {
            double amount, fabricWidth, a, b, c, d, e, f, g, h;
            double.TryParse(txtAmount.Text, out amount);
            double.TryParse(txtFabricWidth.Text, out fabricWidth);
            double.TryParse(txtA.Text, out a);
            double.TryParse(txtB.Text, out b);
            double.TryParse(txtC.Text, out c);
            double.TryParse(txtD.Text, out d);
            double.TryParse(txtE.Text, out e);
            double.TryParse(txtF.Text, out f);
            double.TryParse(txtG.Text, out g);
            double.TryParse(txtH.Text, out h);
            List<double> lengths = new List<double>();
            List<double> ratios = new List<double>();
            double ratio = 0;

            if (a > h) {
                h = a;
            }

            if (a > d) {
                d = a;
            }

            lengths.Add(b + c);
            ratio = Math.Floor(fabricWidth / h);
            ratio = ratio + Math.Floor((fabricWidth - ratio * h) / d);
            ratios.Add(ratio);

            lengths.Add(b + e);
            ratio = Math.Floor(fabricWidth / d);
            ratio = ratio + Math.Floor((fabricWidth - ratio * d) / h);
            ratios.Add(ratio);

            if (f + 2 * g > 60) {
                lengths.Add(f + 2 * g);
                ratios.Add(Math.Floor(fabricWidth / c));
            } else {
                lengths.Add(c);
                ratios.Add(Math.Floor(fabricWidth / (f + 2 * g)));
            }

            while (amount % ratios[0] != 0) {
                amount++;
            }

            double total = 0;
            for (int i = 0; i < lengths.Count; i++) {
                total += (lengths[i] / ratios[i]) * amount;
            }

            double meters = total / 39;
            double yards = total / 36;

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
            txtA.Text = "";
            txtB.Text = "";
            txtC.Text = "";
            txtD.Text = "";
            txtE.Text = "";
            txtF.Text = "";
            txtG.Text = "";
            txtH.Text = "";
            txtAmount.Text = "";
            txtFabricWidth.Text = "";
            lblResult.Text = "";
        }
    }
}
