package wonder.yahoo.ca.fabriccalculation;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Button;
import controllers.BtnHoleCalculateController;

public class HoleView extends AppCompatActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.hole_view);

    Button btnCalculate = (Button) findViewById(R.id.btnHoleCalculate);
    btnCalculate.setOnClickListener(new BtnHoleCalculateController(this));
  }

  @Override
  public void onBackPressed() {
    finish();
    startActivity(new Intent(this, StartScreenView.class));
    overridePendingTransition(R.anim.slide_from_left, R.anim.slide_to_right);
  }
}