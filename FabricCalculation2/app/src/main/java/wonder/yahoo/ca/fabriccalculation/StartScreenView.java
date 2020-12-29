package wonder.yahoo.ca.fabriccalculation;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.view.View.OnClickListener;
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
    Button btnScreen = (Button) findViewById(R.id.btnScreen);
    Button btnHole = (Button) findViewById(R.id.btnHole);
    Button btnWeightAndAmount = (Button) findViewById(R.id.btnWeightAndAmount);
    Button btnTube = (Button) findViewById(R.id.btnTube);

    btnNapkin.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent gotoNapkin = new Intent(getApplicationContext(), NapkinView.class);
        finish();
        startActivity(gotoNapkin);
        overridePendingTransition(R.anim.slide_from_right, R.anim.slide_to_left);
      }
    });

    btnChairCover.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent gotoChairCover = new Intent(getApplicationContext(), ChairCoverView.class);
        finish();
        startActivity(gotoChairCover);
        overridePendingTransition(R.anim.slide_from_right, R.anim.slide_to_left);
      }
    });

    btnClip.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent gotoClip = new Intent(getApplicationContext(), ClipView.class);
        finish();
        startActivity(gotoClip);
        overridePendingTransition(R.anim.slide_from_right, R.anim.slide_to_left);
      }
    });

    btnSash.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent gotoSash = new Intent(getApplicationContext(), SashView.class);
        finish();
        startActivity(gotoSash);
        overridePendingTransition(R.anim.slide_from_right, R.anim.slide_to_left);
      }
    });

    btnSkirt.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent gotoSkirt = new Intent(getApplicationContext(), SkirtView.class);
        finish();
        startActivity(gotoSkirt);
        overridePendingTransition(R.anim.slide_from_right, R.anim.slide_to_left);
      }
    });

    btnTablecloth.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent gotoTableclothChoice = new Intent(getApplicationContext(),
            TableclothChoiceView.class);
        finish();
        startActivity(gotoTableclothChoice);
        overridePendingTransition(R.anim.slide_from_right, R.anim.slide_to_left);
      }
    });

    btnFlower.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent gotoFLower = new Intent(getApplicationContext(), FlowerView.class);
        finish();
        startActivity(gotoFLower);
        overridePendingTransition(R.anim.slide_from_right, R.anim.slide_to_left);
      }
    });

    btnCurtain.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent gotoCurtain = new Intent(getApplicationContext(), CurtainView.class);
        finish();
        startActivity(gotoCurtain);
        overridePendingTransition(R.anim.slide_from_right, R.anim.slide_to_left);
      }
    });

    btnScreen.setOnClickListener(new OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent gotoScreen = new Intent(getApplicationContext(), ScreenView.class);
        finish();
        startActivity(gotoScreen);
        overridePendingTransition(R.anim.slide_from_right, R.anim.slide_to_left);
      }
    });

    btnHole.setOnClickListener(new OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent gotoHole = new Intent(getApplicationContext(), HoleView.class);
        finish();
        startActivity(gotoHole);
        overridePendingTransition(R.anim.slide_from_right, R.anim.slide_to_left);
      }
    });

    btnWeightAndAmount.setOnClickListener(new OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent gotoWeightAndAmount = new Intent(getApplicationContext(), WeightAndAmountView.class);
        finish();
        startActivity(gotoWeightAndAmount);
        overridePendingTransition(R.anim.slide_from_right, R.anim.slide_to_left);
      }
    });

    btnTube.setOnClickListener(new OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent gotoTube = new Intent(getApplicationContext(), TubeView.class);
        finish();
        startActivity(gotoTube);
        overridePendingTransition(R.anim.slide_from_right, R.anim.slide_to_left);
      }
    });
  }

  @Override
  public void onBackPressed() {
    moveTaskToBack(true);
    finishAffinity();
    android.os.Process.killProcess(android.os.Process.myPid());
  }
}
