package wonder.yahoo.ca.fabriccalculation;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;

import org.w3c.dom.Text;

public class Skirt extends AppCompatActivity
{

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_skirt);
        setTitle("Skirt");

        Button btnSkirtCalculate = (Button) findViewById(R.id.btnSkirtCalculate);

        btnSkirtCalculate.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                EditText txtAmount = (EditText) findViewById(R.id.txtAmount);
                EditText txtFeet = (EditText) findViewById(R.id.txtFeet);
                EditText txtInch = (EditText) findViewById(R.id.txtInch);
                EditText txtHeight = (EditText) findViewById(R.id.txtHeight);
                EditText txtFabricWidth = (EditText) findViewById(R.id.txtFabricWidth);
                EditText txtYard = (EditText) findViewById(R.id.txtYard);
                TextView lblResult = (TextView) findViewById(R.id.lblResult);
                RadioButton radBtnDense = (RadioButton) findViewById(R.id.radBtnDense);
                RadioButton radBtnHemmed = (RadioButton) findViewById(R.id.radBtnHemmed);
                RadioButton radBtnMarrow = (RadioButton) findViewById(R.id.radBtnMarrow);

                double amount = Global.getValue(txtAmount.getText().toString());
                double feet = Global.getValue(txtFeet.getText().toString());
                double inch = Global.getValue(txtInch.getText().toString());
                double height = Global.getValue(txtHeight.getText().toString());
                double length = feet * 12 + inch;
                double fabricWidth = Global.getValue(txtFabricWidth.getText().toString());
                double yard = Global.getValue(txtYard.getText().toString());

                double multiplier = 3;

                if (radBtnDense.isChecked())
                {
                    multiplier = 2.5;
                }

                double trueLength = length * multiplier;

                if (radBtnHemmed.isChecked())
                {
                    trueLength = trueLength + 2;
                    height = height + 1.5;
                }

                else if (radBtnMarrow.isChecked())
                {
                    height = height + 0.5;
                }

                double ratio = fabricWidth / height;
                double yards, meters;

                if (yard == 0)
                {

                    if (ratio >= 2)
                    {
                        yards = Math.ceil(height / fabricWidth * amount) * trueLength / 36;
                        meters = Math.ceil(height / fabricWidth * amount) * trueLength / 39;
                    }

                    else
                    {
                        yards = Math.ceil(trueLength / fabricWidth * amount) * height / 36;
                        meters = Math.ceil(trueLength / fabricWidth * amount) * height / 39;
                    }

                    lblResult.setText(String.format("%s y\n%s m", Global.roundUp(yards * 1.03), Global.roundUp(meters * 1.03)));
                }

                if (amount == 0)
                {
                    if (ratio >= 2)
                    {
                        amount = Math.floor(yard * 36 / trueLength / (height / fabricWidth) / 1.03);
                    }

                    else
                    {
                        amount = Math.floor(yard * 36 / height / (trueLength / fabricWidth) / 1.03);
                    }

                    lblResult.setText(String.format("%s pcs", amount));
                }
            }
        });
    }
}
