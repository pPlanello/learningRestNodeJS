const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFiles } = require('../controllers/uploads.controller');
const { validFields } = require('../middlewares/valid-fields');
const validJwt = require('../middlewares/valid-jwt');

const router = Router();

router.post('/', [
        validJwt,
        validFields
    ],
    uploadFiles);

module.exports = router;