const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}?authMechanism=DEFAULT`);
        console.log('Connect to database');
    } catch (error) {
        console.error(error);
        throw new Error ('Error to connect to MongoDB');
    }
}

module.exports = {
    dbConnection
}