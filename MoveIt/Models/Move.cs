using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoveIt.Models
{
    public class Move
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public UserProfile UserProfile { get; set; }
        public Location Location { get; set; }

        public int UserId { get; set; }
    }
}
