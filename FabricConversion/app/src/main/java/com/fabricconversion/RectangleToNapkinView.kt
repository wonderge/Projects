package com.fabricconversion

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.rectangle_to_napkin_view.*

class RectangleToNapkinView : AppCompatActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.rectangle_to_napkin_view)

    btnRectangleNapkinCalculate.setOnClickListener {
      val length: Double? = txtClothLength.text.toString().toDoubleOrNull()
      val width: Double? = txtClothWidth.text.toString().toDoubleOrNull()
      val napkinLength: Double? = txtRetangleNapkinLength.text.toString().toDoubleOrNull()

      if (length == null || width == null || napkinLength == null) {
        Toast.makeText(this, "请填充所有选择", Toast.LENGTH_SHORT).show()
      } else {
        val lengthRatio: Double = length.div(napkinLength).toInt().toDouble()
        val widthRatio: Double = width.div(napkinLength).toInt().toDouble()

        lblRectangleNapkinResult.text = String.format("%d pcs", lengthRatio.times(widthRatio).toInt());
      }
    }
  }

  override fun onBackPressed() {
    this.finish()
    this.startActivity(Intent(this, ChoiceView::class.java))
    overridePendingTransition(R.anim.slide_from_left, R.anim.slide_to_right)
  }
}
