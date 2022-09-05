const { Router } = require('express');
const { check } = require('express-validator');
const { getCategories, getCategoryBy, updateCategory, createCategory, deleteCategory } = require('../controllers/categories.controller');
const { validFields } = require('../middlewares/valid-fields');
const validJWT = require('../middlewares/valid-jwt');
const { isAdminRole, hasRole } = require('../middlewares/valid-roles');
const { existCategoryId } = require('../utils/database-validations');

const router = Router();

/**
 * Obtain all categories - public
 */
router.get('/', getCategories);


/**
 * Obtain categorie by id - public
 */
router.get('/:id', [
        check('id', 'The field id is not valid').isMongoId(),
        check('id').custom(existCategoryId),
        validFields
    ],
    getCategoryBy);


/**
 * Create categorie - any valid token
 */
router.post('/', [
        validJWT,
        check('name', 'The field name is mandatory').not().isEmpty(),
        validFields
    ],
    createCategory);


/**
 * Create categorie - any valid token
 */
 router.put('/:id', updateCategory);


/**
 * Delete categorie - only admin role
 */
 router.delete('/:id', deleteCategory);


module.exports = router;