package helper;

import android.content.Context;
import android.widget.EditText;
import android.widget.Toast;

public class Check {
  public static boolean checkFields(EditText[] textboxes, Context context) {
    for (EditText textbox : textboxes) {
      if (textbox.getText().toString().isEmpty()) {
        Toast.makeText(context, "请填充所有选择", Toast.LENGTH_SHORT).show();
        return false;
      }
    }

    return true;
  }

  public static boolean checkFields(EditText[] textboxes, double value, int value2, Context context) {
    for (EditText textbox : textboxes) {
      if (textbox.getText().toString().isEmpty()) {
        Toast.makeText(context, "请填充所有选择", Toast.LENGTH_SHORT).show();
        return false;
      }
    }

    if (value == 0) {
      Toast.makeText(context, "请填充所有选择", Toast.LENGTH_SHORT).show();
      return false;
    }

    if (value2 == -1)
    {
      Toast.makeText(context, "请填充所有选择", Toast.LENGTH_SHORT).show();
      return false;
    }

    return true;
  }

  public static boolean checkFields(EditText[] textboxes, double value, Context context) {
    for (EditText textbox : textboxes) {
      if (textbox.getText().toString().isEmpty()) {
        Toast.makeText(context, "请填充所有选择", Toast.LENGTH_SHORT).show();
        return false;
      }
    }

    if (value == 0) {
      Toast.makeText(context, "请填充所有选择", Toast.LENGTH_SHORT).show();
      return false;
    }

    return true;
  }
}
