package controllers;

import android.content.Context;
import androidx.appcompat.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.TextView;
import conversion.Value;
import wonder.yahoo.ca.fabriccalculation.R;

public class BtnSashCalculateController implements View.OnClickListener {

  private Context appContext;

  public BtnSashCalculateController(Context context) {
    appContext = context;
  }

  @Override
  public void onClick(View view) {
    EditText txtAmount = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtAmount);
    EditText txtLength = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtLength);
    EditText txtWidth = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtWidth);
    EditText txtFabricWidth = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtFabricWidth);
    TextView lblResult = (TextView) ((AppCompatActivity) appContext)
        .findViewById(R.id.lblSashResult);
    RadioButton radBtnSlant = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnSlant);

    double amount = Value.getDouble(txtAmount.getText().toString());
    double length = Value.getDouble(txtLength.getText().toString());
    double width = Value.getDouble(txtWidth.getText().toString());
    double fabricWidth = Value.getDouble(txtFabricWidth.getText().toString());

    if (radBtnSlant.isChecked()) {
      length = length + width;
    }

    double ratio = Math.floor(fabricWidth / width);
    double yards = Math.ceil(amount / ratio) * length / 36;
    double meters = Math.ceil(amount / ratio) * length / 39;

    lblResult.setText(String.format("%s y\n%s m", Value.round(yards * 1.03), Value
        .round(meters * 1.03)));
  }
}
