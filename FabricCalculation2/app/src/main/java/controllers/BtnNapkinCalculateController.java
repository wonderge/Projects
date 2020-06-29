package controllers;

import android.content.Context;
import androidx.appcompat.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.TextView;
import conversion.Value;
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
    TextView lblResult = (TextView) ((AppCompatActivity) appContext)
        .findViewById(R.id.lblNapkinResult);
    RadioButton radBtnHemmed = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnHemmed);

    double amount = Value.getDouble(txtAmount.getText().toString());
    double fabricWidth = Value.getDouble(txtFabricWidth.getText().toString());
    double length = Value.getDouble(txtLength.getText().toString());
    double width = Value.getDouble(txtWidth.getText().toString());
    double yard = Value.getDouble(txtYard.getText().toString());

    if (radBtnHemmed.isChecked()) {
      length = length + 1.5;
      width = width + 1.5;
    }

    double meters, yards;

    if (fabricWidth % length < fabricWidth % width) {
      if (yard == 0) {
        yards = Math.ceil(amount / Math.floor(fabricWidth / length)) * width / 36;
        meters = Math.ceil(amount / Math.floor(fabricWidth / length)) * width / 39;
        lblResult.setText(String.format("%s y \n%s m", Value.round(yards * 1.03), Value
            .round(meters * 1.03)));
      } else if (amount == 0) {
        amount = Math.floor(yard * 36 / width * Math.floor(fabricWidth / length) / 1.03);
        lblResult.setText(String.format("%s pcs", amount));
      }
    } else if (fabricWidth % width <= fabricWidth % length) {
      if (yard == 0) {
        yards = Math.ceil(amount / Math.floor(fabricWidth / width)) * length / 36;
        meters = Math.ceil(amount / Math.floor(fabricWidth / width)) * length / 39;
        lblResult.setText(String.format("%s y \n%s m", Value.round(yards * 1.03), Value
            .round(meters * 1.03)));
      } else if (amount == 0) {
        amount = Math.floor(yard * 36 / length * Math.floor(fabricWidth / width) / 1.03);
        lblResult.setText(String.format("%s pcs", amount));
      }
    }
  }
}
