using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoveIt.Models
{
    public class Box
    {
        public int Id { get; set; }
        public string BoxName { get; set; }
        public int MoveId { get; set; }

        public Item Item { get; set; }
    }
}
