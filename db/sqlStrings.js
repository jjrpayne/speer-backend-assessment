e = module.exports;

e.insertNewUser = `INSERT INTO users 
(username, password_hash)
VALUES ($1, $2) RETURNING *`;

e.findUser = `SELECT * FROM users
WHERE username = $1 LIMIT 1`;

e.getAllNotesForUser = `SELECT * FROM notes
WHERE user_id = $1`;

e.getNoteById = `SELECT * FROM notes
WHERE id = $1 LIMIT 1`;

e.addNewNote = `INSERT INTO notes
(user_id, note)
VALUES ($1, $2) RETURNING *`;

e.editNote = `UPDATE notes
SET note = $1
WHERE id = $2 RETURNING *`;