const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users.controller');
const { validFields } = require('../middlewares/valid-fields');
const { roleValidation } = require('../utils/database-validations');

const router = Router();

router.get('/', getUsers);

router.put('/:id', updateUser);

router.post('/', [ 
        check('email', 'The email is invalid').isEmail(),
        check('username', 'The username is mandatory').not().isEmpty(),
        check('password', 'The password must be more than 6 letters.').isLength({min: 6}),
        // check('role', 'The role value is not valid').isIn(['ADMIN_ROL', 'USER_ROL']),
        check('role').custom( roleValidation ),
        validFields
    ],
    createUser);

router.delete('/:id', deleteUser);

module.exports = router;