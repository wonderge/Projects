package wonder.yahoo.ca.fabriccalculation;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.widget.Button;
import controllers.BtnSkirtCalculateController;

public class SkirtView extends AppCompatActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.skirt_view);

    Button btnSkirtCalculate = (Button) findViewById(R.id.btnSkirtCalculate);

    btnSkirtCalculate.setOnClickListener(new BtnSkirtCalculateController(this));
  }
}
