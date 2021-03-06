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

    double multiple = getMultiple();
    int cuts = getCuts();

    boolean check = Check
        .checkFields(new EditText[]{txtAmount, txtLength, txtWidth, txtFabricWidth}, multiple, cuts,
            appContext);

    if (check) {
      double amount = Double.parseDouble(txtAmount.getText().toString());
      double length = Double.parseDouble(txtLength.getText().toString()) + 14;
      double width = Double.parseDouble(txtWidth.getText().toString());
      double fabricWidth = Double.parseDouble(txtFabricWidth.getText().toString());
      double fabricWidthAmount = 0;

      if (cuts == 0) {
        fabricWidthAmount = (width * multiple + 5) / fabricWidth;
      } else if (cuts == 1)
      {
        fabricWidthAmount = (width * multiple + 10) / fabricWidth;
      }
      fabricWidthAmount = roundFabricWidthAmount(amount, fabricWidthAmount) * amount;

      double yards = fabricWidthAmount * length / 36;
      double meters = fabricWidthAmount * length / 39;

      lblResult.setText(String
          .format(Locale.getDefault(), "%1.1f布宽\n%1.1fy\n%1.1fm", fabricWidthAmount, yards,
              meters));
    }
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
        .findViewById(R.id.radBtnCurtainOne);
    RadioButton radBtnOneFive = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnCurtainOneFive);
    RadioButton radBtnTwo = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnCurtainTwo);
    RadioButton radBtnTwoFive = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnCurtainTwoFive);
    RadioButton radBtnThree = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnCurtainThree);
    RadioButton radBtnThreeFive = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnCurtainThreeFive);

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
    }
    return 0;
  }

  private int getCuts() {
    RadioButton radBtnNoCut = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnNoCut);
    RadioButton radBtnOneCut = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnOneCut);

    if (radBtnNoCut.isChecked()) {
      return 0;
    } else if (radBtnOneCut.isChecked()) {
      return 1;
    }
    return -1;
  }
}
