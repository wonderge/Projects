package wonder.yahoo.ca.fabriccalculation;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Button;
import controllers.BtnCircleRectangleCalculateController;

public class CircleToRectangleView extends AppCompatActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.circle_to_rectangle_view);

    Button btnCalculate = (Button) findViewById(R.id.btnCircleRectangleCalculate);
    btnCalculate.setOnClickListener(new BtnCircleRectangleCalculateController(this));
  }

  @Override
  public void onBackPressed() {
    finish();
    startActivity(new Intent(this, StartScreenView.class));
    overridePendingTransition(R.anim.slide_from_left, R.anim.slide_to_right);
  }
}