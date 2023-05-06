BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[TimeEntry] ADD [projectId] VARCHAR(36),
[taskId] VARCHAR(36);

-- CreateTable
CREATE TABLE [dbo].[Project] (
    [id] VARCHAR(36) NOT NULL,
    [name] VARCHAR(255) NOT NULL,
    [createdAt] DATETIMEOFFSET NOT NULL CONSTRAINT [Project_createdAt_df] DEFAULT SYSDATETIMEOFFSET(),
    [updatedAt] DATETIMEOFFSET NOT NULL,
    CONSTRAINT [Project_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Task] (
    [id] VARCHAR(36) NOT NULL,
    [name] VARCHAR(255) NOT NULL,
    [createdAt] DATETIMEOFFSET NOT NULL CONSTRAINT [Task_createdAt_df] DEFAULT SYSDATETIMEOFFSET(),
    [updatedAt] DATETIMEOFFSET NOT NULL,
    CONSTRAINT [Task_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[TimeEntry] ADD CONSTRAINT [TimeEntry_projectId_fkey] FOREIGN KEY ([projectId]) REFERENCES [dbo].[Project]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TimeEntry] ADD CONSTRAINT [TimeEntry_taskId_fkey] FOREIGN KEY ([taskId]) REFERENCES [dbo].[Task]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
