package wonder.yahoo.ca.fabriccalculation;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.telecom.TelecomManager;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class Flower extends AppCompatActivity
{

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_flower);
        setTitle("花");

        Button btnCalculate = (Button) findViewById(R.id.btnFlowerCalculate);

        btnCalculate.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                EditText txt80 = (EditText) findViewById(R.id.txt80);
                EditText txt70 = (EditText) findViewById(R.id.txt70);
                EditText txt60 = (EditText) findViewById(R.id.txt60);
                EditText txt50 = (EditText) findViewById(R.id.txt50);
                EditText txt40 = (EditText) findViewById(R.id.txt40);
                EditText txt30 = (EditText) findViewById(R.id.txt30);
                EditText txt20 = (EditText) findViewById(R.id.txt20);
                EditText txt15 = (EditText) findViewById(R.id.txt15);
                EditText txt10 = (EditText) findViewById(R.id.txt10);
                EditText txtLength = (EditText) findViewById(R.id.txtLength);
                EditText txtWidth = (EditText) findViewById(R.id.txtWidth);
                TextView lblResult = (TextView) findViewById(R.id.lblResult);

                EditText[] txtFlower = {txt80, txt70, txt60, txt50, txt40, txt30, txt20, txt15, txt10};
                double amount[] = new double[9];

                for (int i = 0; i < 9; i++)
                {
                    amount[i] = Global.getValue(txtFlower[i].getText().toString());
                }

                double length = Global.getValue(txtLength.getText().toString());
                double width = Global.getValue(txtWidth.getText().toString());
                double paperArea = length * width;

                double area[] = new double[9];
                area[0] = 9 * 1152 + 8 * 896 + 7 * 700 + 6 * 528 + 5 * 462 + 8 * 360 + 6 * 255 + 3 * 156 + 4 * 132;
                area[1] = 8 * 896 + 7 * 700 + 6 * 528 + 5 * 462 + 8 * 360 + 6 * 255 + 3 * 156 + 4 * 132;
                area[2] = 7 * 700 + 6 * 528 + 5 * 462 + 8 * 360 + 6 * 255 + 3 * 156 + 4 * 132;
                area[3] = 6 * 528 + 5 * 462 + 8 * 360 + 6 * 255 + 3 * 156 + 4 * 132;
                area[4] = 5 * 462 + 8 * 360 + 6 * 255 + 3 * 156 + 4 * 132;
                area[5] = 6 * 196 + 5 * 144 + 6 * 121 + 3 * 72 + 5 * 56;
                area[6] = 5 * 144 + 6 * 121 + 3 * 72 + 5 * 56;
                area[7] = 6 * 56 + 5 * 42 + 3 * 30 + 3 * 25;
                area[8] = 6 * 42 + 5 * 30 + 5 * 25 + 16;

                double required = 0;

                for (int i = 0; i < 9; i++)
                {
                    required = required + area[i] / paperArea * amount[i];
                }

                lblResult.setText(String.format("%s pcs", Global.roundUp(required * 1.03)));
            }
        });
    }
}
