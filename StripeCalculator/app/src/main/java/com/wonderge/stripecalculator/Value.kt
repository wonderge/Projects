package com.wonderge.stripecalculator

import android.widget.EditText

class Value {
  companion object {
    fun GetValueFromEditText(editText: EditText) : Double
    {
      val value = editText.text.toString().toDoubleOrNull()

      if (value == null)
      {
        return 0.0
      } else {
        return value
      }
    }
  }
}