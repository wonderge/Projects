package wonder.yahoo.ca.fabriccalculation;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class Roundcloth extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_roundcloth);
        setTitle("圆形桌布");

        Button btnCalculate = (Button) findViewById(R.id.btnRoundclothCalculate);

        btnCalculate.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                EditText txtAmount = (EditText) findViewById(R.id.txtAmount);
                EditText txtDiameter = (EditText) findViewById(R.id.txtDiameter);
                EditText txtFabricWidth = (EditText) findViewById(R.id.txtFabricWidth);
                EditText txtYard = (EditText) findViewById(R.id.txtYard);
                TextView lblResult = (TextView) findViewById(R.id.lblResult);
                TextView lblSideLength = (TextView) findViewById(R.id.lblSideLength);

                double amount = Global.getValue(txtAmount.getText().toString());
                double diameter = Global.getValue(txtDiameter.getText().toString());
                double fabricWidth = Global.getValue(txtFabricWidth.getText().toString());
                double yard = Global.getValue(txtYard.getText().toString());
                double radius = diameter / 2;
                double halfFabricWidth = fabricWidth / 2;
                double[] sideLength = new double[2];
                sideLength = SidePieceLength(fabricWidth, sideLength, diameter, radius, halfFabricWidth);

                double yards = 0, meters = 0;
                if (yard == 0)
                {
                    if ((diameter / fabricWidth) < 1)
                    {
                        yards = diameter * amount / 36;
                        meters = diameter * amount / 39;
                    }

                    else if ((diameter / fabricWidth) < 2)
                    {
                        yards = ((diameter + sideLength[0]) * amount + sideLength[0] * Math.ceil((radius - fabricWidth) * 2 * amount / fabricWidth)) / 36;
                        meters = ((diameter + sideLength[0]) * amount + sideLength[0] * Math.ceil((radius - fabricWidth) * 2 * amount / fabricWidth)) / 39;
                    }

                    else
                    {
                        yards = ((diameter + sideLength[0]) * amount + sideLength[1] * Math.ceil((radius - fabricWidth) * 2 * amount / fabricWidth)) / 36;
                        meters = ((diameter + sideLength[0]) * amount + sideLength[1] * Math.ceil((radius - fabricWidth) * 2 * amount / fabricWidth)) / 39;
                    }

                    lblResult.setText(String.format("%s y\n%s m", Global.roundUp(yards * 1.03), Global.roundUp(meters * 1.03)));

                    if (sideLength[1] != 0)
                    {
                        lblSideLength.setText(String.format("侧片边长: %s inch\n侧片边长: %s inch", sideLength[0], sideLength[1]));
                    }

                    else
                    {
                        lblSideLength.setText(String.format("侧片边长: %s inch", sideLength[0]));
                    }
                }

                if (amount == 0)
                {
                    amount = Math.floor(yard * 36 / (sideLength[1] * ((radius - fabricWidth) * 2 / fabricWidth) + (diameter + sideLength[0])) / 1.03);
                    lblResult.setText(String.format("%s pcs", amount));
                }
            }
        });
    }

    private double[] SidePieceLength(double fabricWidth, double[] sideLength, double diameter, double radius, double halfFabricWidth)
    {
        if ((diameter / fabricWidth) < 1)
        {
            sideLength[0] = 0;
        }

        else if ((diameter / fabricWidth) < 2)
        {
            sideLength[0] = Math.ceil(Math.sqrt(Math.pow(radius, 2) - Math.pow(halfFabricWidth, 2)) * 2);
        }

        else
        {
            sideLength[0] = Math.ceil(Math.sqrt(Math.pow(radius, 2) - Math.pow(halfFabricWidth, 2)) * 2);
            sideLength[1] = Math.ceil(Math.sqrt(Math.pow(radius, 2) - Math.pow(fabricWidth, 2)) * 2);
        }

        return sideLength;
    }
}
