using MoveIt.Models;
using System.Collections.Generic;

namespace MoveIt.Repositories
{
    public interface IPriorityRepository
    {
        void Add(Priority priority);
        void Delete(int id);
        List<Priority> GetAllPriorities();
        Priority GetPriorityById(int id);
        void Update(Priority priority);
    }
}