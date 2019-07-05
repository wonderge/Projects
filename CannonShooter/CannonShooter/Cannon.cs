using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;

namespace CannonShooter
{
    class Cannon
    {
        protected int health;
        protected int defense;
        protected int cost;
        protected string name;
        protected PointF position;
        protected SizeF size;
        protected RectangleF hitBox;
        protected Image image;

        public int Health
        {
            get { return health; }
        }

        public int Defense
        {
            get { return defense; }
        }

        public int Cost
        {
            get { return cost; }
        }

        public string Name
        {
            get { return name; }
        }

        public PointF Position
        {
            get { return position; }
        }

        public SizeF Size
        {
            get { return size; }
        }

        public RectangleF HitBox
        {
            get { return hitBox; }
        }

        public Image Image
        {
            get { return image; }
        }
    }
}
