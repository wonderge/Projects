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
    RadioButton radBtnHemmed = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnHemmed);
    RadioButton radBtnMarrow = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnMarrow);

    boolean check = Check
        .checkFields(new EditText[]{txtAmount, txtFeet, txtInch, txtHeight, txtFabricWidth},
            getMultiplier() + additionalHeight(), appContext);

    if (check) {
      double amount = Double.parseDouble(txtAmount.getText().toString());
      double feet = Double.parseDouble(txtFeet.getText().toString());
      double inch = Double.parseDouble(txtInch.getText().toString());
      double height = Double.parseDouble(txtHeight.getText().toString()) + additionalHeight();
      double length = feet * 12 + inch;
      double fabricWidth = Double.parseDouble(txtFabricWidth.getText().toString());
      double yard = Double.parseDouble(txtYard.getText().toString());

      double multiplier = getMultiplier();

      double trueLength = length * multiplier + additionalLength();

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

        lblResult.setText(
            String.format(Locale.getDefault(), "%1.1f y\n%1.1f m", yards * 1.03 + 0.1,
                meters * 1.03 + 0.1));
      }

      if (amount == 0) {
        if (ratio >= 2) {
          amount = Math.floor(yard * 36 / trueLength / (height / fabricWidth) / 1.03);
        } else {
          amount = Math.floor(yard * 36 / height / (trueLength / fabricWidth) / 1.03);
        }

        lblResult.setText(String.format(Locale.getDefault(), "%d pcs", (int) amount));
      }
    }
  }

  private double getMultiplier() {
    RadioButton radBtnDense = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnDense);
    RadioButton radBtnPleat = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnPleat);
    RadioButton radBtnOne = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnOneInch);
    RadioButton radBtnTwo = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnTwoInch);
    RadioButton radBtnThree = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnThreeInch);

    if (radBtnDense.isChecked()) {
      return 2.5;
    } else if (radBtnPleat.isChecked() || radBtnOne.isChecked() || radBtnTwo.isChecked()
        || radBtnThree.isChecked()) {
      return 3;
    } else {
      return 0;
    }
  }

  private double additionalHeight() {
    RadioButton radBtnHemmed = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnHemmed);
    RadioButton radBtnMarrow = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnMarrow);

    if (radBtnHemmed.isChecked()) {
      return 1.5;
    } else if (radBtnMarrow.isChecked()) {
      return 0.5;
    }

    return 0;
  }

  private double additionalLength() {
    RadioButton radBtnHemmed = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnHemmed);
    RadioButton radBtnMarrow = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnMarrow);

    if (radBtnHemmed.isChecked()) {
      return 2;
    } else if (radBtnMarrow.isChecked()) {
      return 0;
    }

    return -1;
  }
}
