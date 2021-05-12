using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MoveIt.Models;
using MoveIt.Utils;

namespace MoveIt.Repositories
{
    public class ItemRepository : BaseRepository, IItemRepository
    {
        public ItemRepository(IConfiguration configuration) : base(configuration) { }

        public List<Item> GetAllItemsByMoveId(int moveId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                     SELECT i.Id, i.itemName, i.boxId, i.ItemAreaId, i.itemImage, i.isLoaded, i.userId, i.moveId, i.priorityId,
                                            m.Id, m.name, m.userId,
                                            b.id, b.boxName, b.moveId,
                                            p.id, p.label,
                                            a.id, a.areaName, a.userId,
                                            u.Id, u.FirebaseUserId, u.DisplayName
                                        FROM Items i
                                     LEFT JOIN Move m ON i.moveId = m.id
                                     LEFT JOIN Box b ON b.moveId = i.moveId
                                     LEFT JOIN Priority p ON p.id = i.priorityId
                                     LEFT JOIN Area a ON a.id = i.itemAreaId
                                     LEFT JOIN UserProfile u ON u.id = m.userId
                                    WHERE i.moveId = @moveId
                                            
                                     ;";
                    DbUtils.AddParameter(cmd, "@moveId", moveId);
                    var reader = cmd.ExecuteReader();
                    var items = new List<Item>();
                    while (reader.Read())
                    {
                        items.Add(new Item()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            ItemName = DbUtils.GetString(reader, "ItemName"),
                            BoxId = DbUtils.GetNullableInt(reader, "BoxId"),
                            ItemAreaId = DbUtils.GetInt(reader, "ItemAreaId"),
                            ItemImageLocation = DbUtils.GetString(reader, "ItemImage"),
                            IsLoaded = DbUtils.GetBoolean(reader, "IsLoaded"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            MoveId = DbUtils.GetInt(reader, "MoveId"),
                            PriorityId = DbUtils.GetInt(reader, "PriorityId"),
                            area = new Area()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                AreaName = DbUtils.GetString(reader, "AreaName"),
                                UserId = DbUtils.GetInt(reader, "UserId")
                            },
                            priority = new Priority()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Label = DbUtils.GetString(reader, "Label"),
                                UserId = DbUtils.GetInt(reader, "UserId")
                            },
                            box = new Box()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                BoxName = DbUtils.GetString(reader, "BoxName"),
                                MoveId = DbUtils.GetInt(reader, "MoveId"),

                            },
                            move = new Move()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),

                                }
                            }


                        });
                    }
                    reader.Close();
                    return items;
                }
            }
        }

        public Item GetItemById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    SELECT ItemName
                                    FROM Item
                                    WHERE Id = @id;";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    Item item = null;
                    while (reader.Read())
                    {
                        item = new Item()
                        {
                            Id = id,
                            ItemName = DbUtils.GetString(reader, "ItemName")
                        };

                    }
                    reader.Close();
                    return item;
                }
            }
        }

        public void Add(Item item)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                     INSERT INTO Items (ItemName, BoxId, ItemAreaId, isLoaded, UserId, MoveId, PriorityId)
                                        OUTPUT INSERTED.ID
                                     VALUES (@itemName, @boxId, @itemAreaId, @isLoaded, @userId, @moveId, @priorityId)";

                     DbUtils.AddParameter(cmd, "@itemName", item.ItemName);
                     
                     DbUtils.AddParameter(cmd, "@boxId", item.BoxId);
                     DbUtils.AddParameter(cmd, "@itemAreaId", item.ItemAreaId);
                     DbUtils.AddParameter(cmd, "@isLoaded", item.IsLoaded);
                     DbUtils.AddParameter(cmd, "@userId", item.UserId);
                     DbUtils.AddParameter(cmd, "@moveId", item.MoveId);
                     DbUtils.AddParameter(cmd, "@priorityId", item.PriorityId);

               /*     Item newItem = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read()){
                        newItem = new Item()
                        {
                            ItemName = DbUtils.GetString(reader, "ItemName"),
                            BoxId = reader.IsDBNull(reader.GetOrdinal("BoxId"))
                            ? null
                            : reader.GetInt32(reader.GetOrdinal("BoxId")),
                            ItemAreaId = DbUtils.GetInt(reader, "ItemAreaId"),
                            IsLoaded = DbUtils.GetBoolean(reader, "IsLoaded"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            MoveId = DbUtils.GetInt(reader, "MoveId"),
                            PriorityId = DbUtils.GetInt(reader, "PriorityId")

                        }; */


                    

                    item.Id = (int)cmd.ExecuteScalar();
                    
                    


                }
            }
        }

        public void Update(Item item)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        UPDATE Items
                                            SET ItemName = @itemName
                                            SET BoxId = @boxId
                                            SET ItemAreaId = @itemAreaId
                                            SET IsLoaded = @idLoaded
                                            SET priorityId = @priorityId
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@itemName", item.ItemName);
                    DbUtils.AddParameter(cmd, "@boxId", item.BoxId);
                    DbUtils.AddParameter(cmd, "@itemAreaId", item.ItemAreaId);
                    DbUtils.AddParameter(cmd, "@isLoaded", item.IsLoaded);
                    DbUtils.AddParameter(cmd, "@priorityId", item.PriorityId);
                    DbUtils.AddParameter(cmd, "@id", item.Id);

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
                                        DELETE FROM Items
                                            WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
