using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MoveIt.Models;
using MoveIt.Utils;

namespace MoveIt.Repositories
{
    public class BoxRepository : BaseRepository, IBoxRepository
    {
        public BoxRepository(IConfiguration configuration) : base(configuration) { }

        public List<Box> GetAllBoxesByMoveId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                     SELECT b.Id, b.boxName, b.moveId,
                                        m.id
                                        FROM Box b
                                        LEFT JOIN Move m ON m.Id = b.moveId
                                        WHERE b.moveId = @id
                                     ;";
                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();
                    var boxes = new List<Box>();
                    while (reader.Read())
                    {
                        boxes.Add(new Box()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            BoxName = DbUtils.GetString(reader, "BoxName"),
                            move = new Move()
                            {
                                Id = DbUtils.GetInt(reader, "Id")
                            }
                        });
                    }
                    reader.Close();
                    return boxes;
                }
            }
        }

        public Box GetBoxById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    SELECT BoxName
                                    FROM Box
                                    WHERE Id = @id;";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    Box box = null;
                    while (reader.Read())
                    {
                        box = new Box()
                        {
                            Id = id,
                            BoxName = DbUtils.GetString(reader, "BoxName")
                        };

                    }
                    reader.Close();
                    return box;
                }
            }
        }

        public void Add(Box box)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                     INSERT INTO Box (BoxName, MoveId)
                                        OUTPUT INSERTED.ID
                                     VALUES (@boxName, @moveId)";


                    DbUtils.AddParameter(cmd, "@boxName", box.BoxName);
                    DbUtils.AddParameter(cmd, "@moveId", box.MoveId);

                    box.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Box box)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        UPDATE Box
                                            SET BoxName = @boxName
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@boxName", box.BoxName);
                    DbUtils.AddParameter(cmd, "@id", box.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        DELETE FROM Box
                                            WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

