const { request, response } = require('express');
const Category = require('../models/category');


const getCategories = async (req = request, res = response) => {
    const {limit=5, from=0} = req.query;
    const query = {state: true};

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate('user')
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        categories
    });
}

const getCategoryBy = async (req = request, res = response) => {
    const { id } = req.params;
    
    const category = await Category.findById(id)
                                .populate('user');

    res.json({category})
}

const createCategory = async (req = request, res = response) => {
    const {name} = req.body;

    const categoryDb = await Category.findOne({name: name.toUpperCase()});

    if (categoryDb) {
        return res.status(400).json({
            msg: `The category ${name.toUpperCase()} already exist.`
        });
    }

    const category = new Category({name: name.toUpperCase(), user: req.user._id});

    // Save category
    try {
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        console.error(error);
        res.json({
            msg: error
        });
    }
}

const updateCategory = async (req = request, res = response) => {
    const {id} = req.params;
    const {state, user, ...data} = req.body;
    // Create Category
    data.name = data.name.toUpperCase();
    data.user = req.user._id;
    data.state = true;
    const category = new Category(data);

    // Update category
    try {
        await Category.findByIdAndUpdate(id, data);
        res.status(201).json(category);
    } catch (error) {
        console.error(error);
        res.json({
            msg: error
        });
    }
}

const deleteCategory = async (req = request, res = response) => {
    const {id} = req.params;
    const categoryDb = await Category.findById(id);

    // Create Category
    categoryDb.name = categoryDb.name.toUpperCase();
    categoryDb.username = req.user._id;
    categoryDb.state = false;

    // Delete category
    try {
        await Category.findByIdAndUpdate(id, categoryDb);
        res.status(200).json(categoryDb);
    } catch (error) {
        console.error(error);
        res.json({
            msg: error
        });
    }
}


module.exports = {
    getCategories,
    getCategoryBy,
    updateCategory,
    createCategory,
    deleteCategory
}