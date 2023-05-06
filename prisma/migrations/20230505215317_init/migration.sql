BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] VARCHAR(36) NOT NULL,
    [email] VARCHAR(255) NOT NULL,
    [firstName] VARCHAR(255) NOT NULL,
    [lastName] VARCHAR(255) NOT NULL,
    [profile_picture] VARCHAR(255) NOT NULL,
    [createdAt] DATETIME NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME NOT NULL,
    [deletedAt] DATETIME,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[RefreshToken] (
    [token] VARCHAR(4000) NOT NULL,
    [userId] VARCHAR(36) NOT NULL,
    [createdAt] DATETIME NOT NULL CONSTRAINT [RefreshToken_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [deletedAt] DATETIME,
    CONSTRAINT [RefreshToken_pkey] PRIMARY KEY CLUSTERED ([token])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [RefreshToken_userId_idx] ON [dbo].[RefreshToken]([userId]);

-- AddForeignKey
ALTER TABLE [dbo].[RefreshToken] ADD CONSTRAINT [RefreshToken_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
