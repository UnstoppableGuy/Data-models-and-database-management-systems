USE StoreDb

GO
CREATE PROCEDURE GetAccount
	@Email NVARCHAR(50),
	@PasswordHash NVARCHAR(50)
AS
BEGIN
	
	SELECT Account.Id, Role.Name AS RoleName, FirstName, LastName, Email, PasswordHash FROM Account
		JOIN Role ON Account.RoleId = Role.Id
		WHERE Email = @Email AND PasswordHash = @PasswordHash 
END