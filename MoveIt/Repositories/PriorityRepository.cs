using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MoveIt.Models;
using MoveIt.Utils;

namespace MoveIt.Repositories
{
    public class PriorityRepository : BaseRepository, IPriorityRepository
    {
        public PriorityRepository(IConfiguration configuration) : base(configuration) { }

        public List<Priority> GetAllPriorities()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                     SELECT p.Id, p.label
                                        FROM Priority p
                                     ;";
                    var reader = cmd.ExecuteReader();
                    var priorities = new List<Priority>();
                    while (reader.Read())
                    {
                        priorities.Add(new Priority()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Label = DbUtils.GetString(reader, "Label")
                        });
                    }
                    reader.Close();
                    return priorities;
                }
            }
        }

        public Priority GetPriorityById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    SELECT Label
                                    FROM Priority
                                    WHERE Id = @id;";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    Priority priority = null;
                    while (reader.Read())
                    {
                        priority = new Priority()
                        {
                            Id = id,
                            Label = DbUtils.GetString(reader, "Label")
                        };

                    }
                    reader.Close();
                    return priority;
                }
            }
        }

        public void Add(Priority priority)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                     INSERT INTO Priority (Label, UserId)
                                        OUTPUT INSERTED.ID
                                     VALUES (@label, @userId)";

                    DbUtils.AddParameter(cmd, "@label", priority.Label);
                    DbUtils.AddParameter(cmd, "@userId", priority.UserId);

                    priority.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Priority priority)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        UPDATE Priority
                                            SET Label = @Label
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@label", priority.Label);
                    DbUtils.AddParameter(cmd, "@id", priority.Id);

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
                                        DELETE FROM Priority
                                            WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

