const { Router } = require('express');
const { uploadFiles, getUploadFile } = require('../controllers/uploads.controller');
const { validFields } = require('../middlewares/valid-fields');
const { validFileField } = require('../middlewares/valid-file');
const validJwt = require('../middlewares/valid-jwt');

const router = Router();

router.post('/', [
        validJwt,
        validFileField,
        validFields
    ],
    uploadFiles);

router.get('/:name', [
    validJwt,
    validFields
    ],
    getUploadFile)
module.exports = router;