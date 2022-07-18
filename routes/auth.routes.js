const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth.controller');
const { validFields } = require('../middlewares/valid-fields');

const router = Router();

router.post('/', [
        check('email', 'The email is mandatory').not().isEmpty(),
        check('email', 'The email is invalid').isEmail(),
        check('password', 'The password must be more than 6 letters.').isLength({min: 6}),
        validFields
    ],
    login);

router.post('/google', [
        check('id_token', 'The id_token is mandatory').not().isEmpty(),
        validFields
    ],
    googleSignIn);

module.exports = router;