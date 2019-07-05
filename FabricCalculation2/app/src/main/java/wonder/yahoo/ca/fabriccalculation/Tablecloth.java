package wonder.yahoo.ca.fabriccalculation;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.TextView;

public class Tablecloth extends AppCompatActivity
{

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tablecloth);
        setTitle("方形桌布");

        Button btnCalculate = (Button) findViewById(R.id.btnTableclothCalculate);

        btnCalculate.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                RadioButton radBtnNoJoints = (RadioButton) findViewById(R.id.radBtnNoJoints);
                RadioButton radBtnOneJoint = (RadioButton) findViewById(R.id.radBtnOneJoint);
                RadioButton radBtnTwoJoints = (RadioButton) findViewById(R.id.radBtnTwoJoints);
                RadioButton radBtnHemmed = (RadioButton) findViewById(R.id.radBtnHemmed);

                int joints = checkRadioButtons(radBtnNoJoints, radBtnOneJoint, radBtnTwoJoints);

                EditText txtAmount = (EditText) findViewById(R.id.txtAmount);
                EditText txtLength = (EditText) findViewById(R.id.txtLength);
                EditText txtWidth = (EditText) findViewById(R.id.txtWidth);
                EditText txtFabricWidth = (EditText) findViewById(R.id.txtFabricWidth);
                EditText txtYard = (EditText) findViewById(R.id.txtYard);
                TextView lblResult = (TextView) findViewById(R.id.lblResult);

                double amount = Global.getValue(txtAmount.getText().toString());
                double length = Global.getValue(txtLength.getText().toString());
                double width = Global.getValue(txtWidth.getText().toString());
                double fabricWidth = Global.getValue(txtFabricWidth.getText().toString());
                double yard = Global.getValue(txtYard.getText().toString());

                double ratio = 0, leftover, pieces, meters, yards;

                if (radBtnHemmed.isChecked())
                {
                    length = length + 1.5;
                    width = width + 1.5;
                }

                if (joints == 0)
                {
                    ratio = 1 * amount;
                }

                else if (joints == 1)
                {
                    leftover = width - fabricWidth;
                    pieces = Math.floor(fabricWidth / leftover);
                    ratio = (fabricWidth + (fabricWidth / pieces)) / fabricWidth * amount;
                }

                else if (joints == 2)
                {
                    leftover = (width - fabricWidth) / 2;
                    pieces = Math.floor(fabricWidth / leftover);
                    ratio = (fabricWidth + (fabricWidth / pieces) * 2) / fabricWidth * amount;
                }

                if (yard == 0 && joints != -1)
                {
                    yards = Math.ceil(ratio) * length / 36;
                    meters = Math.ceil(ratio) * length / 39;

                    if (joints == 0 && width > fabricWidth)
                    {
                        yards = 0;
                        meters = 0;
                    }

                    lblResult.setText(String.format("%s y \n%s m", Global.roundUp(yards * 1.03), Global.roundUp(meters * 1.03)));
                }

                else if (amount == 0 && joints != -1)
                {
                    amount = Math.floor(yard / 1.03 * 36 / length / ratio);
                    lblResult.setText(String.format("%s", amount));
                }
            }
        });
    }

    private int checkRadioButtons(RadioButton radBtnNoJoints, RadioButton radBtnOneJoint, RadioButton radBtnTwoJoints)
    {
        if (radBtnNoJoints.isChecked())
        {
            return 0;
        }

        else if (radBtnOneJoint.isChecked())
        {
            return 1;
        }

        else if (radBtnTwoJoints.isChecked())
        {
            return 2;
        }

        return -1;
    }
}
