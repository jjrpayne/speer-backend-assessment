const env = require('./environmentVariables');
const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit')
const app = express();
const PORT = env.PORT || 5001;
const RATE_LIMIT_WINDOW = env.RATE_LIMIT_WINDOW || 15;
const RATE_LIMIT_MAX = env.RATE_LIMIT_MAX || 50;

// Allow Acces Control Allow Origin headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE"
    );
    next();
});

router = express.Router();
app.use(router);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const rateLimiter = rateLimit({
    windowMs: RATE_LIMIT_WINDOW * 60 * 1000,
    max: RATE_LIMIT_MAX
});
app.use(rateLimiter);

app.use("/", require("./routes/auth"));
app.use("/", require("./routes/notes"));

app.get('/', function (req, res) {
    return res.send('Hello World')
})

module.exports = app;