// DEPENDENCIDES
const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const Product = require('../models/product.js');

// SEED ROUTE
const productSeed = require('../models/productSeed.js');

router.get('/seed', (req, res) => {
    Product.deleteMany({}, (error, allProducts) => {});
    Product.create(productSeed, (error, data) => {
        res.redirect('/products');
    });
});

// INDEX
router.get('/', (req, res) => {
    Product.find({}, (err, foundProducts) => {
        res.render('products/index.ejs', {
            products: foundProducts
        });
    });   
});

// NEW
router.get('/new', (req, res) => {
    res.render('products/new.ejs');
});

// DELETE
router.delete('/:id', (req,res) => {
    Product.findByIdAndRemove(req.params.id, () => {
        res.redirect('/products');
    });
});

// UPDATE
router.put('/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, () => {
        res.redirect('/products');
    });
});

// CREATE
router.post('/', (req, res) => {
    Product.create(req.body, (err, createdProduct) => {
        res.redirect('/products');
    });
});

// EDIT
router.get('/:id/edit', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('products/edit.ejs', {
            product: foundProduct
        });
    });
});

// SHOW
router.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('products/show.ejs', {
            product: foundProduct
        });
    });
});

module.exports = router;