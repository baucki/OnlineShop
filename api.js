const express = require('express');
const cors = require('cors');
const {sequelize, User} = require("./models");
const {router} = require("./routes/api/admin");
const {authentication} = require("./middlewares/auth-mw");
require('dotenv').config();

const api = express();

const corsOptions = {
    origin: 'http://127.0.0.1:8000',
    optionsSuccessStatus: 200
}

api.use(cors(corsOptions));
api.use(express.json());
api.use(authentication);
api.use('/admin', router);


api.listen( {port: 8002}, async () => {
    await sequelize.authenticate();
});


