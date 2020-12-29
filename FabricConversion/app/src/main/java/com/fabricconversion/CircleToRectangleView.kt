package com.fabricconversion

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.circle_to_rectangle_view.*
import kotlin.math.pow
import kotlin.math.sqrt

class CircleToRectangleView : AppCompatActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.circle_to_rectangle_view)

    btnCalculate.setOnClickListener {
      val diameter: Double? = txtDiameter.text.toString().toDoubleOrNull()
      val length: Double? = txtLength.text.toString().toDoubleOrNull()
      val result : Double;
      if (diameter == null || length == null) {
        Toast.makeText(this, "请填充所有选择", Toast.LENGTH_SHORT).show()
      } else {
        val radius = diameter.div(2)
        val halfLength = length.div(2)
        result = 2.times(sqrt(radius.pow(2) - halfLength.pow(2)))
        lblResult.text = String.format("%1.1f", result)
      }
    }
  }

  override fun onBackPressed() {
    this.finish()
    this.startActivity(Intent(this, ChoiceView::class.java));
    overridePendingTransition(R.anim.slide_from_left, R.anim.slide_to_right)
  }
}
