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

    boolean check = Check
        .checkFields(new EditText[]{txtAmount, txtLength, txtWidth, txtFabricWidth}, getSlant() + 1,
            appContext);

    if (check) {
      double amount = Double.parseDouble(txtAmount.getText().toString());
      double length = Double.parseDouble(txtLength.getText().toString());
      double width = Double.parseDouble(txtWidth.getText().toString());
      double fabricWidth = Double.parseDouble(txtFabricWidth.getText().toString());

      length += getSlant() * width;

      double ratio = Math.floor(fabricWidth / width);
      double yards = Math.ceil(amount / ratio) * length / 36;
      double meters = Math.ceil(amount / ratio) * length / 39;

      lblResult.setText(String.format(
          Locale.getDefault(), "%1.1f y\n%1.1f m", yards * 1.03 + 0.1, meters * 1.03 + 0.1));
    }
  }

  private double getSlant() {
    RadioButton radBtnSlant = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnSlant);
    RadioButton radBtnStraight = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnStraight);

    if (radBtnSlant.isChecked()) {
      return 1;
    } else if (radBtnStraight.isChecked()) {
      return 0;
    }

    return -1;
  }
}
