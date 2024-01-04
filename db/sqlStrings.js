e = module.exports;

e.insertNewUser = `INSERT INTO users 
(username, password_hash)
VALUES ($1, $2) RETURNING *`;

e.findUser = `SELECT * FROM users
WHERE username = $1 LIMIT 1`;