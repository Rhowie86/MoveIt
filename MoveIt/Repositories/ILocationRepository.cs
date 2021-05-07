using MoveIt.Models;
using System.Collections.Generic;

namespace MoveIt.Repositories
{
    public interface ILocationRepository
    {
        void Add(Location location);
        void Delete(int id);
        List<Location> GetAllLocations();
        Location GetLocationById(int id);
        void Update(Location location);
    }
}