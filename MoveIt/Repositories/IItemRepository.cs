using MoveIt.Models;
using System.Collections.Generic;

namespace MoveIt.Repositories
{
    public interface IItemRepository
    {
        void Add(Item item);
        void Delete(int id);
        List<Item> GetAllItemsByMoveId(int moveId);
        Item GetItemById(int id);
        void Update(Item item);
    }
}