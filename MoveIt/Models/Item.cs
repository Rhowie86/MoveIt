using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoveIt.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string ItemName { get; set; }
        public int? BoxId { get; set; }
        public int ItemLocationId {get; set;}
        public int ItemAreaId { get; set; }
        public string ItemImageLocation { get; set; }
        public bool IsLoaded { get; set; }
        public int UserId { get; set; }
        public int MoveId { get; set; }
        public int PriorityId { get; set; }

        public Area area { get; set; }
        public Priority priority { get; set; }
        public Move move { get; set; }
        public Box box { get; set; }
    }
}
