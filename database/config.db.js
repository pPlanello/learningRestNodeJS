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
    var admin_role = new Role({ role: 'ADMIN_ROLE'});
    var user_role = new Role({ role: 'USER_ROLE'});
    var sales_role = new Role({ role: 'SALES_ROLE'});
    // save
    await admin_role.save();
    await user_role.save();
    await sales_role.save();
    console.log('Roles default added');
}

module.exports = {
    dbConnection
}