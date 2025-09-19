const express = require('express');
const router = express.Router();

// POST /api/auth/login

const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/otp', authController.otp);

module.exports = router;
