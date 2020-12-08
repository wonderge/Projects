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
    /// Interaction logic for TableclothWindow.xaml
    /// </summary>
    public partial class TableclothWindow : Window {
        public TableclothWindow() {
            InitializeComponent();
        }

        private void btnCalculate_Click(object sender, RoutedEventArgs e) {
            double amount, length, width, fabricWidth, fabricAmount;
            double.TryParse(txtAmount.Text, out amount);
            double.TryParse(txtFabricAmount.Text, out fabricAmount);
            double.TryParse(txtFabricWidth.Text, out fabricWidth);
            double.TryParse(txtLength.Text, out length);
            double.TryParse(txtWidth.Text, out width);

            double ratio, leftover, pieces, meters, yards;

            if (radBtnHemmed.IsChecked.Value) {
                length += 1.5;
                width += 1.5;
            }

            int joints = GetJoints();
            
            if (joints == 0) {
                ratio = 1;
            } else if (joints == 1) {
                leftover = width - fabricWidth;
                pieces = Math.Floor(fabricWidth / leftover);
                ratio = (fabricWidth + (fabricWidth / pieces)) / fabricWidth;
            } else {
                leftover = (width - fabricWidth) / 2;
                pieces = Math.Floor(fabricWidth / leftover);
                ratio = (fabricWidth + (fabricWidth / pieces) * 2) / fabricWidth;
            }

            if (fabricAmount == 0) {
                yards = Math.Ceiling(ratio * amount) * length / 36;
                meters = yards * 36 / 39;

                if (joints == 0 && width > fabricWidth) {
                    (yards, meters) = (0, 0);
                }

                lblResult.Text = $"{yards * 1.03 + 0.1:F1}y\n{meters * 1.03 + 0.1:F1}m";
            } else if (amount == 0) {
                amount = Math.Floor(fabricAmount / 1.03 * 36 / length / (ratio * amount) / 1.03);
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

        private int GetJoints() {
            if (radBtnOneJoint.IsChecked.Value) {
                return 1;
            } else if (radBtnTwoJoints.IsChecked.Value) {
                return 2;
            } else {
                return 0;
            }
        }

        private void Clear() {
            txtAmount.Text = "";
            txtFabricAmount.Text = "";
            txtFabricWidth.Text = "";
            txtLength.Text = "";
            txtWidth.Text = "";
        }
    }
}
