const jwt = require('jsonwebtoken');

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Iml2YW5ubiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MTY2MjMyNn0.4jPVYoaodGn4ZigYhEEeMbzxrODC7xU3UmisN7BpXyQ'

function authentication(req, res, next) {

    if (token == null) return res.redirect('http://127.0.0.1:8000/login');

    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if (err) return res.redirect('http://127.0.0.1:8000/login');

        req.payload = payload;
        next();
    });

}

function isAdmin(req, res, next) {
    console.log(req.payload);
    if (req.payload.isAdmin === true) {
        next();
    }
    else {
        res.status(401).send("You don't have authority for that action!");
    }
}

function socketAuthentication(msg, next) {
    if (msg[1].token === '') {
        next(new Error('not authenticated'));
    } else {
        jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
            if (err) return next(new Error('not authenticated'));
            msg[1].payload = payload;
            next();
        });
    }
}

module.exports = {authentication, isAdmin, socketAuthentication};
