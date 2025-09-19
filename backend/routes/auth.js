const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

// POST /api/auth/login
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/otp/send', authController.sendOtp);
router.post('/otp/verify', authController.verifyOtp);
router.post('/otp', authController.otp);

// GET /api/auth/me
router.get('/me', verifyToken, (req, res) => {
	// Minimal profile from token; client can fetch more from admin endpoints if role allows
	res.json({ user: { id: req.user.id, role: req.user.role } });
});

module.exports = router;
