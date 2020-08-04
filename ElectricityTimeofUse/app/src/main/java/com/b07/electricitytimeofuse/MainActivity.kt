package com.b07.electricitytimeofuse

import android.os.Bundle
import android.speech.tts.TextToSpeech
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.jakewharton.threetenabp.AndroidThreeTen
import kotlinx.android.synthetic.main.activity_main.*
import org.threeten.bp.ZoneId
import org.threeten.bp.ZonedDateTime
import java.util.*
import kotlin.system.exitProcess

class MainActivity : AppCompatActivity(), TextToSpeech.OnInitListener {

  private var tts: TextToSpeech? = null
  private var check: Boolean = false
  private var content : Content? = null

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)
    AndroidThreeTen.init(this)
    val zoneId: ZoneId = ZoneId.of("Canada/Eastern")
    val date: ZonedDateTime = ZonedDateTime.now(zoneId)

    var timeOfUse: String = Electricity.getTimeOfUse(date.monthValue, date.hour, date.dayOfWeek
        .value)

    content = Content(timeOfUse, this)
    lblMessage.text = content!!.message
    lblMessage.setTextColor(content!!.color)

    tts = TextToSpeech(this, this)
    btnTest.setOnClickListener {
      timeOfUse = Electricity.getTimeOfUse(date.monthValue, date.hour, date.dayOfWeek.value)
      content = Content(timeOfUse, this)
      lblMessage.text = content!!.message
      lblMessage.setTextColor(content!!.color)
      tts!!.speak(content!!.text, TextToSpeech.QUEUE_FLUSH, null, "")
    }
  }

  override fun onInit(p0: Int) {
    if (p0 == TextToSpeech.SUCCESS) {
      val result = tts!!.setLanguage(Locale.SIMPLIFIED_CHINESE)

      if (result == TextToSpeech.LANG_MISSING_DATA || result == TextToSpeech.LANG_NOT_SUPPORTED) {
        Toast.makeText(this, "Error something went wrong", Toast.LENGTH_SHORT).show()
      } else {
        check = true;
      }
      tts!!.speak(content!!.text, TextToSpeech.QUEUE_FLUSH, null, "")
    }
  }

  override fun onDestroy() {
    if (tts != null) {
      (tts as TextToSpeech).stop()
      (tts as TextToSpeech).shutdown()
    }
    super.onDestroy()
  }

  override fun onBackPressed() {
    this.finish()
    moveTaskToBack(true)
    exitProcess(-1)
  }
}
