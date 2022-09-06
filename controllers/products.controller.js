const { request, response } = require('express');
const Product = require('../models/product');


const getProducts = async (req = request, res = response) => {
    const {limit=5, from=0} = req.query;
    const query = {state: true};

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('user')
            .populate('category')
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        products
    });
}

const getProductById = async (req = request, res = response) => {
    const { id } = req.params;
    
    const product = await Product.findById(id)
                            .populate('user')
                            .populate('category');

    res.json({product})
}

const createProduct = async (req = request, res = response) => {
    const {user, state, ...body} = req.body;
    const name = body.name.toUpperCase();

    const productDb = await Product.findOne({name});

    if (productDb) {
        return res.status(400).json({
            msg: `The product ${name} already exist.`
        });
    }

    body.name = name;
    body.user = req.user._id;

    const product = new Product(body);

    // Save Product
    try {
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.json({
            msg: error
        });
    }
}

const updateProduct = async (req = request, res = response) => {
    const {id} = req.params;
    const {state, user, ...data} = req.body;
    // Create Category
    data.name = data.name.toUpperCase();
    data.user = req.user._id;
    data.state = true;
    const product = new Product(data);

    // Update product
    try {
        await Product.findByIdAndUpdate(id, data);
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.json({
            msg: error
        });
    }
}

const deleteProduct = async (req = request, res = response) => {
    const {id} = req.params;
    const productDb = await Product.findById(id);

    // Create Product
    productDb.name = productDb.name.toUpperCase();
    productDb.username = req.user._id;
    productDb.state = false;

    // Delete product
    try {
        await Product.findByIdAndUpdate(id, productDb);
        res.status(200).json(productDb);
    } catch (error) {
        console.error(error);
        res.json({
            msg: error
        });
    }
}


module.exports = {
    getProducts,
    getProductById,
    updateProduct,
    createProduct,
    deleteProduct
}