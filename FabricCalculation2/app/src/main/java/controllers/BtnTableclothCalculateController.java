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

    boolean check = Check
        .checkFields(new EditText[]{txtAmount, txtLength, txtWidth, txtFabricWidth, txtYard},
            getJoints() + 1, appContext);

    if (check) {
      double amount = Double.parseDouble(txtAmount.getText().toString());
      double length = Double.parseDouble(txtLength.getText().toString());
      double width = Double.parseDouble(txtWidth.getText().toString());
      double fabricWidth = Double.parseDouble(txtFabricWidth.getText().toString());
      double yard = Double.parseDouble(txtYard.getText().toString());

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

        lblResult.setText(String
            .format(Locale.getDefault(), "%1.1f y \n%1.1f m", yards * 1.03 + 0.1,
                meters * 1.03 + 0.1));
      } else if (amount == 0 && joints != -1) {
        amount = Math.floor(yard / 1.03 * 36 / length / ratio);
        lblResult.setText(String.format(Locale.getDefault(), "%d", (int) amount));
      }
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
