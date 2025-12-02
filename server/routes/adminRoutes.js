const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getAllOrders,
    getUserById,
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

// All routes require admin authentication
router.get('/users', protect, admin, getAllUsers);
router.get('/users/:id', protect, admin, getUserById);
router.get('/orders', protect, admin, getAllOrders);

module.exports = router;
