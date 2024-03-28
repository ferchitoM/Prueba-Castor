IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [Cargo] (
    [Id] int NOT NULL IDENTITY,
    [Nombre] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Cargo] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Empleados] (
    [Id] int NOT NULL IDENTITY,
    [Cedula] decimal(18,2) NOT NULL,
    [Nombre] nvarchar(max) NOT NULL,
    [Foto] nvarchar(max) NOT NULL,
    [FechaIngreso] int NOT NULL,
    [CargoId] int NOT NULL,
    CONSTRAINT [PK_Empleados] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Empleados_Cargo_CargoId] FOREIGN KEY ([CargoId]) REFERENCES [Cargo] ([Id]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_Empleados_CargoId] ON [Empleados] ([CargoId]);
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Nombre') AND [object_id] = OBJECT_ID(N'[Cargo]'))
    SET IDENTITY_INSERT [Cargo] ON;
INSERT INTO [Cargo] ([Nombre])
VALUES (N'Scrum Master'),
(N'Desarrollador'),
(N'QA'),
(N'PO');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Nombre') AND [object_id] = OBJECT_ID(N'[Cargo]'))
    SET IDENTITY_INSERT [Cargo] OFF;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20240321041658_initial', N'6.0.0');
GO

COMMIT;
GO

