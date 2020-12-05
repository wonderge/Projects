package controllers;

import android.content.Context;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import helper.Check;
import java.util.Locale;
import wonder.yahoo.ca.fabriccalculation.R;

public class BtnRoundclothCalculateController implements View.OnClickListener {

  private Context appContext;

  public BtnRoundclothCalculateController(Context context) {
    appContext = context;
  }

  @Override
  public void onClick(View view) {
    EditText txtAmount = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtAmount);
    EditText txtDiameter = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtDiameter);
    EditText txtFabricWidth = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtFabricWidth);
    EditText txtYard = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtFabricYard);
    TextView lblResult = (TextView) ((AppCompatActivity) appContext)
        .findViewById(R.id.lblRoundclothResult);
    TextView lblSideLength = (TextView) ((AppCompatActivity) appContext)
        .findViewById(R.id.lblSideLength);

    boolean check = Check
        .checkFields(new EditText[]{txtAmount, txtDiameter, txtFabricWidth, txtYard}, appContext);

    if (check) {
      double amount = Double.parseDouble(txtAmount.getText().toString());
      double diameter = Double.parseDouble(txtDiameter.getText().toString());
      double fabricWidth = Double.parseDouble(txtFabricWidth.getText().toString());
      double yard = Double.parseDouble(txtYard.getText().toString());
      double radius = diameter / 2;
      double halfFabricWidth = fabricWidth / 2;
      double[] sideLength = calculateSidePieceLength(fabricWidth, diameter, radius,
          halfFabricWidth);

      double yards = 0, meters = 0;
      if (yard == 0) {
        if ((diameter / fabricWidth) < 1) {
          yards = diameter * amount / 36;
          meters = diameter * amount / 39;
        } else if ((diameter / fabricWidth) < 2) {
          yards = ((diameter + sideLength[0]) * amount + sideLength[0] * Math
              .ceil((radius - fabricWidth) * 2 * amount / fabricWidth)) / 36;
          meters = ((diameter + sideLength[0]) * amount + sideLength[0] * Math
              .ceil((radius - fabricWidth) * 2 * amount / fabricWidth)) / 39;
        } else {
          yards = ((diameter + sideLength[0]) * amount + sideLength[1] * Math
              .ceil((radius - fabricWidth) * 2 * amount / fabricWidth)) / 36;
          meters = ((diameter + sideLength[0]) * amount + sideLength[1] * Math
              .ceil((radius - fabricWidth) * 2 * amount / fabricWidth)) / 39;
        }

        lblResult.setText(
            String.format(Locale.getDefault(), "%1.1f y\n%1.1f m", yards * 1.03 + 0.1,
                meters * 1.03 + 0.1));

        if (sideLength[1] != 0) {
          lblSideLength.setText(
              String.format(Locale.getDefault(), "侧片边长: %1.1f inch\n侧片边长: %1.1f inch",
                  sideLength[0] + 0.1, sideLength[1] + 0.1));
        } else {
          lblSideLength.setText(String.format(Locale.getDefault(), "侧片边长: %1.1f inch", sideLength[0] + 0.1));
        }
      }

      if (amount == 0) {
        amount = Math.floor(
            yard * 36 / (sideLength[1] * ((radius - fabricWidth) * 2 / fabricWidth) + (diameter
                + sideLength[0])) / 1.03);
        lblResult.setText(String.format(Locale.getDefault(), "%d pcs", (int) amount));
      }
    }
  }

  private double[] calculateSidePieceLength(double fabricWidth, double diameter,
      double radius, double halfFabricWidth) {
    double[] sideLength = new double[2];
    if ((diameter / fabricWidth) < 1) {
      sideLength[0] = 0;
    } else if ((diameter / fabricWidth) < 2) {
      sideLength[0] = Math.ceil(Math.sqrt(Math.pow(radius, 2) - Math.pow(halfFabricWidth, 2)) * 2);
    } else {
      sideLength[0] = Math.ceil(Math.sqrt(Math.pow(radius, 2) - Math.pow(halfFabricWidth, 2)) * 2);
      sideLength[1] = Math.ceil(Math.sqrt(Math.pow(radius, 2) - Math.pow(fabricWidth, 2)) * 2);
    }

    return sideLength;
  }
}
