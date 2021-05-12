using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MoveIt.Models;
using MoveIt.Utils;

namespace MoveIt.Repositories
{
    public class AreaRepository : BaseRepository, IAreaRepository
    {
        public AreaRepository(IConfiguration configuration) : base(configuration) { }

        public List<Area> GetAllAreas()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                     SELECT a.Id, a.areaName
                                        FROM Area a
                                     ORDER BY a.areaName ASC;";
                    var reader = cmd.ExecuteReader();
                    var areas = new List<Area>();
                    while (reader.Read())
                    {
                        areas.Add(new Area()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            AreaName = DbUtils.GetString(reader, "AreaName")
                        });
                    }
                    reader.Close();
                    return areas;
                }
            }
        }

        public Area GetAreaByUser( int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT a.AreaName, a.userId FROM Area a LEFT JOIN UserProfile u ON u.id = a.userId WHERE a.userId = @userId;";
                    DbUtils.AddParameter(cmd, "@userId", id);

                    var reader = cmd.ExecuteReader();

                    Area area = null;
                    while (reader.Read())
                    {
                        area = new Area()
                        {
                            
                            AreaName = DbUtils.GetString(reader, "AreaName")
                        };
                    }
                    reader.Close();
                    return area;
                }
            }
        }

        public Area GetAreaById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    SELECT AreaName
                                    FROM Area
                                    WHERE Id = @id;";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    Area area = null;
                    while (reader.Read())
                    {
                        area = new Area()
                        {
                            Id = id,
                            AreaName = DbUtils.GetString(reader, "AreaName")
                        };

                    }
                    reader.Close();
                    return area;
                }
            }
        }

        public void Add(Area area)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                     INSERT INTO Area (AreaName, UserId)
                                        OUTPUT INSERTED.ID
                                     VALUES (@areaName, @userId)";

                    DbUtils.AddParameter(cmd, "@areaName", area.AreaName);
                    DbUtils.AddParameter(cmd, "@userId", area.UserId);

                    area.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Area area)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        UPDATE Area
                                            SET AreaName = @areaName
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@areaName", area.AreaName);
                    DbUtils.AddParameter(cmd, "@id", area.Id);

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
                                        DELETE FROM Area
                                            WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
   
    }
}

