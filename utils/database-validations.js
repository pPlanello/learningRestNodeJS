const Role = require('../models/role');
const User = require('../models/user');

const roleValidation = async(role = '') => {
    const existRole = await Role.findOne({ role });
    if (!existRole) {
        throw new Error(`The role ${role} is not registered in the DB`);
    }
}

const existEmailValidation = async(email = '') => {
    // Verify email
    const existEmail = await User.findOne({email});
    if (existEmail) {
        throw new Error(`The email ${email} already exist`);
    }
}

module.exports = {
    roleValidation,
    existEmailValidation
}