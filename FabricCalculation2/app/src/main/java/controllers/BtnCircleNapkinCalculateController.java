package controllers;

import android.content.Context;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import helper.Check;
import java.util.Locale;
import wonder.yahoo.ca.fabriccalculation.R;

public class BtnCircleNapkinCalculateController implements View.OnClickListener {

  private Context appContext;

  public BtnCircleNapkinCalculateController(Context context) {
    appContext = context;
  }

  @Override
  public void onClick(View view) {
    EditText txtDiameter = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtCircleDiameter);
    EditText txtNapkinLength = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtNapkinLength);
    TextView lblResult = (TextView) ((AppCompatActivity) appContext)
        .findViewById(R.id.lblCircleNapkinResult);

    boolean check = Check.checkFields(new EditText[]{ txtDiameter, txtNapkinLength }, appContext);

    if (check) {
      double diameter = Double.parseDouble(txtDiameter.getText().toString());
      double napkinLength = Double.parseDouble(txtNapkinLength.getText().toString());
      double halfLength = napkinLength / 2;
      double circleLength = getCircleLength(diameter  / 2, halfLength);
      double start = Math.floor(circleLength / napkinLength);
      double amount = 0;
      while (halfLength < diameter) {
        halfLength += napkinLength;
        circleLength = getCircleLength(diameter / 2, halfLength) * 2;
        amount += Math.floor(circleLength / napkinLength);
      }
      amount *= 2;
      amount += start;
      lblResult.setText(String.format(Locale.getDefault(), "%dpcs", (int) amount));
    }
  }

  private double getCircleLength(double radius, double halfLength) {
    if (halfLength > radius) {
      return 0;
    } else {
      return Math.sqrt(Math.pow(radius, 2) - Math.pow(halfLength, 2));
    }
  }
}
