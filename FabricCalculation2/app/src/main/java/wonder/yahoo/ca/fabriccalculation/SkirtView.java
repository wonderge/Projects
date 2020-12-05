package wonder.yahoo.ca.fabriccalculation;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.Button;
import controllers.BtnSkirtCalculateController;

public class SkirtView extends AppCompatActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.skirt_view);
    setTitle("SkirtView");

    Button btnSkirtCalculate = (Button) findViewById(R.id.btnSkirtCalculate);

    btnSkirtCalculate.setOnClickListener(new BtnSkirtCalculateController(this));
  }

  @Override
  public void onBackPressed() {
    finish();
    startActivity(new Intent(this, StartScreenView.class));
    overridePendingTransition(R.anim.slide_from_left, R.anim.slide_to_right);
  }
}
