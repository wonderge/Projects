package com.wonderge.stripecalculator

import kotlin.math.pow

class Rounding {
  companion object {
    fun Round(number: Double, decimalPlaces: Int): Double {
      return Math.round(number * 10.0.pow(decimalPlaces)) / 10.0.pow(decimalPlaces);
    }
  }
}