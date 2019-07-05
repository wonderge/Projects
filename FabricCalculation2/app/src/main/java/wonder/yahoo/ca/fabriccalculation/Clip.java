package wonder.yahoo.ca.fabriccalculation;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class Clip extends AppCompatActivity
{

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_clip);
        setTitle("Clip");

        Button btnCalculate = (Button) findViewById(R.id.btnClipCalculate);

        btnCalculate.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                EditText txtSkirtAmount = (EditText) findViewById(R.id.txtSkirtAmount);
                EditText txtSkirtLength = (EditText) findViewById(R.id.txtSkirtLength);
                EditText txtAmount = (EditText) findViewById(R.id.txtAmount);
                EditText txtLength = (EditText) findViewById(R.id.txtLength);
                EditText txtWidth = (EditText) findViewById(R.id.txtWidth);
                EditText txtFabricWidth = (EditText) findViewById(R.id.txtFabricWidth);
                TextView lblResult = (TextView) findViewById(R.id.lblResult);

                double amount = Global.getValue(txtAmount.getText().toString());
                double length = Global.getValue(txtLength.getText().toString());
                double width = Global.getValue(txtWidth.getText().toString());
                double fabricWidth = Global.getValue(txtFabricWidth.getText().toString());
                double skirtAmount = Global.getValue(txtSkirtAmount.getText().toString());
                double skirtLength = Global.getValue(txtSkirtLength.getText().toString());

                double yards = (amount * skirtLength * skirtAmount) / Math.floor(fabricWidth / length) * width / 36;
                double meters = (amount * skirtLength * skirtAmount) / Math.floor(fabricWidth / length) * width / 39;

                lblResult.setText(String.format("%s y\n%s m", Global.roundUp(yards * 1.03), Global.roundUp(meters * 1.03)));
            }
        });
    }
}
