// Updated by XamlIntelliSenseFileGenerator 08/12/2020 11:36:56 AM
#pragma checksum "..\..\WeightAmountWindow.xaml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "44AC1185C6AFDCE39681539E597981E44AF85B0771AD6140CD58C58B467AA97D"
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using FabricCalculationWPF;
using System;
using System.Diagnostics;
using System.Windows;
using System.Windows.Automation;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Markup;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Effects;
using System.Windows.Media.Imaging;
using System.Windows.Media.Media3D;
using System.Windows.Media.TextFormatting;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Windows.Shell;


namespace FabricCalculationWPF {


    /// <summary>
    /// FabricWeightAmountWindow
    /// </summary>
    public partial class FabricWeightAmountWindow : System.Windows.Window, System.Windows.Markup.IComponentConnector {


#line 16 "..\..\WeightAmountWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBox txtWeight;

#line default
#line hidden


#line 21 "..\..\WeightAmountWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.RadioButton radBtnSatin;

#line default
#line hidden


#line 22 "..\..\WeightAmountWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.RadioButton radBtnPoplin;

#line default
#line hidden


#line 26 "..\..\WeightAmountWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.RadioButton radBtnSmall;

#line default
#line hidden


#line 27 "..\..\WeightAmountWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.RadioButton radBtnBig;

#line default
#line hidden


#line 30 "..\..\WeightAmountWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Button btnCalculate;

#line default
#line hidden


#line 31 "..\..\WeightAmountWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBlock lblResult;

#line default
#line hidden


#line 35 "..\..\WeightAmountWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Button btnClear;

#line default
#line hidden


#line 41 "..\..\WeightAmountWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Button btnBack;

#line default
#line hidden

        private bool _contentLoaded;

        /// <summary>
        /// InitializeComponent
        /// </summary>
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [System.CodeDom.Compiler.GeneratedCodeAttribute("PresentationBuildTasks", "4.0.0.0")]
        public void InitializeComponent() {
            if (_contentLoaded) {
                return;
            }
            _contentLoaded = true;
            System.Uri resourceLocater = new System.Uri("/FabricCalculationWPF;component/weightamountwindow.xaml", System.UriKind.Relative);

#line 1 "..\..\WeightAmountWindow.xaml"
            System.Windows.Application.LoadComponent(this, resourceLocater);

#line default
#line hidden
        }

        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [System.CodeDom.Compiler.GeneratedCodeAttribute("PresentationBuildTasks", "4.0.0.0")]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Design", "CA1033:InterfaceMethodsShouldBeCallableByChildTypes")]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Maintainability", "CA1502:AvoidExcessiveComplexity")]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1800:DoNotCastUnnecessarily")]
        void System.Windows.Markup.IComponentConnector.Connect(int connectionId, object target) {
            switch (connectionId) {
                case 1:
                    this.txtWeight = ((System.Windows.Controls.TextBox)(target));
                    return;
                case 2:
                    this.radBtnSatin = ((System.Windows.Controls.RadioButton)(target));
                    return;
                case 3:
                    this.radBtnPoplin = ((System.Windows.Controls.RadioButton)(target));
                    return;
                case 4:
                    this.radBtnSmall = ((System.Windows.Controls.RadioButton)(target));
                    return;
                case 5:
                    this.radBtnBig = ((System.Windows.Controls.RadioButton)(target));
                    return;
                case 6:
                    this.btnCalculate = ((System.Windows.Controls.Button)(target));

#line 30 "..\..\WeightAmountWindow.xaml"
                    this.btnCalculate.Click += new System.Windows.RoutedEventHandler(this.btnCalculate_Click);

#line default
#line hidden
                    return;
                case 7:
                    this.lblResult = ((System.Windows.Controls.TextBlock)(target));
                    return;
                case 8:
                    this.btnClear = ((System.Windows.Controls.Button)(target));

#line 35 "..\..\WeightAmountWindow.xaml"
                    this.btnClear.Click += new System.Windows.RoutedEventHandler(this.btnClear_Click);

#line default
#line hidden
                    return;
                case 9:
                    this.btnBack = ((System.Windows.Controls.Button)(target));

#line 41 "..\..\WeightAmountWindow.xaml"
                    this.btnBack.Click += new System.Windows.RoutedEventHandler(this.btnBack_Click);

#line default
#line hidden
                    return;
            }
            this._contentLoaded = true;
        }

        internal System.Windows.Controls.TextBox txtFabricAmount;
    }
}

