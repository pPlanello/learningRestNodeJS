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

    const {username, email, password, rol} = req.body;
    const user = new User({username, email, password, rol});

    // Verify email
    const existEmail = await User.findOne({email});
    if (existEmail) {
        return res.status(404).json({msg: `The email '${email}' already exist`});
    }

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