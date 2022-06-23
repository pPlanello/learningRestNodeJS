const Role = require('../models/role');

const roleValidation = async(role = '') => {
    const existRole = await Role.findOne({ role });
    if (!existRole) {
        throw new Error(`The role ${role} is not registered in the DB`);
    }
}

module.exports = {
    roleValidation
}