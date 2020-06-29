package wonder.yahoo.ca.fabriccalculation;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.widget.Button;
import controllers.BtnClipCalculateController;

public class ClipView extends AppCompatActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.clip_view);

    Button btnCalculate = (Button) findViewById(R.id.btnClipCalculate);

    btnCalculate.setOnClickListener(new BtnClipCalculateController(this));
  }
}
