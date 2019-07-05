package wonder.yahoo.ca.fabriccalculation;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.TextView;

public class Sash extends AppCompatActivity
{

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sash);
        setTitle("Sash");

        Button btnCalculate = (Button) findViewById(R.id.btnSashCalculate);

        btnCalculate.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                EditText txtAmount = (EditText) findViewById(R.id.txtAmount);
                EditText txtLength = (EditText) findViewById(R.id.txtLength);
                EditText txtWidth = (EditText) findViewById(R.id.txtWidth);
                EditText txtFabricWidth = (EditText) findViewById(R.id.txtFabricWidth);
                TextView lblResult = (TextView) findViewById(R.id.lblResult);
                RadioButton radBtnSlant = (RadioButton) findViewById(R.id.radBtnSlant);

                double amount = Global.getValue(txtAmount.getText().toString());
                double length = Global.getValue(txtLength.getText().toString());
                double width = Global.getValue(txtWidth.getText().toString());
                double fabricWidth = Global.getValue(txtFabricWidth.getText().toString());

                if (radBtnSlant.isChecked())
                {
                    length = length + width;
                }

                double ratio = Math.floor(fabricWidth / width);
                double yards = Math.ceil(amount / ratio) * length / 36;
                double meters = Math.ceil(amount / ratio) * length / 39;

                lblResult.setText(String.format("%s y\n%s m", Global.roundUp(yards * 1.03), Global.roundUp(meters * 1.03)));
            }
        });
    }
}
