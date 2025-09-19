const express = require('express');
const router = express.Router();

// GET /api/alerts/list

const alertsController = require('../controllers/alertsController');
router.get('/list', alertsController.getAlerts);

module.exports = router;
