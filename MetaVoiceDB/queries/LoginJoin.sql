SELECT * FROM Users
LEFT OUTER JOIN User_Profiles ON Users.Id = User_Profiles.UserId
WHERE Users.Username = 'Hello' AND Users.Password = 'World'
 