const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users.controller');
const { validFields } = require('../middlewares/valid-fields');

const router = Router();

router.get('/', getUsers);

router.put('/:id', updateUser);

router.post('/', [ 
        check('email', 'The email is invalid').isEmail(),
        check('username', 'The username is mandatory').not().isEmpty(),
        check('password', 'The password must be more than 6 letters.').isLength({min: 6}),
        check('rol', 'The rol value is not valid').isIn(['ADMIN_ROL', 'USER_ROL']),
        validFields
    ],
    createUser);

router.delete('/:id', deleteUser);

module.exports = router;