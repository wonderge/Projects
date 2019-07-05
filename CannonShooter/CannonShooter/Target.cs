using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;

namespace CannonShooter
{
    class Target
    {
        protected int health;
        protected int defense;
        protected string name;
        protected Projectile projectile;
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

        public string Name
        {
            get { return name; }
        }

        public Projectile Projectile
        {
            get { return projectile; }
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
