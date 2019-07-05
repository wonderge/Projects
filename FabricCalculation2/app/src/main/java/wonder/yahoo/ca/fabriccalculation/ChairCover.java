package wonder.yahoo.ca.fabriccalculation;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.List;

public class ChairCover extends AppCompatActivity
{

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chair_cover);
        setTitle("Chair Cover");

        Button btnCalculate = (Button) findViewById(R.id.btnChairCoverCalculate);

        btnCalculate.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                EditText txtAmount = (EditText) findViewById(R.id.txtAmount);
                EditText txtFabricWidth = (EditText) findViewById(R.id.txtFabricWidth);
                EditText txtA = (EditText) findViewById(R.id.txtA);
                EditText txtB = (EditText) findViewById(R.id.txtB);
                EditText txtC = (EditText) findViewById(R.id.txtC);
                EditText txtD = (EditText) findViewById(R.id.txtD);
                EditText txtE = (EditText) findViewById(R.id.txtE);
                EditText txtF = (EditText) findViewById(R.id.txtF);
                EditText txtG = (EditText) findViewById(R.id.txtG);
                EditText txtH = (EditText) findViewById(R.id.txtH);
                TextView lblResult = (TextView) findViewById(R.id.lblResult);

                double amount = Global.getValue(txtAmount.getText().toString());
                double fabricWidth = Global.getValue(txtFabricWidth.getText().toString());
                double a = Global.getValue(txtA.getText().toString());
                double b = Global.getValue(txtB.getText().toString());
                double c = Global.getValue(txtC.getText().toString());
                double d = Global.getValue(txtD.getText().toString());
                double e = Global.getValue(txtE.getText().toString());
                double f = Global.getValue(txtF.getText().toString());
                double g = Global.getValue(txtG.getText().toString());
                double h = Global.getValue(txtH.getText().toString());
                List length = new ArrayList();
                List ratio = new ArrayList();

                double tempRatio = 0;

                if (a > h)
                {
                    h = a;
                }

                if (a > d)
                {
                    d = a;
                }

                length.add(b + c);
                tempRatio = Math.floor(fabricWidth / h);
                tempRatio = tempRatio + Math.floor((fabricWidth - tempRatio * h) / d);
                ratio.add(tempRatio);

                length.add(b + e);
                tempRatio = Math.floor(fabricWidth / d);
                tempRatio = tempRatio + Math.floor((fabricWidth - tempRatio * d) / h);
                ratio.add(tempRatio);

                if (f + 2 * g > 60)
                {
                    length.add(f + 2 * g);
                    ratio.add(Math.floor(fabricWidth / c));
                }

                else
                {
                    length.add(c);
                    ratio.add(Math.floor(fabricWidth / (f + 2 * g)));
                }

                double ratioIndexZero = (double) ratio.get(0);
                while (amount % ratioIndexZero != 0)
                {
                    amount++;
                }

                int size = length.size();
                double totalLength = 0, ratioAtIndex = 0, lengthAtIndex = 0;

                for (int i = 0; i < size; i++)
                {
                    ratioAtIndex = (double) ratio.get(i);
                    lengthAtIndex = (double) length.get(i);
                    totalLength = totalLength + (lengthAtIndex / ratioAtIndex) * amount;
                }

                double meters = totalLength / 39;
                double yards = totalLength / 36;

                lblResult.setText(String.format("%s y\n%s m", Global.roundUp(yards * 1.03), Global.roundUp(meters * 1.03)));
            }
        });
    }
}
