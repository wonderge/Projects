package wonder.yahoo.ca.fabriccalculation;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Button;
import controllers.BtnWeightAndAmountCalculateController;

public class WeightAndAmountView extends AppCompatActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.weightandamount_view);

    Button btnCalculate = (Button) findViewById(R.id.btnWeightAmountCalculate);
    btnCalculate.setOnClickListener(new BtnWeightAndAmountCalculateController(this));
  }

  @Override
  public void onBackPressed() {
    finish();
    startActivity(new Intent(this, StartScreenView.class));
    overridePendingTransition(R.anim.slide_from_left, R.anim.slide_to_right);
  }
}