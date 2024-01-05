const pool = require('../db/dbConfig');
const qStrings = require('../db/sqlStrings');
const env = require('../environmentVariables');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const JWT_SECRET = env.JWT_SECRET;

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
        const text = qStrings.insertNewUser;
        var values = [b.username.toLowerCase(), b.password];

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
        const text = qStrings.findUser;
        var values = [b.username];
        
        try {
            const result = await pool.query(text, values);
            const user = result.rows[0];
            if (user && await bcrypt.compare(b.password, user.password_hash)) {
                const token = jwt.sign({id:user.id, username:user.username}, JWT_SECRET, {
                    expiresIn: '1h'
                });
                return res.status(200).json({token});
            } else {
                return res.status(401).send({ message: "Invalid username or password."})
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    verifyToken : async(req, res, next) => {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).send({message: "Access denied"});
        } else if (authHeader.split(" ")[0] !== "Bearer") {
            return res.status(401).send({message: "Invalid token"});
        } else {
            const token = authHeader.split(" ")[1];
            try {
                const decoded = jwt.verify(token, JWT_SECRET)
                req.user_id = decoded.id
                next()
            } catch (err) {
                return res.status(401).send({message: "Invalid token"});
            }
        }   
    }
}