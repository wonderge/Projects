package controllers;

import android.content.Context;
import androidx.appcompat.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import conversion.Value;
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

    double amount = Value.getDouble(txtAmount.getText().toString());
    double diameter = Value.getDouble(txtDiameter.getText().toString());
    double fabricWidth = Value.getDouble(txtFabricWidth.getText().toString());
    double yard = Value.getDouble(txtYard.getText().toString());
    double radius = diameter / 2;
    double halfFabricWidth = fabricWidth / 2;
    double[] sideLength = new double[2];
    sideLength = calculateSidePieceLength(fabricWidth, diameter, radius, halfFabricWidth);

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

      lblResult.setText(String.format("%s y\n%s m", Value.round(yards * 1.03), Value
          .round(meters * 1.03)));

      if (sideLength[1] != 0) {
        lblSideLength.setText(
            String.format("侧片边长: %s inch\n侧片边长: %s inch", sideLength[0], sideLength[1]));
      } else {
        lblSideLength.setText(String.format("侧片边长: %s inch", sideLength[0]));
      }
    }

    if (amount == 0) {
      amount = Math.floor(
          yard * 36 / (sideLength[1] * ((radius - fabricWidth) * 2 / fabricWidth) + (diameter
              + sideLength[0])) / 1.03);
      lblResult.setText(String.format("%s pcs", amount));
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
