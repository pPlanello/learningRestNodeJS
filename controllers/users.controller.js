const { request, response } = require('express');

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

const createUser = (req = request, res = response) => {

    const {name, year} = req.body;

    res.json({
        msg: 'POST',
        name,
        year
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