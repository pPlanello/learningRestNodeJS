const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users.controller');
const { validFields } = require('../middlewares/valid-fields');
const validJWT = require('../middlewares/valid-jwt');
const { isAdminRole, hasRole } = require('../middlewares/valid-roles');
const { roleValidation, existEmailValidation, existUserId } = require('../utils/database-validations');

const router = Router();

router.get('/', [
        validJWT,
        hasRole('USER_ROLE'),
        validFields
    ],
    getUsers);

router.put('/:id', [
        validJWT,
        hasRole('USER_ROLE'),
        check('id', 'The Id is invalid').isMongoId(),
        check('id').custom(existUserId),
        check('email', 'The email is invalid').isEmail(),
        check('username', 'The username is mandatory').not().isEmpty(),
        check('password', 'The password must be more than 6 letters.').isLength({min: 6}),
        check('role').custom( roleValidation ),
        validFields
    ],
    updateUser);

router.post('/', [
        validJWT,
        hasRole('USER_ROLE'),
        check('email', 'The email is invalid').isEmail(),
        check('username', 'The username is mandatory').not().isEmpty(),
        check('password', 'The password must be more than 6 letters.').isLength({min: 6}),
        check('role').custom( roleValidation ),
        check('email').custom( existEmailValidation ),
        validFields
    ],
    createUser);

router.delete('/:id', [
        validJWT,
        isAdminRole,
        check('id', 'The Id is invalid').isMongoId(),
        check('id').custom(existUserId),
        validFields
    ],
    deleteUser);

module.exports = router;