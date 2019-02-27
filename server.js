const express = require('express'),
    bodyParser = require('body-parser');

const users = require('./routes/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', users);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`I'm running on ${PORT}`);
});