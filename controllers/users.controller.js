const { response } = require('express');

const getUsers = (req, res = response) => {
    res.json({
        msg: 'GET'
    })
}

const updateUser = (req, res = response) => {
    res.json({
        msg: 'PUT'
    })
}

const createUser = (req, res = response) => {
    res.json({
        msg: 'POST'
    })
}

const deleteUser = (req, res = response) => {
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