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

        public List<Move> GetAllMoves()
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
                                    JOIN UserProfile u on u.Id = m.UserId
                                    ORDER BY m.[Name] ASC;";



                    var reader = cmd.ExecuteReader();
                    var moves = new List<Move>();
                    while (reader.Read()) 
                    {
                        moves.Add(new Move()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "MoveName"),
                            userProfile = new Tabloid.Models.UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),

                            }

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
                                    JOIN UserProfile u on u.Id = m.UserId
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
                            userProfile = new Tabloid.Models.UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName")
                            }
                        };
                    }
                    reader.Close();
                    return move;
                }

            }
        }



    }
}
