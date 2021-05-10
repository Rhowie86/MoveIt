using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MoveIt.Models;
using MoveIt.Utils;

namespace MoveIt.Repositories
{
    public class MoveRepository : BaseRepository, IMoveRepository
    {
        public MoveRepository(IConfiguration configuration) : base(configuration) { }

        public List<Move> GetAllMoves(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    SELECT m.Id, m.[Name] AS MoveName, m.userId,
                                    u.Id AS UserId, u.DisplayName
                                    
                                    From Move m
                                    LEFT JOIN UserProfile u on u.Id = m.UserId
                                    
                                    WHERE u.Id = @userProfileId
                                    ORDER BY m.[Name] ASC;";


                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);
                    var reader = cmd.ExecuteReader();
                    var moves = new List<Move>();
                    while (reader.Read()) 
                    {
                        moves.Add(new Move()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "MoveName"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),

                            },
                            

                        });
                    }

                    reader.Close();
                    return moves;

                }
            }
        }

        public Move GetMoveById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT m.Id, m.[Name] AS MoveName, m.userId,
                                    u.Id AS UserId, u.DisplayName
                                    
                                    From Move m
                                    LEFT JOIN UserProfile u on u.Id = m.UserId
                                    
                                    WHERE m.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    Move move = null;
                    while (reader.Read())
                    {
                        move = new Move()
                        {
                            Id = id,
                            Name = DbUtils.GetString(reader, "MoveName"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName")
                            },
                          
                        };
                    }
                    reader.Close();
                    return move;
                }

            }
        }

        public void Add(Move move)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Move (Name, UserId)
                            OUTPUT INSERTED.ID
                        VALUES (@name, @userId);";

                    DbUtils.AddParameter(cmd, "@name", move.Name);
                    DbUtils.AddParameter(cmd, "@userId", move.UserId);

                    move.Id = (int)cmd.ExecuteScalar();

                }
            }
        }

        public void Update(Move move)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                UPDATE Move
                                    SET Name = @name
                                    WHERE Id = @id;";

                    DbUtils.AddParameter(cmd, "@id", move.Id);
                    DbUtils.AddParameter(cmd, "@name", move.Name);

                    cmd.ExecuteNonQuery();
                    
                }
            }
        }

        public void Delete(int id)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Move WHERE Id = @id;";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }




    }
}
