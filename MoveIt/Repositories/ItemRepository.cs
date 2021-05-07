using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MoveIt.Models;
using MoveIt.Utils;

namespace MoveIt.Repositories
{
    public class ItemRepository : BaseRepository
    {
        public ItemRepository(IConfiguration configuration) : base(configuration) { }

      /*  public List<Item> GetAllItemsForMove()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                     SELECT ";
                }
            }
        } */
    }
}
