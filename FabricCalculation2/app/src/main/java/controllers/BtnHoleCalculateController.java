package controllers;

import android.content.Context;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import helper.Check;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import wonder.yahoo.ca.fabriccalculation.R;

public class BtnHoleCalculateController implements View.OnClickListener {

  private final Context appContext;

  public BtnHoleCalculateController(Context context) {
    appContext = context;
  }

  @Override
  public void onClick(View view) {
    EditText txtAmount = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtHoleCurtainAmount);
    EditText txtCurtainHeight = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtHoleCurtainHeight);
    EditText txtImageSize = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtHoleImageSize);
    EditText txtFabricWidth = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtHoleFabricWidth);
    TextView lblResult = (TextView) ((AppCompatActivity) appContext)
        .findViewById(R.id.lblHoleResult);

    boolean check = Check.checkFields(new EditText[]{ txtCurtainHeight, txtImageSize,
        txtFabricWidth }, appContext);

    if (check) {
      double amount = Double.parseDouble(txtAmount.getText().toString());
      double curtainHeight = Double.parseDouble(txtCurtainHeight.getText().toString());
      double imageSize = Double.parseDouble(txtImageSize.getText().toString());
      double fabricWidth = Double.parseDouble(txtFabricWidth.getText().toString());

      if (imageSize != 0) {
        double heightRatio = Math.ceil(curtainHeight / imageSize);
        curtainHeight = imageSize * heightRatio;
      }

      StringBuilder result = new StringBuilder();
      double height = curtainHeight + 14;
      double yards = height * amount / 36;
      double meters = yards * 36 / 39;

      result = new StringBuilder(String.format(Locale.getDefault(), "%1.1fy\n%1.1fm\n\n",
          yards * 1.03, meters * 1.03));

      double length = fabricWidth * 2.54 - 12;
      List<Double> sizes = new ArrayList<>();
      sizes.add(getCircleSize(5, length, 15, 17));
      sizes.add(getCircleSize(6, length, 18, 20));
      sizes.add(getCircleSize(7, length, 21, 22));
      double side = 5;
      for (double size : sizes) {
        if (size != 0) {
          double newLength = length - 2 * side;
          double holeAmount = Math.floor(newLength / size) + 1;
          result.append(String.format(Locale.getDefault(), "头尾距里: %dcm\n间隔: %dcm\n塑扣数: "
              + "%dpcs\n\n", (int) side, (int) size, (int) holeAmount));
        }
        side++;
      }

      lblResult.setText(result.toString().toString());
    }
  }

  private double getCircleSize(double side, double length, int start, int end) {
    length -= 2 * side;
    for (int i = start; i <= end; i++) {
      double circleSize = length / i;
      if (Math.round(circleSize) % 2 != 0) {
        double size = Math.floor(length / side);
        if (size <= end) {
          return size;
        }
      }
    }
    return 0;
  }
}
