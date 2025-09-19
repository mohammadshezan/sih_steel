const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/auth');

// GET /api/alerts/list

const alertsController = require('../controllers/alertsController');
router.get('/list', alertsController.getAlerts);
router.post('/create', verifyToken, requireRole(['admin', 'manager']), async (req, res) => {
	try {
		const mongoose = require('mongoose');
		const Alert = require('../models/Alert');
		const isConnected = mongoose.connection && mongoose.connection.readyState === 1;
		if (!isConnected) return res.status(503).json({ error: 'DB not connected' });
		const { type = 'Info', message, coords } = req.body || {};
		if (!message) return res.status(400).json({ error: 'message required' });
		const doc = await Alert.create({ type, message, coords });
		res.status(201).json({ id: doc._id.toString(), message: 'Alert created' });
	} catch (err) {
		res.status(500).json({ error: 'Failed to create alert' });
	}
});

module.exports = router;
