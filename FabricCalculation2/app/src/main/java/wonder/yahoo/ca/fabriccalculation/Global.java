package wonder.yahoo.ca.fabriccalculation;

public class Global
{
    public static double getValue(String textBoxData)
    {
        try
        {
            return Double.parseDouble(textBoxData);
        }

        catch (NumberFormatException e)
        {
            return 0;
        }
    }

    public static double roundUp(double value)
    {
        return Math.ceil(value * 10) / 10;
    }
}
