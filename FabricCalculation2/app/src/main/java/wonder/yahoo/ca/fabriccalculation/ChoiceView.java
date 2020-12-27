package wonder.yahoo.ca.fabriccalculation;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;

public class ChoiceView extends AppCompatActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.choice_view);

    Button btnCircleToNapkin = (Button) findViewById(R.id.btnCircleToNapkin);
    Button btnCircleToRectangle = (Button) findViewById(R.id.btnCircleToRectangle);
    Button btnRectangleToNapkin = (Button) findViewById(R.id.btnRectangleToNapkin);

    btnCircleToNapkin.setOnClickListener(new OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent gotoCircleNapkin = new Intent(getApplicationContext(), CircleToNapkinView.class);
        finish();
        startActivity(gotoCircleNapkin);
        overridePendingTransition(R.anim.slide_from_right, R.anim.slide_to_left);
      }
    });

    btnCircleToRectangle.setOnClickListener(new OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent gotoCircleRectangle = new Intent(getApplicationContext(),
            CircleToRectangleView.class);
        finish();
        startActivity(gotoCircleRectangle);
        overridePendingTransition(R.anim.slide_from_right, R.anim.slide_to_left);
      }
    });

    btnRectangleToNapkin.setOnClickListener(new OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent gotoRectangleNapkin = new Intent(getApplicationContext(),
            RectangleToNapkinView.class);
        finish();
        startActivity(gotoRectangleNapkin);
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