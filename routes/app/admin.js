const express = require('express');
const {isAdmin} = require("../../middlewares/auth-mw");

const router = express.Router();

router.use(isAdmin);

router.get('/', (req, res) => {
   res.sendFile('/html/admin.html', {root: 'static'})
});


// Users

router.get('/users', (req, res) => {

   res.sendFile('/html/users.html', {root: 'static'});

});

router.get('/user', (req, res) => {

   res.sendFile('/html/user.html', {root: 'static'});

});

router.get('/user/:id', (req, res) => {

   res.sendFile('/html/user.html', {root: 'static'});

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Products

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/products', (req, res) => {

   res.sendFile('/html/products.html', {root: 'static'});

});

router.get('/product', (req, res) => {

   res.sendFile('/html/product.html', {root: 'static'});

});

router.get('/product/:id', (req, res) => {

   res.sendFile('/html/product.html', {root: 'static'});

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Comments

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/comments', (req, res) => {

   res.sendFile('/html/comments.html', {root: 'static'});

});

router.get('/comment', (req, res) => {

   res.sendFile('/html/comment.html', {root: 'static'});

});

router.get('/comment/:id', (req, res) => {

   res.sendFile('/html/comment.html', {root: 'static'});

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Cart

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/carts', (req, res) => {

   res.sendFile('/html/carts.html', {root: 'static'});

});

router.get('/cart', (req, res) => {

   res.sendFile('/html/cart.html', {root: 'static'});

});

router.get('/cart/:id', (req, res) => {

   res.sendFile('/html/cart.html', {root: 'static'});

});

module.exports = {router};
