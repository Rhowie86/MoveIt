using MoveIt.Models;
using System.Collections.Generic;

namespace MoveIt.Repositories
{
    public interface IMoveRepository
    {
        List<Move> GetAllMoves();
        object GetMoveById(int id);
    }
}