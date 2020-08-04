package com.fabricconversion

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.choice_view.*
import kotlin.system.exitProcess

class ChoiceView : AppCompatActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.choice_view)

    btnCircleToNapkin.setOnClickListener {
      val intent : Intent = Intent(this, CircleToNapkinView::class.java)
      this.finish()
      this.startActivity(intent);
      overridePendingTransition(R.anim.slide_from_right, R.anim.slide_to_left)
    }

    btnCircleToRectangle.setOnClickListener {
      val intent : Intent = Intent(this, CircleToRectangleView::class.java);
      this.finish()
      this.startActivity(intent);
      overridePendingTransition(R.anim.slide_from_right, R.anim.slide_to_left)
    }

    btnRectangleToNapkin.setOnClickListener {
      val intent : Intent = Intent(this, RectangleToNapkinView::class.java);
      this.finish()
      startActivity(intent);
      overridePendingTransition(R.anim.slide_from_right, R.anim.slide_to_left)
    }
  }

  override fun onBackPressed() {
    moveTaskToBack(true)
    this.finishAffinity()
    exitProcess(-1)
  }
}
