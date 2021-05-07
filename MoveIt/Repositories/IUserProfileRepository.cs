using System.Collections.Generic;
using MoveIt.Models;

namespace MoveIt.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        List<UserProfile> GetAllUserProfiles();
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        UserProfile GetById(int id);
    }
}