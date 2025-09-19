const express = require('express');
const router = express.Router();

// GET /api/admin/users

const adminController = require('../controllers/adminController');
router.get('/users', adminController.getUsers);

module.exports = router;
