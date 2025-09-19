const express = require('express');
const router = express.Router();

// GET /api/reports/metrics

const reportsController = require('../controllers/reportsController');
router.get('/metrics', reportsController.getMetrics);

module.exports = router;
