package controllers;

import android.content.Context;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import helper.Check;
import java.util.Locale;
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
    TextView lblResult = (TextView) ((AppCompatActivity) appContext).findViewById(R.id.lblResult);

    boolean check = Check.checkFields(
        new EditText[]{txtSkirtAmount, txtSkirtLength, txtAmount, txtLength, txtWidth,
            txtFabricWidth}, appContext);

    if (check) {
      double amount = Double.parseDouble(txtAmount.getText().toString());
      double length = Double.parseDouble(txtLength.getText().toString());
      double width = Double.parseDouble(txtWidth.getText().toString());
      double fabricWidth = Double.parseDouble(txtFabricWidth.getText().toString());
      double skirtAmount = Double.parseDouble(txtSkirtAmount.getText().toString());
      double skirtLength = Double.parseDouble(txtSkirtLength.getText().toString());

      double yards =
          (amount * skirtLength * skirtAmount) / Math.floor(fabricWidth / length) * width / 36;
      double meters =
          (amount * skirtLength * skirtAmount) / Math.floor(fabricWidth / length) * width / 39;

      lblResult.setText(
          String.format(Locale.getDefault(), "%1.1f y\n%1.1f m", yards * 1.03, meters * 1.03));
    }
  }
}
