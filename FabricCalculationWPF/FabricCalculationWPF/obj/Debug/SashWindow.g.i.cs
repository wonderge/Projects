// Updated by XamlIntelliSenseFileGenerator 07/12/2020 11:41:06 AM
#pragma checksum "..\..\SashWindow.xaml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "115CBA1B0BB94994725BE8B23B2895C650B7665A6825C98B241CB596C211E372"
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
    /// SashWindow
    /// </summary>
    public partial class SashWindow : System.Windows.Window, System.Windows.Markup.IComponentConnector {


#line 15 "..\..\SashWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.RadioButton radBtnStraight;

#line default
#line hidden


#line 16 "..\..\SashWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.RadioButton radBtnSlant;

#line default
#line hidden


#line 21 "..\..\SashWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBox txtAmount;

#line default
#line hidden


#line 33 "..\..\SashWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBox txtWidth;

#line default
#line hidden


#line 39 "..\..\SashWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBox txtFabricWidth;

#line default
#line hidden


#line 43 "..\..\SashWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Button btnCalculate;

#line default
#line hidden


#line 44 "..\..\SashWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBlock lblResult;

#line default
#line hidden


#line 48 "..\..\SashWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Button btnClear;

#line default
#line hidden


#line 54 "..\..\SashWindow.xaml"
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
            System.Uri resourceLocater = new System.Uri("/FabricCalculationWPF;component/sashwindow.xaml", System.UriKind.Relative);

#line 1 "..\..\SashWindow.xaml"
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
                    this.radBtnStraight = ((System.Windows.Controls.RadioButton)(target));
                    return;
                case 2:
                    this.radBtnSlant = ((System.Windows.Controls.RadioButton)(target));
                    return;
                case 3:
                    this.txtAmount = ((System.Windows.Controls.TextBox)(target));
                    return;
                case 4:
                    this.txtlength = ((System.Windows.Controls.TextBox)(target));
                    return;
                case 5:
                    this.txtWidth = ((System.Windows.Controls.TextBox)(target));
                    return;
                case 6:
                    this.txtFabricWidth = ((System.Windows.Controls.TextBox)(target));
                    return;
                case 7:
                    this.btnCalculate = ((System.Windows.Controls.Button)(target));

#line 43 "..\..\SashWindow.xaml"
                    this.btnCalculate.Click += new System.Windows.RoutedEventHandler(this.btnCalculate_Click);

#line default
#line hidden
                    return;
                case 8:
                    this.lblResult = ((System.Windows.Controls.TextBlock)(target));
                    return;
                case 9:
                    this.btnClear = ((System.Windows.Controls.Button)(target));
                    return;
                case 10:
                    this.btnBack = ((System.Windows.Controls.Button)(target));
                    return;
            }
            this._contentLoaded = true;
        }

        internal System.Windows.Controls.TextBox txtLength;
    }
}

