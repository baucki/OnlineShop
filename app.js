const express = require('express');
const {sequelize} = require("./models");
const middleware = require('./middlewares/auth-mw');
const {router} = require('./routes/app/admin');
const path = require('path');

require('dotenv').config();

const app = express();

app.get('/login', (req, res) => {

    res.send('Login form');

});

app.use(middleware.authentication);
app.use('/admin', router);

app.get('/', (req, res) => {
    res.send(`Welcome ${req.payload.username}!`);
});

app.use(express.static(path.join(__dirname, 'static')))

app.listen(8000);