using MoveIt.Models;
using System.Collections.Generic;

namespace MoveIt.Repositories
{
    public interface IBoxRepository
    {
        void Add(Box box);
        void Delete(int id);
        List<Box> GetAllBoxesByMoveId(int id);
        Box GetBoxById(int id);
        void Update(Box box);
    }
}