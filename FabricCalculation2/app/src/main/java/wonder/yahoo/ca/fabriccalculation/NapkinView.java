package wonder.yahoo.ca.fabriccalculation;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.widget.Button;
import controllers.BtnNapkinCalculateController;

public class NapkinView extends AppCompatActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.napkin_view);

    Button btnCalculate = (Button) findViewById(R.id.btnNapkinCalculate);

    btnCalculate.setOnClickListener(new BtnNapkinCalculateController(this));
  }
}
