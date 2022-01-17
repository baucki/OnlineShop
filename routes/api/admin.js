const express = require('express');
const {User, Product, Comment, Cart} = require('../../models');
const bcrypt = require('bcrypt');
const {isAdmin} = require("../../middlewares/auth-mw");

const router = express.Router();

router.use(isAdmin);

// Users

router.post('/users', (req, res) => {
    let user = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        isAdmin:  req.body.isAdmin
    }
    User.create(user).then( createdUser => {
       res.json(user);
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.get('/users', (req, res) => {
    User.findAll().then(users => {
        res.json(users);
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.put('/users', (req, res) => {
    User.findOne({where: {id: req.body.id}}).then( user => {
        user.username = req.body.username;
        user.password = bcrypt.hashSync(req.body.password, 10);
        user.isAdmin  = req.body.isAdmin;
        user.save().then( user => {
            res.json(user);
        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.delete('/users', (req, res) => {
    User.destroy({where: {id: req.body.id}}).then( result => {
        res.json({deletedUser: result});
    }).catch(err => {
        res.status(500).send(err);
    });
})

router.get('/users/:id', (req, res) => {
    User.findOne({where: {id: req.params.id}}).then( user => {
        res.json(user);
    }).catch(err => {
        res.status(500).send(err);
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Products

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/products', (req, res) => {
    let product = {
        name: req.body.name,
        price: req.body.price,
        quantity:  req.body.quantity
    }
    Product.create(product).then( createdProduct => {
        res.json(createdProduct);
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.get('/products', (req, res) => {
    Product.findAll().then(products => {
        res.json(products);
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.put('/products', (req, res) => {
    Product.findOne({where: {id: req.body.id}}).then( product => {
        product.name = req.body.name;
        product.price = req.body.price;
        product.quantity  = req.body.quantity;
        product.save().then( product => {
            res.json(product);
        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.delete('/products', (req, res) => {
    Product.destroy({where: {id: req.body.id}}).then( result => {
        res.json({deletedProduct: result});
    }).catch(err => {
        res.status(500).send(err);
    });
})

router.get('/products/:id', (req, res) => {
    Product.findOne({where: {id: req.params.id}}).then( product => {
        res.json(product);
    }).catch(err => {
        res.status(500).send(err);
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Comments

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/comments', (req, res) => {
    let comment = {
        userID: req.body.userID,
        productID: req.body.productID,
        content:  req.body.content
    }
    Comment.create(comment).then( createdComment => {
        res.json(createdComment);
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.get('/comments', (req, res) => {
    Comment.findAll({include: ['user', 'product']}).then(comments => {
        res.json(comments);
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.put('/comments', (req, res) => {
    Comment.findOne({where: {id: req.body.id}}).then( comment => {
        comment.content = req.body.content;
        comment.userID = req.body.userID;
        comment.productID  = req.body.productID;
        comment.save().then( comment => {
            res.json(comment);
        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.delete('/comments', (req, res) => {
    Comment.destroy({where: {id: req.body.id}}).then( result => {
        res.json({deletedComment: result});
    }).catch(err => {
        res.status(500).send(err);
    });
})

router.get('/comments/:id', (req, res) => {
    Comment.findOne({where: {id: req.params.id}, include: ['user', 'product']}).then( comment => {
        res.json(comment);
    }).catch(err => {
        res.status(500).send(err);
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Cart

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/carts', (req, res) => {
    let cart = {
        userID: req.body.userID,
        productID: req.body.productID,
        quantity:  req.body.quantity
    }
    Cart.create(cart).then( createdCart => {
        res.json(createdCart);
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.get('/carts', (req, res) => {
    Cart.findAll({include: ['user', 'product']}).then(carts => {
        res.json(carts);
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.put('/carts', (req, res) => {
    Cart.findOne({where: {id: req.body.id}}).then( cart => {
        cart.quantity = req.body.quantity;
        cart.userID = req.body.userID;
        cart.productID  = req.body.productID;
        cart.save().then( cart => {
            res.json(cart);
        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.delete('/carts', (req, res) => {
    Cart.destroy({where: {id: req.body.id}}).then( cart => {
        res.json({deletedComment: cart});
    }).catch(err => {
        res.status(500).send(err);
    });
})

router.get('/carts/:id', (req, res) => {
    Cart.findOne({where: {id: req.params.id}, include: ['user', 'product']}).then( cart => {
        res.json(cart);
    }).catch(err => {
        res.status(500).send(err);
    });
});

module.exports = {router};
