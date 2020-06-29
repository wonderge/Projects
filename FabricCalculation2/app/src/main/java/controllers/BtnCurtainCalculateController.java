package controllers;

import android.content.Context;
import androidx.appcompat.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.TextView;
import android.widget.Toast;
import java.util.Locale;
import wonder.yahoo.ca.fabriccalculation.R;
import conversion.Value;

public class BtnCurtainCalculateController implements View.OnClickListener {

  private Context appContext;

  public BtnCurtainCalculateController(Context context) {
    appContext = context;
  }

  @Override
  public void onClick(View view) {
    EditText txtAmount = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtCurtainAmount);
    EditText txtLength = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtCurtainLength);
    EditText txtWidth = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtCurtainWidth);
    EditText txtFabricWidth = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtCurtainFabricWidth);
    TextView lblResult = (TextView) ((AppCompatActivity) appContext)
        .findViewById(R.id.lblCurtainResult);

    String strAmount = txtAmount.getText().toString();
    String strLength = txtLength.getText().toString();
    String strWidth = txtWidth.getText().toString();
    String strFabricWidth = txtFabricWidth.getText().toString();

    double multiple = getMultiple();

    if (strAmount.isEmpty() || strLength.isEmpty() || strWidth.isEmpty() || strFabricWidth
        .isEmpty() || multiple == 0) {

      Toast.makeText(appContext, "请填充所有选择", Toast.LENGTH_SHORT).show();
    }

    double amount = Value.getDouble(strAmount);
    double length = Value.getDouble(strLength);
    double width = Value.getDouble(strWidth);
    double fabricWidth = Value.getDouble(strFabricWidth);

    double fabricWidthAmount = (width * multiple) / fabricWidth;
    fabricWidthAmount = roundFabricWidthAmount(amount, fabricWidthAmount) * amount;

    double yards = fabricWidthAmount * (length + 18) / 36;
    double meters = fabricWidthAmount * (length + 18) / 39;

    lblResult.setText(String
        .format(Locale.getDefault(), "%1.1f布宽\n%1.1fy\n%1.1fm", fabricWidthAmount, yards,
            meters));
  }

  private double roundFabricWidthAmount(double amount, double fabricWidthAmount) {
    double flooredFabricWidthAmount = Math.floor(fabricWidthAmount);
    if (amount == 1) {
      if (fabricWidthAmount <= flooredFabricWidthAmount + 0.2) {
        return flooredFabricWidthAmount;
      } else if (fabricWidthAmount > flooredFabricWidthAmount + 0.2
          && fabricWidthAmount <= flooredFabricWidthAmount + 0.5) {
        return flooredFabricWidthAmount + 0.5;
      } else {
        return Math.ceil(fabricWidthAmount);
      }
    } else {
      if (fabricWidthAmount <= flooredFabricWidthAmount + 0.5) {
        return flooredFabricWidthAmount + 0.5;
      } else {
        return Math.ceil(fabricWidthAmount);
      }
    }
  }

  private double getMultiple() {
    RadioButton radBtnOne = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnOne);
    RadioButton radBtnOneFive = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnOneFive);
    RadioButton radBtnTwo = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnTwo);
    RadioButton radBtnTwoFive = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnTwoFive);
    RadioButton radBtnThree = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnThree);
    RadioButton radBtnThreeFive = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnThreeFive);

    if (radBtnOne.isChecked()) {
      return 1;
    } else if (radBtnOneFive.isChecked()) {
      return 1.5;
    } else if (radBtnTwo.isChecked()) {
      return 2;
    } else if (radBtnTwoFive.isChecked()) {
      return 2.5;
    } else if (radBtnThree.isChecked()) {
      return 3;
    } else if (radBtnThreeFive.isChecked()) {
      return 3.5;
    } else {
      return 0;
    }
  }
}
