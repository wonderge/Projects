package controllers;

import android.content.Context;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import helper.Check;
import java.util.Locale;
import wonder.yahoo.ca.fabriccalculation.R;

public class BtnCircleRectangleCalculateController implements View.OnClickListener {

  private Context appContext;

  public BtnCircleRectangleCalculateController(Context context) {
    appContext = context;
  }

  @Override
  public void onClick(View view) {
    EditText txtDiameter = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtCircleRectangleDiameter);
    EditText txtLength = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtCircleRectangleLength);
    TextView lblResult = (TextView) ((AppCompatActivity) appContext)
        .findViewById(R.id.lblCircleRectangleResult);

    boolean check = Check.checkFields(new EditText[]{ txtDiameter, txtLength }, appContext);

    if (check) {
      double diameter = Double.parseDouble(txtDiameter.getText().toString());
      double length = Double.parseDouble(txtLength.getText().toString());
      double radius = diameter / 2;
      double halfLength = length / 2;
      double result = Math.sqrt(Math.pow(radius, 2) - Math.pow(halfLength, 2));
      lblResult.setText(String.format(Locale.getDefault(), "%1.1finch", result));
    }
  }
}
