package controllers;

import android.content.Context;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import helper.Check;
import java.util.Locale;
import wonder.yahoo.ca.fabriccalculation.R;

public class BtnTubeCalculateController implements View.OnClickListener {

  private final Context appContext;

  public BtnTubeCalculateController(Context context) {
    appContext = context;
  }

  @Override
  public void onClick(View view) {
    EditText txtLength = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtTubeLength);
    EditText txtWidth = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtTubeWidth);
    EditText txtFabricWidth = (EditText) ((AppCompatActivity) appContext)
        .findViewById(R.id.txtTubeFabricWidth);
    TextView lblResult = (TextView) ((AppCompatActivity) appContext)
        .findViewById(R.id.lblTubeResult);

    boolean check = Check.checkFields(new EditText[]{ txtLength, txtWidth, txtFabricWidth },
        appContext);

    if (check) {
      double length = Double.parseDouble(txtLength.getText().toString());
      double width = Double.parseDouble(txtWidth.getText().toString());
      double fabricWidth = Double.parseDouble(txtFabricWidth.getText().toString());

      double triangleSideLength = Math.sqrt(2 * Math.pow(width, 2));
      double triangleArea = (triangleSideLength * triangleSideLength) / 2;
      double area = length * width + 2 + triangleArea;
      double shapeLength;

      if (fabricWidth == 0) {
        shapeLength = Math.ceil(Math.sqrt(area)) * 1.1 / 2.54;
      } else {
        shapeLength = Math.ceil(area / fabricWidth) * 1.1 / 2.54;
      }

      lblResult.setText(String.format(Locale.getDefault(), "%1.1finch", shapeLength));
    }
  }
}
