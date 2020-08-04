package com.wonderge.stripecalculator

import android.content.Context
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*
import kotlin.math.ceil
import kotlin.math.pow
import kotlin.math.sqrt

class BtnCalculateController(val appContext : Context) : View.OnClickListener {
  override fun onClick(p0: View?) {
    val length : Double = Value.GetValueFromEditText((appContext as AppCompatActivity).txtLength)
    val width : Double = Value.GetValueFromEditText(appContext.txtWidth)
    val fabricWidth : Double = Value.GetValueFromEditText(appContext
        .txtFabricWidth) * 2.54

    val triangleSideLength = sqrt(2 * width.pow(2))
    val triangleArea = (triangleSideLength * triangleSideLength) / 2
    val area : Double = length * width + 2 * triangleArea
    val shapeLength : Double;

    if (fabricWidth == 0.0) {
      shapeLength = Rounding.Round(ceil(sqrt(area)) * 1.1 / 2.54, 1)

    } else {
      shapeLength = Rounding.Round(ceil(area / fabricWidth) * 1.1 / 2.54, 1)
    }
    appContext.lblResult.text = String.format("边长: %1.1finch", shapeLength)
  }
}