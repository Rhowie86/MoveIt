USE [MoveIt];
GO
set identity_insert [Items] off

set identity_insert [UserProfile] on
insert into UserProfile ([Id], [FirebaseUserId], [DisplayName], [FirstName], [LastName],  [Email], [CreateDateTime] ) VALUES (1, 'AMOecdUEkMTtQxZwO8wGcAsB9TC3', 'rHowie', 'Ron', 'Howie','ron@ron.comx', '2020-04-23');
insert into UserProfile ([Id], [FirebaseUserId], [DisplayName], [FirstName], [LastName],  [Email], [CreateDateTime] ) VALUES (2, 'bUuc68YDpDeDv4MIpDeTCk8zCcP2', 'bobert', 'Bob', 'Boberson', 'bob@bob.comx', '2021-05-01');

set identity_insert [UserProfile] off

set identity_insert [Move] on
insert into [Move] ([Id], [Name], [UserId]) VALUES (1, 'New Apartment', 1);
insert into [Move] ([Id], [Name], [UserId]) VALUES (2, 'Atlanta From Nashville', 2);

set identity_insert [Move] off

set identity_insert [Box] on 
insert into [Box] ([Id], [BoxName], [MoveId]) VALUES (1, 'bedroom', 1);
insert into [Box] ([Id], [BoxName], [MoveId]) VALUES (2, 'kitchen', 2);

set identity_insert [Box] off

set identity_insert [Location] on
insert into [Location] ([Id], [LocationName]) VALUES (1, 'Home');
insert into [Location] ([Id], [LocationName]) VALUES (2, 'Apartment');
insert into [Location] ([Id], [LocationName]) VALUES (3, 'Atlanta');

set identity_insert [Location] off

set identity_insert [Area] on
insert into [Area] ([Id], [AreaName]) VALUES (1, 'Kitchen');
insert into [Area] ([Id], [AreaName]) VALUES (2, 'Bedroom');

set identity_insert [Area] off

set identity_insert [Priority] on
insert into [Priority] ([Id], [Label]) VALUES (1, 'High');
insert into [Priority] ([Id], [Label]) VALUES (2, 'Medium');
insert into [Priority] ([Id], [Label]) VALUES (3, 'Low');

set identity_insert [Priority] off

set identity_insert [Items] on
insert into Items ([Id], [ItemName], [BoxId], [ItemLocationId], [ItemAreaId], [ItemImage], [IsLoaded], [UserId], [MoveId], [PriorityId]) VALUES (1, 'Chair', NULL, 1, 1, 'https://www.antiquepurveyor.com/productimages/wheatsheaf-carved-shield-back-arm-chair-8195.jpg' , 0, 1, 1, 1);  
insert into Items ([Id], [ItemName], [BoxId], [ItemLocationId], [ItemAreaId], [ItemImage], [IsLoaded], [UserId], [MoveId], [PriorityId]) VALUES (2, 'Bed', NULL, 1, 2, 'NULL' , 0, 1, 1, 1);  
insert into Items ([Id], [ItemName], [BoxId], [ItemLocationId], [ItemAreaId], [ItemImage], [IsLoaded], [UserId], [MoveId], [PriorityId]) VALUES (3, 'Plates', 2, 1, 1, 'NULL' , 0, 2, 2, 1); 

set identity_insert [Items] off








