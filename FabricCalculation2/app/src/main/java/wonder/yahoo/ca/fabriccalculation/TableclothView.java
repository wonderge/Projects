package wonder.yahoo.ca.fabriccalculation;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.widget.Button;
import controllers.BtnTableclothCalculateController;

public class TableclothView extends AppCompatActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.tablecloth_view);

    Button btnCalculate = (Button) findViewById(R.id.btnTableclothCalculate);

    btnCalculate.setOnClickListener(new BtnTableclothCalculateController(this));
  }
}
