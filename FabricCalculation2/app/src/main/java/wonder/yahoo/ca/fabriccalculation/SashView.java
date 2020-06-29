package wonder.yahoo.ca.fabriccalculation;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.widget.Button;
import controllers.BtnSashCalculateController;

public class SashView extends AppCompatActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.sash_view);

    Button btnCalculate = (Button) findViewById(R.id.btnSashCalculate);

    btnCalculate.setOnClickListener(new BtnSashCalculateController(this));
  }
}
