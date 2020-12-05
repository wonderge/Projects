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

public class BtnNapkinCalculateController implements View.OnClickListener {

  private Context appContext;

  public BtnNapkinCalculateController(Context context) {
    appContext = context;
  }

  @Override
  public void onClick(View view) {
    EditText txtAmount = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtAmount);
    EditText txtLength = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtLength);
    EditText txtWidth = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtWidth);
    EditText txtFabricWidth = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtFabricWidth);
    EditText txtYard = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtFabricYard);
    TextView lblResult = (TextView) ((AppCompatActivity) appContext).findViewById(R.id.lblResult);
    RadioButton radBtnHemmed = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnHemmed);

    boolean check = Check
        .checkFields(new EditText[]{txtAmount, txtLength, txtWidth, txtFabricWidth, txtYard},
            getHemmed() + 1, appContext);

    if (check) {
      double amount = Double.parseDouble(txtAmount.getText().toString());
      double fabricWidth = Double.parseDouble(txtFabricWidth.getText().toString());
      double length = Double.parseDouble(txtLength.getText().toString()) + getHemmed();
      double width = Double.parseDouble(txtWidth.getText().toString()) + getHemmed();
      double yard = Double.parseDouble(txtYard.getText().toString());

      double meters, yards;

      if (fabricWidth % length < fabricWidth % width) {
        if (yard == 0) {
          yards = Math.ceil(amount / Math.floor(fabricWidth / length)) * width / 36;
          meters = Math.ceil(amount / Math.floor(fabricWidth / length)) * width / 39;
          lblResult.setText(
              String.format(Locale.getDefault(), "%1.1f y \n%1.1f m", yards * 1.03 + 0.1,
                  meters * 1.03 + 0.1));
        } else if (amount == 0) {
          amount = Math.floor(yard * 36 / width * Math.floor(fabricWidth / length) / 1.03);
          lblResult.setText(String.format("%s pcs", amount));
        }
      } else if (fabricWidth % width <= fabricWidth % length) {
        if (yard == 0) {
          yards = Math.ceil(amount / Math.floor(fabricWidth / width)) * length / 36;
          meters = Math.ceil(amount / Math.floor(fabricWidth / width)) * length / 39;
          lblResult.setText(
              String.format(Locale.getDefault(), "%1.1f y \n%1.1f m", yards * 1.03 + 0.1,
                  meters * 1.03 + 0.1));
        } else if (amount == 0) {
          amount = Math.floor(yard * 36 / length * Math.floor(fabricWidth / width) / 1.03);
          lblResult.setText(String.format(Locale.getDefault(), "%d pcs", (int) amount));
        }
      }
    }
  }

  private double getHemmed() {
    RadioButton radBtnHemmed = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnHemmed);
    RadioButton radBtnMarrow = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnMarrow);

    if (radBtnHemmed.isChecked()) {
      return 1.5;
    } else if (radBtnMarrow.isChecked()) {
      return 0;
    }

    return -1;
  }
}
