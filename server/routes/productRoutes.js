const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');

// Simple Admin Middleware (Placeholder for RBAC)
const admin = (req, res, next) => {
    // Check for a specific header or just allow for now if not strictly required
    // For this mini-project, we'll assume the frontend sends a secret header or similar
    // Or we can just allow it for now and focus on functionality as requested
    // "Role-based access control (admin vs user)"
    // Let's check for a header 'x-role' === 'admin'
    if (req.headers['x-role'] === 'admin') {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

router.route('/').get(getProducts).post(admin, createProduct);
router
    .route('/:id')
    .get(getProductById)
    .put(admin, updateProduct)
    .delete(admin, deleteProduct);

module.exports = router;
