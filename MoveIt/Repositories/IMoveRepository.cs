using MoveIt.Models;
using System.Collections.Generic;

namespace MoveIt.Repositories
{
    public interface IMoveRepository
    {
        void Add(Move move);
        void Delete(int id);
        List<Move> GetAllMoves();
        Move GetMoveById(int id);
        void Update(Move move);
    }
}