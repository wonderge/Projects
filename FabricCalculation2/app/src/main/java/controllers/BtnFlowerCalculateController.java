package controllers;

import android.content.Context;
import androidx.appcompat.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import conversion.Value;
import wonder.yahoo.ca.fabriccalculation.R;

public class BtnFlowerCalculateController implements View.OnClickListener {

  private Context appContext;

  public BtnFlowerCalculateController(Context context) {
    appContext = context;
  }

  @Override
  public void onClick(View view) {
    EditText txt80 = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txt80);
    EditText txt70 = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txt70);
    EditText txt60 = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txt60);
    EditText txt50 = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txt50);
    EditText txt40 = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txt40);
    EditText txt30 = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txt30);
    EditText txt20 = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txt20);
    EditText txt15 = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txt15);
    EditText txt10 = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txt10);
    EditText txtLength = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtLength);
    EditText txtWidth = (EditText) ((AppCompatActivity) appContext).findViewById(R.id.txtWidth);
    TextView lblResult = (TextView) ((AppCompatActivity) appContext)
        .findViewById(R.id.lblFlowerResult);

    EditText[] txtFlower = {txt80, txt70, txt60, txt50, txt40, txt30, txt20, txt15, txt10};
    double[] amount = new double[9];

    for (int i = 0; i < 9; i++) {
      amount[i] = Value.getDouble(txtFlower[i].getText().toString());
    }

    double length = Value.getDouble(txtLength.getText().toString());
    double width = Value.getDouble(txtWidth.getText().toString());
    double paperArea = length * width;

    double[] area = new double[9];
    area[0] = 9 * 1152 + 8 * 896 + 7 * 700 + 6 * 528 + 5 * 462 + 8 * 360 + 6 * 255 + 3 * 156
        + 4 * 132;
    area[1] = 8 * 896 + 7 * 700 + 6 * 528 + 5 * 462 + 8 * 360 + 6 * 255 + 3 * 156 + 4 * 132;
    area[2] = 7 * 700 + 6 * 528 + 5 * 462 + 8 * 360 + 6 * 255 + 3 * 156 + 4 * 132;
    area[3] = 6 * 528 + 5 * 462 + 8 * 360 + 6 * 255 + 3 * 156 + 4 * 132;
    area[4] = 5 * 462 + 8 * 360 + 6 * 255 + 3 * 156 + 4 * 132;
    area[5] = 6 * 196 + 5 * 144 + 6 * 121 + 3 * 72 + 5 * 56;
    area[6] = 5 * 144 + 6 * 121 + 3 * 72 + 5 * 56;
    area[7] = 6 * 56 + 5 * 42 + 3 * 30 + 3 * 25;
    area[8] = 6 * 42 + 5 * 30 + 5 * 25 + 16;

    double required = 0;

    for (int i = 0; i < 9; i++) {
      required = required + area[i] / paperArea * amount[i];
    }

    lblResult.setText(String.format("%s pcs", Value.round(required * 1.03)));
  }
}
