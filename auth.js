const express = require('express');
const {sequelize, User} = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cors = require('cors')

require('dotenv').config();

const auth = express();

let corsOptions = {
   origin: 'https://sj-projekat-2021.herokuapp.com',
   optionsSuccessStatus: 200
}

auth.use(express.json());
auth.use(cors(corsOptions));

auth.post('/login', (req, res) => {
   User.findOne({where: {username: req.body.username}}).then(user => {
      if (!user) return res.send('You entered wrong username or password');

      if (bcrypt.compareSync(req.body.password, user.password)) {
         const payload = {
            username: user.username,
            isAdmin: user.isAdmin
         }

         const token = jwt.sign(payload, process.env.SECRET_KEY);
         res.json({user: user, token: token});

      } else {
         res.send('You entered wrong username or password');
      }

   });
});

auth.post('/register', (req, res) => {
   User.findOne({where: {username: req.body.username}}).then(user => {
      if (user) return res.send('That username is already in use!');
      const newUser = {
         username: req.body.username,
         password: bcrypt.hashSync(req.body.password, 10),
         isAdmin:  req.body.isAdmin
      };

      User.create(newUser).then(createdUser =>{
         const payload = {
            username: createdUser.username,
            isAdmin: createdUser.isAdmin
         }
         const token = jwt.sign(payload, process.env.SECRET_KEY);
         res.json({user: createdUser, token: token});
      }).catch(err => {
         res.status(500).send(err);
      });


   }).catch(err =>{
      res.status(500).send(err);
   });


});

auth.listen( {port: process.env.PORT || 8001}, async () => {
   await sequelize.authenticate();
});
