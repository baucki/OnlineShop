const express = require('express');
const {sequelize} = require("./models");
const middleware = require('./middlewares/auth-mw');
const {router} = require('./routes/app/admin');
const path = require('path');
const history = require('connect-history-api-fallback');

require('dotenv').config();

const app = express();

app.get('/login', (req, res) => {

    res.send('Login form');

});

app.use('/admin', router);

const staticDir = express.static(path.join(__dirname, 'dist'));

app.use(staticDir);
app.use(history({index: '/index.html'}));
app.use(staticDir);

app.listen(process.env.PORT || 8000);