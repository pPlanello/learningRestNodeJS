const { Router } = require('express');
const { check } = require('express-validator');
const { getProducts, getProductById, updateProduct, createProduct, deleteProduct } = require('../controllers/products.controller');
const { validFields } = require('../middlewares/valid-fields');
const validJWT = require('../middlewares/valid-jwt');
const { hasRole } = require('../middlewares/valid-roles');
const { existProductId } = require('../utils/database-validations');

const router = Router();

/**
 * Obtain all products - public
 */
router.get('/', getProducts);


/**
 * Obtain product by id - public
 */
router.get('/:id', [
        check('id', 'The field id is not valid').isMongoId(),
        check('id').custom(existProductId),
        validFields
    ],
    getProductById);


/**
 * Create product - any valid token
 */
router.post('/', [
        validJWT,
        check('name', 'The field name is mandatory').not().isEmpty(),
        validFields
    ],
    createProduct);


/**
 * Create product - any valid token
 */
 router.put('/:id', [
        validJWT,
        check('id', 'The field id is not valid').isMongoId(),
        check('id').custom(existProductId),
        validFields
    ],
    updateProduct);


/**
 * Delete product - only admin role
 */
 router.delete('/:id', [
        validJWT,
        hasRole('ADMIN_ROLE'),
        check('id', 'The field id is not valid').isMongoId(),
        check('id').custom(existProductId),
        validFields
    ],
    deleteProduct);


module.exports = router;