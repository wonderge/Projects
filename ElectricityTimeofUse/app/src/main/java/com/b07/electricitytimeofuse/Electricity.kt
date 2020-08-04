package com.b07.electricitytimeofuse

class Electricity {
  companion object {
    fun getTimeOfUse(hour : Int, month : Int, day : Int) : String {
      if (day in 6..7) {
        return "low"
      }

      if (month in 5..11) {
        if (hour in 7..11) {
          return "mid"
        } else if (hour in 11..17) {
          return "high"
        } else if (hour in 17..19) {
          return "mid"
        } else {
          return "low"
        }
      } else {
        if (hour in 7..11) {
          return "high"
        } else if (hour in 11..17) {
          return "mid"
        } else if (hour in 17..19) {
          return "high"
        } else {
          return "low"
        }
      }
    }
  }
}