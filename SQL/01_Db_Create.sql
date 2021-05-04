USE [master]
GO

IF db_id('MoveIt') IS NULL
	CREATE DATABASE MoveIt
	GO

	USE [MoveIt]
	GO

	DROP TABLE IF EXISTS [UserProfile];
	DROP TABLE IF EXISTS [Items];
	DROP TABLE IF EXISTS [Box];
	DROP TABLE IF EXISTS [Area];
	DROP TABLE IF EXISTS [Location];
	DROP TABLE IF EXISTS [Move];
	DROP TABLE IF EXISTS [Priority];
	GO



CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY IDENTITY,
  [FirebaseUserId] NVARCHAR(28) NOT NULL,
  [DisplayName] nvarchar(50) NOT NULL,
  [FirstName] nvarchar(50) NOT NULL,
  [LastName] nvarchar(50) NOT NULL,
  [Email] nvarchar(555) NOT NULL,
  [CreateDateTime] datetime NOT NULL
  )
  Go

CREATE TABLE [Items] (
  [id] int IDENTITY PRIMARY KEY NOT NULL,
  [itemName] nvarchar(255) NOT NULL,
  [boxId] int NULL,
  [itemLocationId] int NOT NULL,
  [itemAreaId] int NOT NULL,
  [itemImage] nvarchar(255) NULL,
  [isLoaded] BIT DEFAULT 0 NOT NULL,
  [userId] int NOT NULL,
  [moveId] int NOT NULL,
  [priorityId] int NOT NULL
)
GO

CREATE TABLE [Box] (
  [id] int IDENTITY PRIMARY KEY NOT NULL,
  [boxName] nvarchar(255) NOT NULL,
  [moveId] int NOT NULL
)
GO

CREATE TABLE [Area] (
  [id] int IDENTITY PRIMARY KEY NOT NULL,
  [areaName] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Location] (
  [id] int IDENTITY PRIMARY KEY NOT NULL,
  [locationName] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Move] (
  [id] int IDENTITY PRIMARY KEY NOT NULL,
  [name] nvarchar(255) NOT NULL,
  [userId] int NOT NULL
)
GO

CREATE TABLE [Priority] (
  [id] int IDENTITY PRIMARY KEY NOT NULL,
  [label] nvarchar(255) NOT NULL
)
GO

ALTER TABLE [Items] ADD FOREIGN KEY ([userId]) REFERENCES [UserProfile] ([id])
GO

ALTER TABLE [Items] ADD FOREIGN KEY ([itemLocationId]) REFERENCES [Location] ([id])
GO

ALTER TABLE [Items] ADD FOREIGN KEY ([itemAreaId]) REFERENCES [Area] ([id])
GO

ALTER TABLE [Items] ADD FOREIGN KEY ([boxId]) REFERENCES [Box] ([id])
GO

ALTER TABLE [Items] ADD FOREIGN KEY ([priorityId]) REFERENCES [Priority] ([id])
GO

ALTER TABLE [Items] ADD FOREIGN KEY ([moveId]) REFERENCES [Move] ([id])
GO
