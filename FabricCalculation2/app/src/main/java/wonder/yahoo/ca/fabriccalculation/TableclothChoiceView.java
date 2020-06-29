package wonder.yahoo.ca.fabriccalculation;

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

public class TableclothChoiceView extends AppCompatActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.tablecloth_choice_view);

    Button btnTablecloth = (Button) findViewById(R.id.btnRectangleCloth);
    Button btnRoundcloth = (Button) findViewById(R.id.btnRoundcloth);

    btnTablecloth.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent gotoTablecloth = new Intent(getApplicationContext(), TableclothView.class);
        startActivity(gotoTablecloth);
      }
    });

    btnRoundcloth.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent gotoRoundcloth = new Intent(getApplicationContext(), RoundclothView.class);
        startActivity(gotoRoundcloth);
      }
    });
  }
}
