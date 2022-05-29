const { Router } = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users.controller');

const router = Router();

router.get('/', getUsers);

router.put('/:id', updateUser);

router.post('/', createUser);

router.delete('/', deleteUser);

module.exports = router;