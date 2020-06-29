package wonder.yahoo.ca.fabriccalculation;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.widget.Button;
import controllers.BtnChairCoverCalculateController;

public class ChairCoverView extends AppCompatActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.chair_cover_view);

    Button btnCalculate = (Button) findViewById(R.id.btnChairCoverCalculate);

    btnCalculate.setOnClickListener(new BtnChairCoverCalculateController(this));
  }
}
