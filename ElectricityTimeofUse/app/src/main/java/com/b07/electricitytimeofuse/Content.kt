package com.b07.electricitytimeofuse

import android.content.Context
import androidx.core.content.ContextCompat

class Content constructor(private var timeOfUse: String, private var context: Context) {
  var text : String
  var message : String
  var color : Int

  init {
    if (timeOfUse == "low") {
      text = "敞开着用吧, 现在是低峰"
      message = "现在是低峰"
      color = ContextCompat.getColor(context, R.color.green)

    } else if (timeOfUse == "mid") {
      text = "能省就省, 现在是中峰"
      message = "现在是中峰"
      color = ContextCompat.getColor(context, R.color.yellow)
    } else {
      text = "省着点吧, 现在是高峰"
      message = "现在是高峰"
      color = ContextCompat.getColor(context, R.color.red)
    }
  }
}