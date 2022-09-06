const { Router } = require('express');
const { check } = require('express-validator');
const { getCategories, getCategoryBy, updateCategory, createCategory, deleteCategory } = require('../controllers/categories.controller');
const { validFields } = require('../middlewares/valid-fields');
const validJWT = require('../middlewares/valid-jwt');
const { hasRole } = require('../middlewares/valid-roles');
const { existCategoryId } = require('../utils/database-validations');

const router = Router();

/**
 * Obtain all categories - public
 */
router.get('/', getCategories);


/**
 * Obtain category by id - public
 */
router.get('/:id', [
        check('id', 'The field id is not valid').isMongoId(),
        check('id').custom(existCategoryId),
        validFields
    ],
    getCategoryBy);


/**
 * Create category - any valid token
 */
router.post('/', [
        validJWT,
        check('name', 'The field name is mandatory').not().isEmpty(),
        validFields
    ],
    createCategory);


/**
 * Create category - any valid token
 */
 router.put('/:id', [
        validJWT,
        check('id', 'The field id is not valid').isMongoId(),
        check('id').custom(existCategoryId),
        validFields
    ],
    updateCategory);


/**
 * Delete category - only admin role
 */
 router.delete('/:id', [
        validJWT,
        hasRole('ADMIN_ROLE'),
        check('id', 'The field id is not valid').isMongoId(),
        check('id').custom(existCategoryId),
        validFields
    ],
    deleteCategory);


module.exports = router;