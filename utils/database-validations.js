const Category = require('../models/category');
const Product = require('../models/product');
const Role = require('../models/role');
const User = require('../models/user');

const roleValidation = async(role = '') => {
    const existRole = await Role.findOne({ role });
    if (!existRole) {
        throw new Error(`The role ${role} is not registered in the DB`);
    }
}

const existEmailValidation = async(email = '') => {
    const existEmail = await User.findOne({email});
    if (existEmail) {
        throw new Error(`The email ${email} already exist`);
    }
}

const existUserId = async(id = '') => {
    const existUser = await User.findById(id);
    if (!existUser) {
        throw new Error(`The user id "${id}" not exist`);
    }
}

const existCategoryId = async(id = '') => {
    const category = await Category.findById(id);
    if (!category) {
        throw new Error(`The category id "${id}" not exist`);
    }
}

const existProductId = async(id = '') => {
    const product = await Product.findById(id);
    if (!product) {
        throw new Error(`The product id "${id}" not exist`);
    }
}

module.exports = {
    roleValidation,
    existEmailValidation,
    existUserId,
    existCategoryId,
    existProductId
}