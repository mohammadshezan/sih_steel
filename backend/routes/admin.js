const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/auth');

// GET /api/admin/users
const adminController = require('../controllers/adminController');
router.get('/users', verifyToken, requireRole('admin'), adminController.getUsers);

// POST /api/admin/seed - protected for admin and manager
router.post('/seed', verifyToken, requireRole(['admin', 'manager']), adminController.seedDb);

module.exports = router;
