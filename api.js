const express = require('express');
const cors = require('cors');
const {sequelize, User, Comment} = require("./models");
const adminRouter = require("./routes/api/admin");
const adminUser = require("./routes/api/user");
const {authentication, socketAuthentication} = require("./middlewares/auth-mw");
const http = require('http');
const {Server} = require('socket.io')

require('dotenv').config();

const api = express();

const server = http.createServer(api);
const io = new Server(server, {
    cors: {
        origin: 'https://sj-projekat-2021.herokuapp.com',
        methods: ['GET', 'POST'],
        credentials: true
    },
    allowEIO3: true
})

io.on('connection', socket => {
    socket.use(socketAuthentication);
    socket.on('add', msg => {
        let comment = {
            userID: msg.userID,
            productID: msg.productID,
            content:  msg.text
        }
        Comment.create(comment).then( createdComment => {
            Comment.findOne({where: {id: createdComment.id}, include: ['user']}).then(newComment => {
                io.emit('add', JSON.stringify(newComment));
            });
        }).catch(err => {
            io.emit('error', err);
        });
    });
    socket.on('remove', msg => {
        Comment.destroy({where: {id: msg.comment.id}}).then( result => {
            io.emit('remove', JSON.stringify(msg.comment));
        }).catch(err => {
            io.emit('error', err);
        });
    });
    socket.on('error', err => {
        io.emit('error', err.message);
    });


})

const corsOptions = {
    origin: 'https://sj-projekat-2021.herokuapp.com',
    optionsSuccessStatus: 200
}

api.use(cors(corsOptions));
api.use(express.json());
api.get('/', (req, res) => res.send('api server'));
api.use('/user', adminUser.router);
api.use(authentication);
api.use('/admin', adminRouter.router);



server.listen( {port: process.env.PORT || 8002}, async () => {
    await sequelize.authenticate();
});


