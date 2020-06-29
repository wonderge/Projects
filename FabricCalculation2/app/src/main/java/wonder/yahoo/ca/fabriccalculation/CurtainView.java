package wonder.yahoo.ca.fabriccalculation;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.widget.Button;
import controllers.BtnCurtainCalculateController;

public class CurtainView extends AppCompatActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.curtain_view);

    Button btnCalculate = (Button) findViewById(R.id.btnCurtainCalculate);
    btnCalculate.setOnClickListener(new BtnCurtainCalculateController(this));
  }
}
