package conversion;

public class Value {

  public static double getDouble(String s) {
    try {
      return Double.parseDouble(s);
    } catch (NumberFormatException e) {
      return 0;
    }
  }

  public static double round(double value) {
    return Math.ceil(value * 10) / 10;
  }
}
