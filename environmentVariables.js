require('dotenv').config();

e = module.exports;
e.PORT = process.env.PORT;
e.DB_HOST = process.env.DB_HOST;
e.DB_USER = process.env.DB_USER;
e.DB_PASSWORD = process.env.DB_PASSWORD;
e.DB_NAME = process.env.DB_NAME;
e.DB_PORT = process.env.DB_PORT;
e.JWT_SECRET = process.env.JWT_SECRET;
e.RATE_LIMIT_WINDOW = process.env.RATE_LIMIT_WINDOW;
e.RATE_LIMIT_MAX = process.env.RATE_LIMIT_MAX;