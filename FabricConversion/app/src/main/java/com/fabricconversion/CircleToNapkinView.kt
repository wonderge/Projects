package com.fabricconversion

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import kotlinx.android.synthetic.main.circle_to_napkin_view.*
import kotlin.math.pow
import kotlin.math.sqrt

class CircleToNapkinView : AppCompatActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.circle_to_napkin_view)

    btnCircleNapkinCalculate.setOnClickListener {
      val diameter : Double? = txtCircleDiameter.text.toString().toDoubleOrNull()
      val napkinLength : Double? = txtNapkinLength.text.toString().toDoubleOrNull()

      if (diameter == null || napkinLength == null) {
        Toast.makeText(this, "请填充所有选择", Toast.LENGTH_SHORT).show()
      } else {
        var lengthFromDiameter = napkinLength.div(2)
        var circleLength = getCircleLength(diameter, lengthFromDiameter)
        val start : Int = circleLength.div(napkinLength).toInt()
        var amount : Int = 0;
        while (lengthFromDiameter < diameter) {
          lengthFromDiameter += napkinLength
          circleLength = 2.times(getCircleLength(diameter.div(2), lengthFromDiameter))
          amount += circleLength.div(napkinLength).toInt()
        }

        amount = amount.times(2);
        amount += start;

        lblCircleNapkinResult.text = String.format("%d pcs", amount);
      }
    }
  }

  fun getCircleLength(diameter : Double, lengthFromDiameter : Double) : Double {
    if (lengthFromDiameter > diameter) {
      return 0.0
    } else {
      return sqrt(diameter.pow(2) - lengthFromDiameter.pow(2))
    }
  }

  override fun onBackPressed() {
    this.finish()
    this.startActivity(Intent(this, ChoiceView::class.java))
    overridePendingTransition(R.anim.slide_from_left, R.anim.slide_to_right)
  }
}
