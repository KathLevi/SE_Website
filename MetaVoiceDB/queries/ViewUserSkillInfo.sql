SELECT * FROM Skills
LEFT OUTER JOIN Utterances ON Utterances.SkillId = Skills.SkillId
LEFT OUTER JOIN Responses ON Responses.SkillId = Skills.SkillId
WHERE Skills.UserId = 1