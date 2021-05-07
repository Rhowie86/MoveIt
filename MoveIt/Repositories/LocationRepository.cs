using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MoveIt.Models;
using MoveIt.Utils;

namespace MoveIt.Repositories
{
    public class LocationRepository : BaseRepository, ILocationRepository
    {
        public LocationRepository(IConfiguration configuration) : base(configuration) { }

        public List<Location> GetAllLocations()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                     SELECT l.Id, l.locationName
                                        FROM Location l
                                     ORDER BY l.locationName ASC;";
                    var reader = cmd.ExecuteReader();
                    var locations = new List<Location>();
                    while (reader.Read())
                    {
                        locations.Add(new Location()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            LocationName = DbUtils.GetString(reader, "LocationName")
                        });
                    }
                    reader.Close();
                    return locations;
                }
            }
        }

        public Location GetLocationById(int id)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    SELECT LocationName
                                    FROM Location
                                    WHERE Id = @id;";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    Location location = null;
                    while (reader.Read())
                    {
                        location = new Location()
                        {
                            Id = id,
                            LocationName = DbUtils.GetString(reader, "LocationName")
                        };

                    }
                    reader.Close();
                    return location;
                }
            }
        }

        public void Add(Location location)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                     INSERT INTO Location (LocationName)
                                        OUTPUT INSERTED.ID
                                     VALUES (@locationName)";

                    DbUtils.AddParameter(cmd, "@locationName", location.LocationName);

                    location.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Location location)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        UPDATE Location
                                            SET LocationName = @locationName
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@locationName", location.LocationName);
                    DbUtils.AddParameter(cmd, "@id", location.Id);

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
                                        DELETE FROM Location
                                            WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
    
