package wonder.yahoo.ca.fabriccalculation;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class TableclothChoice extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tablecloth_choice);
        setTitle("选择桌布种类");

        Button btnTablecloth = (Button) findViewById(R.id.btnCloth);
        Button btnRoundcloth = (Button) findViewById(R.id.btnRoundcloth);

        btnTablecloth.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                Intent gotoTablecloth = new Intent(getApplicationContext(), Tablecloth.class);
                startActivity(gotoTablecloth);
            }
        });

        btnRoundcloth.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                Intent gotoRoundcloth = new Intent(getApplicationContext(), Roundcloth.class);
                startActivity(gotoRoundcloth);
            }
        });
    }
}
