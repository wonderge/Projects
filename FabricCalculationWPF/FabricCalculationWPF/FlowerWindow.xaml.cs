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
    /// Interaction logic for FlowerWindow.xaml
    /// </summary>
    public partial class FlowerWindow : Window {
        public FlowerWindow() {
            InitializeComponent();
        }

        private void btnCalculate_Click(object sender, RoutedEventArgs e) {
            TextBox[] txtFlower = { txt80, txt70, txt60, txt50, txt40, txt30, txt20, txt15, txt10 };
            double[] amount = new double[txtFlower.Length];

            for (int i = 0; i < txtFlower.Length; i++) {
                double.TryParse(txtFlower[i].Text, out amount[i]);
            }

            double length, width;
            double.TryParse(txtLength.Text, out length);
            double.TryParse(txtWidth.Text, out width);
            double paperArea = length * width;

            double[] area = new double[9];
            area[0] = 9 * 1152 + 8 * 896 + 7 * 700 + 6 * 528 + 5 * 462 + 8 * 360 + 6 * 255 + 3 * 156 + 4 * 132;
            area[1] = 8 * 896 + 7 * 700 + 6 * 528 + 5 * 462 + 8 * 360 + 6 * 255 + 3 * 156 + 4 * 132;
            area[2] = 7 * 700 + 6 * 528 + 5 * 462 + 8 * 360 + 6 * 255 + 3 * 156 + 4 * 132;
            area[3] = 6 * 528 + 5 * 462 + 8 * 360 + 6 * 255 + 3 * 156 + 4 * 132;
            area[4] = 5 * 462 + 8 * 360 + 6 * 255 + 3 * 156 + 4 * 132;
            area[5] = 6 * 196 + 5 * 144 + 6 * 121 + 3 * 72 + 5 * 56;
            area[6] = 5 * 144 + 6 * 121 + 3 * 72 + 5 * 56;
            area[7] = 6 * 56 + 5 * 42 + 3 * 30 + 3 * 25;
            area[8] = 6 * 42 + 5 * 30 + 5 * 25 + 16;

            double required = 0;

            for (int i = 0; i < area.Length; i++) {
                required += area[i] / paperArea * amount[i];
            }

            lblResult.Text = $"{required * 1.03 + 0.1:F1}pcs";
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
            txt10.Text = "";
            txt15.Text = "";
            txt20.Text = "";
            txt30.Text = "";
            txt40.Text = "";
            txt50.Text = "";
            txt60.Text = "";
            txt70.Text = "";
            txt80.Text = "";
            txtLength.Text = "";
            txtWidth.Text = "";
        }
    }
}
