const express = require('express');
const router = express.Router();

// GET /api/maintenance/alerts

const maintenanceController = require('../controllers/maintenanceController');
router.get('/alerts', maintenanceController.getAlerts);

module.exports = router;
