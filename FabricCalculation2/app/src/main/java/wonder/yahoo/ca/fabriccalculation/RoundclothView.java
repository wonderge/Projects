package wonder.yahoo.ca.fabriccalculation;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.widget.Button;
import controllers.BtnRoundclothCalculateController;

public class RoundclothView extends AppCompatActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.roundcloth_view);

    Button btnCalculate = (Button) findViewById(R.id.btnRoundclothCalculate);

    btnCalculate.setOnClickListener(new BtnRoundclothCalculateController(this));
  }
}
