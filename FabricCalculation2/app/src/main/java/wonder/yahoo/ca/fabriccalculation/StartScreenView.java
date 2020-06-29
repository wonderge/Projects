package wonder.yahoo.ca.fabriccalculation;

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

public class StartScreenView extends AppCompatActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.start_screen_view);

    Button btnNapkin = (Button) findViewById(R.id.btnNapkin);
    Button btnTablecloth = (Button) findViewById(R.id.btnTablecloth);
    Button btnSash = (Button) findViewById(R.id.btnSash);
    Button btnChairCover = (Button) findViewById(R.id.btnChairCover);
    Button btnClip = (Button) findViewById(R.id.btnClip);
    Button btnSkirt = (Button) findViewById(R.id.btnSkirt);
    Button btnFlower = (Button) findViewById(R.id.btnFlower);
    Button btnCurtain = (Button) findViewById(R.id.btnCurtain);

    btnNapkin.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent gotoNapkin = new Intent(getApplicationContext(), NapkinView.class);
        startActivity(gotoNapkin);
      }
    });

    btnChairCover.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent gotoChairCover = new Intent(getApplicationContext(), ChairCoverView.class);
        startActivity(gotoChairCover);
      }
    });

    btnClip.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent gotoClip = new Intent(getApplicationContext(), ClipView.class);
        startActivity(gotoClip);
      }
    });

    btnSash.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent gotoSash = new Intent(getApplicationContext(), SashView.class);
        startActivity(gotoSash);
      }
    });

    btnSkirt.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent gotoSkirt = new Intent(getApplicationContext(), SkirtView.class);
        startActivity(gotoSkirt);
      }
    });

    btnTablecloth.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent gotoTableclothChoice = new Intent(getApplicationContext(), TableclothChoiceView.class);
        startActivity(gotoTableclothChoice);
      }
    });

    btnFlower.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent gotoFLower = new Intent(getApplicationContext(), FlowerView.class);
        startActivity(gotoFLower);
      }
    });

    btnCurtain.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent gotoCurtain = new Intent(getApplicationContext(), CurtainView.class);
        startActivity(gotoCurtain);
      }
    });
  }
}
