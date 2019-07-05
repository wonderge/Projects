package wonder.yahoo.ca.fabriccalculation;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.TextView;

public class Napkin extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_napkin);
        setTitle("餐巾");

        Button btnCalculate = (Button) findViewById(R.id.btnNapkinCalculate);

        btnCalculate.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                EditText txtAmount = (EditText) findViewById(R.id.txtAmount);
                EditText txtLength = (EditText) findViewById(R.id.txtLength);
                EditText txtWidth = (EditText) findViewById(R.id.txtWidth);
                EditText txtFabricWidth = (EditText) findViewById(R.id.txtFabricWidth);
                EditText txtYard = (EditText) findViewById(R.id.txtYard);
                TextView lblResult = (TextView) findViewById(R.id.lblResult);
                RadioButton radBtnHemmed = (RadioButton) findViewById(R.id.radBtnHemmed);


                double amount = Global.getValue(txtAmount.getText().toString());
                double fabricWidth = Global.getValue(txtFabricWidth.getText().toString());
                double length = Global.getValue(txtLength.getText().toString());
                double width = Global.getValue(txtWidth.getText().toString());
                double yard = Global.getValue(txtYard.getText().toString());

                if (radBtnHemmed.isChecked())
                {
                    length = length + 1.5;
                    width = width + 1.5;
                }

                double meters, yards;

                if (fabricWidth % length < fabricWidth % width)
                {
                    if (yard == 0)
                    {
                        yards = Math.ceil(amount / Math.floor(fabricWidth / length)) * width / 36;
                        meters = Math.ceil(amount / Math.floor(fabricWidth / length)) * width / 39;
                        lblResult.setText(String.format("%s y \n%s m", Global.roundUp(yards * 1.03), Global.roundUp(meters * 1.03)));
                    }

                    else if (amount == 0)
                    {
                        amount = Math.floor(yard * 36 / width * Math.floor(fabricWidth / length) / 1.03);
                        lblResult.setText(String.format("%s pcs", amount));
                    }
                }

                else if (fabricWidth % width <= fabricWidth % length)
                {
                    if (yard == 0)
                    {
                        yards = Math.ceil(amount / Math.floor(fabricWidth / width)) * length / 36;
                        meters = Math.ceil(amount / Math.floor(fabricWidth / width)) * length / 39;
                        lblResult.setText(String.format("%s y \n%s m", Global.roundUp(yards * 1.03), Global.roundUp(meters * 1.03)));
                    }

                    else if (amount == 0)
                    {
                        amount = Math.floor(yard * 36 / length * Math.floor(fabricWidth / width) / 1.03);
                        lblResult.setText(String.format("%s pcs", amount));
                    }
                }
            }
        });
    }
}
