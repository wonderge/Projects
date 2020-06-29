package controllers;

import android.content.Context;
import androidx.appcompat.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.TextView;
import conversion.Value;
import wonder.yahoo.ca.fabriccalculation.R;

public class BtnTableclothCalculateController implements View.OnClickListener {

  private Context appContext;

  public BtnTableclothCalculateController(Context context) {
    appContext = context;
  }

  @Override
  public void onClick(View view) {
    int joints = getJoints();

    EditText txtAmount = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtAmount);
    EditText txtLength = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtLength);
    EditText txtWidth = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtWidth);
    EditText txtFabricWidth = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtFabricWidth);
    EditText txtYard = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtFabricYard);
    TextView lblResult = (TextView) ((AppCompatActivity) appContext)
        .findViewById(R.id.lblTableclothResult);
    RadioButton radBtnHemmed = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnHemmed);

    double amount = Value.getDouble(txtAmount.getText().toString());
    double length = Value.getDouble(txtLength.getText().toString());
    double width = Value.getDouble(txtWidth.getText().toString());
    double fabricWidth = Value.getDouble(txtFabricWidth.getText().toString());
    double yard = Value.getDouble(txtYard.getText().toString());

    double ratio = 0, leftover, pieces, meters, yards;

    if (radBtnHemmed.isChecked()) {
      length = length + 1.5;
      width = width + 1.5;
    }

    if (joints == 0) {
      ratio = 1 * amount;
    } else if (joints == 1) {
      leftover = width - fabricWidth;
      pieces = Math.floor(fabricWidth / leftover);
      ratio = (fabricWidth + (fabricWidth / pieces)) / fabricWidth * amount;
    } else if (joints == 2) {
      leftover = (width - fabricWidth) / 2;
      pieces = Math.floor(fabricWidth / leftover);
      ratio = (fabricWidth + (fabricWidth / pieces) * 2) / fabricWidth * amount;
    }

    if (yard == 0 && joints != -1) {
      yards = Math.ceil(ratio) * length / 36;
      meters = Math.ceil(ratio) * length / 39;

      if (joints == 0 && width > fabricWidth) {
        yards = 0;
        meters = 0;
      }

      lblResult.setText(String.format("%s y \n%s m", Value.round(yards * 1.03), Value
          .round(meters * 1.03)));
    } else if (amount == 0 && joints != -1) {
      amount = Math.floor(yard / 1.03 * 36 / length / ratio);
      lblResult.setText(String.format("%s", amount));
    }
  }

  private int getJoints() {
    RadioButton radBtnNoJoints = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnNoJoints);
    RadioButton radBtnOneJoint = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnOneJoint);
    RadioButton radBtnTwoJoints = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnTwoJoints);
    if (radBtnNoJoints.isChecked()) {
      return 0;
    } else if (radBtnOneJoint.isChecked()) {
      return 1;
    } else if (radBtnTwoJoints.isChecked()) {
      return 2;
    }

    return -1;
  }
}
