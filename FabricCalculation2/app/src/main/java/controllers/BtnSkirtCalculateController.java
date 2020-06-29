package controllers;

import android.content.Context;
import androidx.appcompat.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.TextView;
import conversion.Value;
import wonder.yahoo.ca.fabriccalculation.R;

public class BtnSkirtCalculateController implements View.OnClickListener {

  private Context appContext;

  public BtnSkirtCalculateController(Context context) {
    appContext = context;
  }

  @Override
  public void onClick(View view) {
    EditText txtAmount = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtAmount);
    EditText txtFeet = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtFeet);
    EditText txtInch = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtInch);
    EditText txtHeight = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtHeight);
    EditText txtFabricWidth = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtFabricWidth);
    EditText txtYard = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtFabricYard);
    TextView lblResult = (TextView) ((AppCompatActivity) appContext)
        .findViewById(R.id.lblSkirtResult);
    RadioButton radBtnDense = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnDense);
    RadioButton radBtnHemmed = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnHemmed);
    RadioButton radBtnMarrow = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnMarrow);

    double amount = Value.getDouble(txtAmount.getText().toString());
    double feet = Value.getDouble(txtFeet.getText().toString());
    double inch = Value.getDouble(txtInch.getText().toString());
    double height = Value.getDouble(txtHeight.getText().toString());
    double length = feet * 12 + inch;
    double fabricWidth = Value.getDouble(txtFabricWidth.getText().toString());
    double yard = Value.getDouble(txtYard.getText().toString());

    double multiplier = 3;

    if (radBtnDense.isChecked()) {
      multiplier = 2.5;
    }

    double trueLength = length * multiplier;

    if (radBtnHemmed.isChecked()) {
      trueLength = trueLength + 2;
      height = height + 1.5;
    } else if (radBtnMarrow.isChecked()) {
      height = height + 0.5;
    }

    double ratio = fabricWidth / height;
    double yards, meters;

    if (yard == 0) {

      if (ratio >= 2) {
        yards = Math.ceil(height / fabricWidth * amount) * trueLength / 36;
        meters = Math.ceil(height / fabricWidth * amount) * trueLength / 39;
      } else {
        yards = Math.ceil(trueLength / fabricWidth * amount) * height / 36;
        meters = Math.ceil(trueLength / fabricWidth * amount) * height / 39;
      }

      lblResult.setText(String.format("%s y\n%s m", Value.round(yards * 1.03), Value
          .round(meters * 1.03)));
    }

    if (amount == 0) {
      if (ratio >= 2) {
        amount = Math.floor(yard * 36 / trueLength / (height / fabricWidth) / 1.03);
      } else {
        amount = Math.floor(yard * 36 / height / (trueLength / fabricWidth) / 1.03);
      }

      lblResult.setText(String.format("%s pcs", amount));
    }
  }
}
