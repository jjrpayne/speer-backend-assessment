const pool = require('../db/dbConfig');
const qStrings = require('../db/sqlStrings');
const bcrypt = require("bcryptjs");

module.exports = {

    generatePasswordHash: async (req, res, next) => {
        b = req.body;

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(b.password, salt, function(err, hash) {
                if (err){
                    next(err)
                }
                req.body.password = hash
                next()
            });
        });
    },

    signUp : async(req, res) => {
        const b = req.body;
        text = qStrings.insertNewUser;
        values = [b.username.toLowerCase(), b.password];

        // check if username exists
        try {
            const result = await pool.query(text, values);
            const newUsername = result.rows[0].username;
            return res.status(200).send({message: "Success! User " + newUsername + " created."});
        } catch(err) {
            console.log("constraints", err.constraint)
            if (err.constraint == 'unique_username') {
                return res.status(401).send({message : "Username taken"})
            }
            return res.status(500).send(err);
        }
    }
}