package wonder.yahoo.ca.fabriccalculation;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.widget.Button;
import controllers.BtnFlowerCalculateController;

public class FlowerView extends AppCompatActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.flower_view);

    Button btnCalculate = (Button) findViewById(R.id.btnFlowerCalculate);

    btnCalculate.setOnClickListener(new BtnFlowerCalculateController(this));
  }
}
