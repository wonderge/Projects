package wonder.yahoo.ca.fabriccalculation;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.RadioButton;
import controllers.BtnScreenCalculateController;

public class ScreenView extends AppCompatActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.screen_view);

    final RadioButton radBtnOne = (RadioButton) findViewById(R.id.radBtnScreenOne);
    final RadioButton radBtnOneFive = (RadioButton) findViewById(R.id.radBtnScreenOneFive);
    final RadioButton radBtnTwo = (RadioButton) findViewById(R.id.radBtnScreenTwo);
    final RadioButton radBtnTwoFive = (RadioButton) findViewById(R.id.radBtnScreenTwoFive);
    final RadioButton radBtnThree = (RadioButton) findViewById(R.id.radBtnScreenThree);
    final RadioButton radBtnThreeFive = (RadioButton) findViewById(R.id.radBtnScreenThreeFive);

    radBtnOne.setOnClickListener(new OnClickListener() {
      @Override
      public void onClick(View view) {
        radBtnOne.setChecked(true);
        radBtnOneFive.setChecked(false);
        radBtnTwo.setChecked(false);
        radBtnTwoFive.setChecked(false);
        radBtnThree.setChecked(false);
        radBtnThreeFive.setChecked(false);
      }
    });

    radBtnOneFive.setOnClickListener(new OnClickListener() {
      @Override
      public void onClick(View view) {
        radBtnOne.setChecked(false);
        radBtnOneFive.setChecked(true);
        radBtnTwo.setChecked(false);
        radBtnTwoFive.setChecked(false);
        radBtnThree.setChecked(false);
        radBtnThreeFive.setChecked(false);
      }
    });

    radBtnTwo.setOnClickListener(new OnClickListener() {
      @Override
      public void onClick(View view) {
        radBtnOne.setChecked(false);
        radBtnOneFive.setChecked(false);
        radBtnTwo.setChecked(true);
        radBtnTwoFive.setChecked(false);
        radBtnThree.setChecked(false);
        radBtnThreeFive.setChecked(false);
      }
    });

    radBtnTwoFive.setOnClickListener(new OnClickListener() {
      @Override
      public void onClick(View view) {
        radBtnOne.setChecked(false);
        radBtnOneFive.setChecked(false);
        radBtnTwo.setChecked(false);
        radBtnTwoFive.setChecked(true);
        radBtnThree.setChecked(false);
        radBtnThreeFive.setChecked(false);
      }
    });

    radBtnThree.setOnClickListener(new OnClickListener() {
      @Override
      public void onClick(View view) {
        radBtnOne.setChecked(false);
        radBtnOneFive.setChecked(false);
        radBtnTwo.setChecked(false);
        radBtnTwoFive.setChecked(false);
        radBtnThree.setChecked(true);
        radBtnThreeFive.setChecked(false);
      }
    });

    radBtnThreeFive.setOnClickListener(new OnClickListener() {
      @Override
      public void onClick(View view) {
        radBtnOne.setChecked(false);
        radBtnOneFive.setChecked(false);
        radBtnTwo.setChecked(false);
        radBtnTwoFive.setChecked(false);
        radBtnThree.setChecked(false);
        radBtnThreeFive.setChecked(true);
      }
    });

    Button btnCalculate = (Button) findViewById(R.id.btnScreenCalculate);
    btnCalculate.setOnClickListener(new BtnScreenCalculateController(this));
  }

  @Override
  public void onBackPressed() {
    finish();
    startActivity(new Intent(this, StartScreenView.class));
    overridePendingTransition(R.anim.slide_from_left, R.anim.slide_to_right);
  }
}
