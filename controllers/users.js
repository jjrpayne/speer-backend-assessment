const pool = require('../db/dbConfig');
const qStrings = require('../db/sqlStrings');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "28570EA12DD5DD5C85B9DC1F4E7D6A3E5D326B3977BA70C722E8869F0C19A1BD";

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
            return res.status(200).send({message: `Success! User ${newUsername} created.`});
        } catch(err) {
            console.log("constraints", err.constraint)
            if (err.constraint == 'unique_username') {
                return res.status(401).send({message : "Username taken"})
            }
            return res.status(500).send(err);
        }
    },

    logIn : async(req, res) => {
        const b = req.body;
        text = qStrings.findUser;
        values = [b.username];
        
        try {
            const result = await pool.query(text, values);
            const user = result.rows[0];
            if (user && await bcrypt.compare(b.password, user.password_hash)) {
                const token = jwt.sign({id:user.id, username:user.username}, JWT_SECRET);
                return res.status(200).json({token});
            } else {
                return res.status(401).send({ message: "Invalid username or password."})
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    }
}