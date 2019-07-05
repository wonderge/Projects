package wonder.yahoo.ca.fabriccalculation;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class StartScreen extends AppCompatActivity
{

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_start_screen);
        setTitle("计算布的用量");

        Button btnNapkin = (Button) findViewById(R.id.btnNapkin);
        Button btnTablecloth = (Button) findViewById(R.id.btnTablecloth);
        Button btnSash = (Button) findViewById(R.id.btnSash);
        Button btnChairCover = (Button) findViewById(R.id.btnChairCover);
        Button btnClip = (Button) findViewById(R.id.btnClip);
        Button btnSkirt = (Button) findViewById(R.id.btnSkirt);
        Button btnFlower = (Button) findViewById(R.id.btnFlower);

        btnNapkin.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                Intent gotoNapkin = new Intent(getApplicationContext(), Napkin.class);
                startActivity(gotoNapkin);
            }
        });

        btnChairCover.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                Intent gotoChairCover = new Intent(getApplicationContext(), ChairCover.class);
                startActivity(gotoChairCover);
            }
        });

        btnClip.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                Intent gotoClip = new Intent(getApplicationContext(), Clip.class);
                startActivity(gotoClip);
            }
        });

        btnSash.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                Intent gotoSash = new Intent(getApplicationContext(), Sash.class);
                startActivity(gotoSash);
            }
        });

        btnSkirt.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                Intent gotoSkirt = new Intent(getApplicationContext(), Skirt.class);
                startActivity(gotoSkirt);
            }
        });

        btnTablecloth.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                Intent gotoTableclothChoice = new Intent(getApplicationContext(), TableclothChoice.class);
                startActivity(gotoTableclothChoice);
            }
        });

        btnFlower.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                Intent gotoFLower = new Intent(getApplicationContext(), Flower.class);
                startActivity(gotoFLower);
            }
        });
    }
}
