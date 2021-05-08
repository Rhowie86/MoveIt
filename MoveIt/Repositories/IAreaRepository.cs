using MoveIt.Models;
using System.Collections.Generic;

namespace MoveIt.Repositories
{
    public interface IAreaRepository
    {
        void Add(Area area);
        void Delete(int id);
        List<Area> GetAllAreas();
        Area GetAreaById(int id);
        void Update(Area area);
    }
}