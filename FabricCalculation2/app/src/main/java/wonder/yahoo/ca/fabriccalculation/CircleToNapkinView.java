package wonder.yahoo.ca.fabriccalculation;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Button;
import controllers.BtnCircleNapkinCalculateController;

public class CircleToNapkinView extends AppCompatActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.circle_to_napkin_view);

    Button btnCalculate = (Button) findViewById(R.id.btnCircleNapkinCalculate);
    btnCalculate.setOnClickListener(new BtnCircleNapkinCalculateController(this));
  }

  @Override
  public void onBackPressed() {
    finish();
    startActivity(new Intent(this, StartScreenView.class));
    overridePendingTransition(R.anim.slide_from_left, R.anim.slide_to_right);
  }
}