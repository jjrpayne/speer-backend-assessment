const Pool = require('pg').Pool

// const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT} = process.env;

const env = require('../environmentVariables');

const pool = new Pool({
    user: env.DB_USER || "postgres",
    host: env.DB_HOST || "localhost",
    password: env.DB_PASSWORD || "postgres",
    port: env.DB_PORT || 5000,
    database: env.DB_NAME || "speerdb",
});

module.exports = {
    query: (text, values) => pool.query(text, values)
}