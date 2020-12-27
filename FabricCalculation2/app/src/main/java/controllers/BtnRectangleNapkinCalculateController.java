package controllers;

import android.content.Context;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import helper.Check;
import java.util.Locale;
import wonder.yahoo.ca.fabriccalculation.R;

public class BtnRectangleNapkinCalculateController implements View.OnClickListener {

  private Context appContext;

  public BtnRectangleNapkinCalculateController(Context context) {
    appContext = context;
  }

  @Override
  public void onClick(View view) {
    EditText txtLength = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtClothLength);
    EditText txtWidth = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtClothWidth);
    EditText txtNapkinLength = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtRetangleNapkinLength);
    TextView lblResult = (TextView) ((AppCompatActivity) appContext)
        .findViewById(R.id.lblRectangleNapkinResult);

    boolean check = Check.checkFields(new EditText[]{ txtLength, txtWidth, txtNapkinLength },
        appContext);

    if (check) {
      double length = Double.parseDouble(txtLength.getText().toString());
      double width = Double.parseDouble(txtWidth.getText().toString());
      double napkinLength = Double.parseDouble(txtNapkinLength.getText().toString());
      double lengthRatio = Math.floor(length / napkinLength);
      double widthRatio = Math.floor(width / napkinLength);
      double result = lengthRatio * widthRatio;

      lblResult.setText(String.format(Locale.getDefault(), "%dpcs", (int) result));
    }
  }
}
