const { request, response } = require('express');
const User = require('../models/user');

const getUsers = (req = request, res = response) => {

    const {name} = req.query.params;

    res.json({
        msg: 'GET',
        name
    });
}

const updateUser = (req = request, res = response) => {

    const id = req.params.id;
    const {name, year} = req.body;

    res.json({
        msg: 'PUT',
        name,
        year
    });
}

const createUser = async (req = request, res = response) => {

    const body = req.body;
    console.log(body);
    const user = new User(body);
    await user.save();

    res.json({
        msg: 'POST',
        body: user
    });
}

const deleteUser = (req = request, res = response) => {
    res.json({
        msg: 'POST'
    });
}


module.exports = {
    getUsers,
    updateUser,
    createUser,
    deleteUser
};