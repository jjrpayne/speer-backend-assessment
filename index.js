const env = require('./environmentVariables');
const PORT = env.PORT || 5001;
const app = require('./app');

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
})