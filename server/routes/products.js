const express = require('express');
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post(
    '/',
    protect,
    authorize('employee', 'management'),
    createProduct
);
router.put(
    '/:id',
    protect,
    authorize('employee', 'management'),
    updateProduct
);
router.delete('/:id', protect, authorize('management'), deleteProduct);

module.exports = router;
