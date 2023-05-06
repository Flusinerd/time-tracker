BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[TimeEntry] (
    [id] VARCHAR(36) NOT NULL,
    [userId] VARCHAR(36) NOT NULL,
    [startTime] DATETIME NOT NULL,
    [endTime] DATETIME,
    [duration] AS ISNULL(DATEDIFF(SECOND, [startTime], [endTime]), 0),
    [createdAt] DATETIME NOT NULL CONSTRAINT [TimeEntry_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME NOT NULL,
    CONSTRAINT [TimeEntry_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [TimeEntry_userId_idx] ON [dbo].[TimeEntry]([userId]);

-- AddForeignKey
ALTER TABLE [dbo].[TimeEntry] ADD CONSTRAINT [TimeEntry_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
