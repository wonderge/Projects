package com.b07.fabricusageandweight

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*
import kotlin.math.ceil

class MainActivity : AppCompatActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)

    btnCalculate.setOnClickListener {
      val weight : Double = txtWeight.text.toString().toDouble()
      val tubeWeight : Double = getTubeWeight()
      val fabricWeight : Double = getFabricWeight()

      if (fabricWeight == 0.0 || tubeWeight == 0.0) {
        Toast.makeText(this, "请填充所有选择", Toast.LENGTH_SHORT).show()
      } else {
        var result = (weight - tubeWeight).div(fabricWeight);
        result = ceil(result * 10) / 10;
        lblResult.text = String.format("%1.1fy", result);
      }
    }
  }

  fun getTubeWeight() : Double {
    if (radbtnSmall.isChecked) {
      return 220.0
    } else if (radbtnBig.isChecked) {
      return 278.0
    }
    return 0.0
  }

  fun getFabricWeight() : Double {
    if (radbtnPoplin.isChecked) {
      return 250.0
    } else if (radbtnSatin.isChecked) {
      return 210.0
    }
    return 0.0;
  }
}
