package controllers;

import android.content.Context;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import helper.Check;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import wonder.yahoo.ca.fabriccalculation.R;

public class BtnChairCoverCalculateController implements View.OnClickListener {

  private Context appContext;

  public BtnChairCoverCalculateController(Context context) {
    appContext = context;
  }

  @Override
  public void onClick(View view) {
    EditText txtAmount = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtAmount);
    EditText txtFabricWidth = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtFabricWidth);
    EditText txtA = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtA);
    EditText txtB = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtB);
    EditText txtC = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtC);
    EditText txtD = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtD);
    EditText txtE = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtE);
    EditText txtF = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtF);
    EditText txtG = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtG);
    EditText txtH = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtH);
    TextView lblResult = (TextView) ((AppCompatActivity) appContext).findViewById(R.id.lblResult);

    boolean check = Check.checkFields(
        new EditText[]{txtAmount, txtFabricWidth, txtA, txtB, txtC, txtD, txtE, txtF, txtG, txtH},
        appContext);

    if (check) {
      double amount = Double.parseDouble(txtAmount.getText().toString());
      double fabricWidth = Double.parseDouble(txtFabricWidth.getText().toString());
      double a = Double.parseDouble(txtA.getText().toString());
      double b = Double.parseDouble(txtB.getText().toString());
      double c = Double.parseDouble(txtC.getText().toString());
      double d = Double.parseDouble(txtD.getText().toString());
      double e = Double.parseDouble(txtE.getText().toString());
      double f = Double.parseDouble(txtF.getText().toString());
      double g = Double.parseDouble(txtG.getText().toString());
      double h = Double.parseDouble(txtH.getText().toString());
      List<Double> length = new ArrayList<>();
      List<Double> ratio = new ArrayList<>();

      double tempRatio = 0;

      if (a > h) {
        h = a;
      }

      if (a > d) {
        d = a;
      }

      length.add(b + c);
      tempRatio = Math.floor(fabricWidth / h);
      tempRatio = tempRatio + Math.floor((fabricWidth - tempRatio * h) / d);
      ratio.add(tempRatio);

      length.add(b + e);
      tempRatio = Math.floor(fabricWidth / d);
      tempRatio = tempRatio + Math.floor((fabricWidth - tempRatio * d) / h);
      ratio.add(tempRatio);

      if (f + 2 * g > 60) {
        length.add(f + 2 * g);
        ratio.add(Math.floor(fabricWidth / c));
      } else {
        length.add(c);
        ratio.add(Math.floor(fabricWidth / (f + 2 * g)));
      }

      double ratioIndexZero = (double) ratio.get(0);
      while (amount % ratioIndexZero != 0) {
        amount++;
      }

      int size = length.size();
      double totalLength = 0, ratioAtIndex = 0, lengthAtIndex = 0;

      for (int i = 0; i < size; i++) {
        ratioAtIndex = (double) ratio.get(i);
        lengthAtIndex = (double) length.get(i);
        totalLength = totalLength + (lengthAtIndex / ratioAtIndex) * amount;
      }

      double meters = totalLength / 39;
      double yards = totalLength / 36;

      lblResult.setText(String
          .format(Locale.getDefault(), "%1.1f y\n%1.1f m", yards * 1.03, meters * 1.03));
    }
  }
}
