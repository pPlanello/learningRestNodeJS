const bcrypt = require('bcryptjs/dist/bcrypt');
const { request, response } = require('express');
const User = require('../models/user');

const getUsers = (req = request, res = response) => {

    const {name} = req.query.params;

    res.json({
        msg: 'GET',
        name
    });
}

const updateUser = async (req = request, res = response) => {

    const id = req.params.id;
    const {_id, password, google, ...userBody} = req.body;

    if (password) {
        // Encrypt password
        const salt = bcrypt.genSaltSync();
        userBody.password = bcrypt.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, userBody);
    const userUpdated = await User.findById(id);

    res.json({
        msg: 'PUT',
        userUpdated
    });
}

const createUser = async (req = request, res = response) => {

    const {username, email, password, role} = req.body;
    const user = new User({username, email, password, role});

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Save
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