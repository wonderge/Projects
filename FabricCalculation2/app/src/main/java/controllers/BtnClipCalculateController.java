package controllers;

import android.content.Context;
import androidx.appcompat.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import conversion.Value;
import wonder.yahoo.ca.fabriccalculation.R;

public class BtnClipCalculateController implements View.OnClickListener {

  private Context appContext;

  public BtnClipCalculateController(Context context) {
    appContext = context;
  }

  @Override
  public void onClick(View view) {
    EditText txtSkirtAmount = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtSkirtAmount);
    EditText txtSkirtLength = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtSkirtLength);
    EditText txtAmount = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtAmount);
    EditText txtLength = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtLength);
    EditText txtWidth = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtWidth);
    EditText txtFabricWidth = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtFabricWidth);
    TextView lblResult = (TextView) ((AppCompatActivity) appContext)
        .findViewById(R.id.lblClipResult);

    double amount = Value.getDouble(txtAmount.getText().toString());
    double length = Value.getDouble(txtLength.getText().toString());
    double width = Value.getDouble(txtWidth.getText().toString());
    double fabricWidth = Value.getDouble(txtFabricWidth.getText().toString());
    double skirtAmount = Value.getDouble(txtSkirtAmount.getText().toString());
    double skirtLength = Value.getDouble(txtSkirtLength.getText().toString());

    double yards =
        (amount * skirtLength * skirtAmount) / Math.floor(fabricWidth / length) * width / 36;
    double meters =
        (amount * skirtLength * skirtAmount) / Math.floor(fabricWidth / length) * width / 39;

    lblResult.setText(String.format("%s y\n%s m", Value.round(yards * 1.03), Value
        .round(meters * 1.03)));
  }
}
