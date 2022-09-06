const mongoose = require('mongoose');
const Role = require('../models/role');


const dbConnection = async() => {
    try {
        await mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}?authMechanism=DEFAULT`);
        console.log('Connect to database');
        insertDefaultData();
    } catch (error) {
        console.error(error);
        throw new Error ('Error to connect to MongoDB');
    }
}

const insertDefaultData = async () => {
    // Role
    saveRoleIfExist('ADMIN_ROLE');
    saveRoleIfExist('USER_ROLE');
    saveRoleIfExist('SALES_ROLE');

    console.log('Roles default added');
}

const saveRoleIfExist = async (roleName = '') => {
    const roleDb = await Role.findOne({role: roleName});
    if (!roleDb) {
        const data = new Role({role: roleName});
        await data.save();
    }
}

module.exports = {
    dbConnection
}