const express = require('express');
const {Product, Comment, Cart} = require('../../models');
const {authentication} = require("../../middlewares/auth-mw");

const router = express.Router();

router.get('/products', (req, res) => {
    Product.findAll({include: {model: Comment, as: 'comments', include: ['user']}}).then(products => {
        res.json(products);
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.use(authentication);

router.post('/carts', (req, res) => {
    let cart = {
        userID: req.body.userID,
        productID: req.body.productID,
        quantity:  req.body.quantity
    }
    Cart.create(cart).then( createdCart => {
        Cart.findOne({where: {id: createdCart.id}, include: ['product']}).then(result => {
            res.json(result);
        })
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.get('/carts/:id', (req, res) => {
    Cart.findAll({where:{userID: req.params.id}, include: ['product']}).then(carts => {
        res.json(carts);
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.delete('/carts', (req, res) => {
    Cart.destroy({where: {productID: req.body.productID}}).then( cart => {
        res.json(cart);
    }).catch(err => {
        res.status(500).send(err);
    });
});
router.delete('/carts/all', (req, res) => {
    Cart.destroy({where: {userID: req.body.userID}}).then( cart => {
        res.json( cart);
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

module.exports = {router};
