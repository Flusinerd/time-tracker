BEGIN TRY

BEGIN TRAN;

-- AlterTable
-- Drop RefreshToken_createdAt_df DEFAULT CONSTRAINT
ALTER TABLE [dbo].[RefreshToken] DROP CONSTRAINT [RefreshToken_createdAt_df];
ALTER TABLE [dbo].[RefreshToken] ALTER COLUMN [createdAt] DATETIMEOFFSET NOT NULL;
ALTER TABLE [dbo].[RefreshToken] ALTER COLUMN [deletedAt] DATETIMEOFFSET NULL;
-- Add RefreshToken_createdAt_df DEFAULT CONSTRAINT AS SYSTEMDATETIMEOFFSET
ALTER TABLE [dbo].[RefreshToken] ADD CONSTRAINT [RefreshToken_createdAt_df] DEFAULT (SYSDATETIMEOFFSET()) FOR [createdAt];

-- AlterTable
-- DROP TimeEntry_createdAt_df DEFAULT CONSTRAINT
ALTER TABLE [dbo].[TimeEntry] DROP CONSTRAINT [TimeEntry_createdAt_df];
-- DROP the computed duration column
ALTER TABLE [dbo].[TimeEntry] DROP COLUMN [duration];
ALTER TABLE [dbo].[TimeEntry] ALTER COLUMN [startTime] DATETIMEOFFSET NOT NULL;
ALTER TABLE [dbo].[TimeEntry] ALTER COLUMN [endTime] DATETIMEOFFSET NULL;
ALTER TABLE [dbo].[TimeEntry] ALTER COLUMN [createdAt] DATETIMEOFFSET NOT NULL;
ALTER TABLE [dbo].[TimeEntry] ALTER COLUMN [updatedAt] DATETIMEOFFSET NOT NULL;
-- Add TimeEntry_createdAt_df DEFAULT CONSTRAINT AS SYSTEMDATETIMEOFFSET
ALTER TABLE [dbo].[TimeEntry] ADD CONSTRAINT [TimeEntry_createdAt_df] DEFAULT (SYSDATETIMEOFFSET()) FOR [createdAt];
-- Add the computed duration column
ALTER TABLE [dbo].[TimeEntry] ADD [duration] AS ISNULL(DATEDIFF(SECOND, [startTime], [endTime]), 0);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
