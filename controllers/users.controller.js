const { request, response } = require('express');

const getUsers = (req = request, res = response) => {
    res.json({
        msg: 'GET'
    })
}

const updateUser = (req = request, res = response) => {
    res.json({
        msg: 'PUT'
    })
}

const createUser = (req = request, res = response) => {
    res.json({
        msg: 'POST'
    })
}

const deleteUser = (req = request, res = response) => {
    res.json({
        msg: 'POST'
    })
}


module.exports = {
    getUsers,
    updateUser,
    createUser,
    deleteUser
};