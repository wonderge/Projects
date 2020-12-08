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
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace FabricCalculationWPF
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class StartWindow : Window
    {
        public StartWindow()
        {
            InitializeComponent();
        }

        private void btnNapkin_Click(object sender, RoutedEventArgs e)
        {
            new NapkinWindow().Show();
            Close();
        }

        private void btnTablecloth_Click(object sender, RoutedEventArgs e)
        {
            new TableclothTypeWindow().Show();
            Close();
        }

        private void btnSkirt_Click(object sender, RoutedEventArgs e)
        {
            new SkirtWindow().Show();
            Close();
        }

        private void btnClip_Click(object sender, RoutedEventArgs e)
        {
            new ClipWindow().Show();
            Close();
        }

        private void btnSash_Click(object sender, RoutedEventArgs e)
        {
            new SashWindow().Show();
            Close();
        }

        private void btnFabricAmountWeight_Click(object sender, RoutedEventArgs e)
        {
            new FabricWeightAmountWindow().Show();
            Close();
        }

        private void btnFlower_Click(object sender, RoutedEventArgs e)
        {
            new FlowerWindow().Show();
            Close();
        }

        private void btnChaircover_Click(object sender, RoutedEventArgs e)
        {
            new ChaircoverWindow().Show();
            Close();
        }
    }
}
