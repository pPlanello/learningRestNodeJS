const { request, response } = require('express');
const { model } = require('mongoose');
const Category = require('../models/category');


const getCategories = async (req = request, res = response) => {
    const {limit=5, from=0} = req.query;
    const query = {state: true};

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate('username')
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
    console.log(id);
    
    const category = await Category.findById(id);

    res.json({category})
}

const updateCategory = async (req = request, res = response) => {}

const createCategory = async (req = request, res = response) => {
    const {name} = req.body;

    const categoryDb = await Category.findOne({name: name.toUpperCase()});

    if (categoryDb) {
        return res.status(400).json({
            msg: `The category ${name.toUpperCase()} already exist.`
        });
    }

    const category = new Category({name: name.toUpperCase(), username: req.user._id});

    // Save category
    try {
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        log.error(error);
        res.json({
            msg: error
        });
    }
}

const deleteCategory = async (req = request, res = response) => {}


module.exports = {
    getCategories,
    getCategoryBy,
    updateCategory,
    createCategory,
    deleteCategory
}