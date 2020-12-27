package controllers;

import android.content.Context;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.TextView;
import helper.Check;
import java.util.Locale;
import wonder.yahoo.ca.fabriccalculation.R;

public class BtnWeightAndAmountCalculateController implements View.OnClickListener {

  private final Context appContext;

  public BtnWeightAndAmountCalculateController(Context context) {
    appContext = context;
  }

  @Override
  public void onClick(View view) {
    EditText txtWeight = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtWeight);
    TextView lblResult = (TextView) ((AppCompatActivity) appContext)
        .findViewById(R.id.lblWeightAmountResult);

    boolean check = Check.checkFields(new EditText[]{ txtWeight }, appContext);

    if (check) {
      double tubeWeight = getTubeWeight();
      double fabricWeight = getFabricWeight();
      double weight = Double.parseDouble(txtWeight.getText().toString()) * 1000;

      double result = (weight - tubeWeight) / fabricWeight;
      lblResult.setText(String.format(Locale.getDefault(), "%1.1fy", result));
    }
  }

  private double getTubeWeight() {
    RadioButton radBtnSmall = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radbtnSmall);
    RadioButton radBtnBig = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radbtnBig);

    if (radBtnSmall.isChecked()) {
      return 220;
    } else if (radBtnBig.isChecked()) {
      return 278;
    } else {
      return 0;
    }
  }

  private double getFabricWeight() {
    RadioButton radBtnSatin = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById((R.id.radbtnSatin));
    RadioButton radBtnPoplin = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radbtnPoplin);

    if (radBtnSatin.isChecked()) {
      return 210;
    } else if (radBtnPoplin.isChecked()) {
      return 250;
    } else {
      return 0;
    }
  }
}
