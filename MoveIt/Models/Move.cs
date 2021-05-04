using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;

namespace MoveIt.Models
{
    public class Move
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public UserProfile userProfile { get; set; }
        public Location Location { get; set; }

        public int UserId { get; set; }
    }
}
