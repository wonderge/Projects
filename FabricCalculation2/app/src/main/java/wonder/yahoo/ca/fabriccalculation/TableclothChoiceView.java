package wonder.yahoo.ca.fabriccalculation;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
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
        finish();
        startActivity(gotoTablecloth);
        overridePendingTransition(R.anim.slide_from_right, R.anim.slide_to_left);
      }
    });

    btnRoundcloth.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent gotoRoundcloth = new Intent(getApplicationContext(), RoundclothView.class);
        finish();
        startActivity(gotoRoundcloth);
        overridePendingTransition(R.anim.slide_from_right, R.anim.slide_to_left);
      }
    });
  }

  @Override
  public void onBackPressed() {
    finish();
    startActivity(new Intent(this, StartScreenView.class));
    overridePendingTransition(R.anim.slide_from_left, R.anim.slide_to_right);
  }
}
