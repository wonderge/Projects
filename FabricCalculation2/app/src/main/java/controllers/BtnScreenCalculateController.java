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

public class BtnScreenCalculateController implements View.OnClickListener {

  private Context appContext;

  public BtnScreenCalculateController(Context context) {
    appContext = context;
  }

  @Override
  public void onClick(View view) {
    EditText txtAmount = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtScreenAmount);
    EditText txtLength = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtScreenLength);
    EditText txtWidth = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtScreenWidth);
    EditText txtFabricWidth = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtScreenFabricWidth);
    TextView lblResult = (TextView) ((AppCompatActivity) appContext)
        .findViewById(R.id.lblScreenResult);

    boolean check = Check
        .checkFields(new EditText[]{txtAmount, txtLength, txtWidth, txtFabricWidth}, getMultiple(),
            getCuts(), appContext);

    if (check) {
      double amount = Double.parseDouble(txtAmount.getText().toString());
      double length = Double.parseDouble(txtLength.getText().toString()) + 18;
      double width = Double.parseDouble(txtWidth.getText().toString());
      double fabricWidth = Double.parseDouble(txtFabricWidth.getText().toString());
      int cuts = getCuts();
      if (cuts == 0) {
        width = width * getMultiple() + 5;
      } else if (cuts == 1) {
        width = width * getMultiple() + 10;
      }

      double yards = 0;
      double meters = 0;

      if (width > fabricWidth && length <= fabricWidth) {
        yards = width * amount / 36;
        meters = width * amount / 39;
      } else if (length > fabricWidth && width <= fabricWidth) {
        yards = length * amount / 36;
        meters = length * amount / 39;
      } else {
        double multiple = getMultiple();
        double fabricWidthAmount = (width * multiple) / fabricWidth;
        fabricWidthAmount = roundFabricWidthAmount(amount, fabricWidthAmount) * amount;

        yards = fabricWidthAmount * length / 36;
        meters = fabricWidthAmount * length / 39;
      }

      lblResult.setText(
          String.format(Locale.getDefault(), "%1.1fy\n%1.1fm", yards, meters));
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
        .findViewById(R.id.radBtnScreenOne);
    RadioButton radBtnOneFive = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnScreenOneFive);
    RadioButton radBtnTwo = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnScreenTwo);
    RadioButton radBtnTwoFive = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnScreenTwoFive);
    RadioButton radBtnThree = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnScreenThree);
    RadioButton radBtnThreeFive = (RadioButton) ((AppCompatActivity) appContext)
        .findViewById(R.id.radBtnScreenThreeFive);

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
