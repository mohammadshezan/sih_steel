const express = require('express');
const router = express.Router();

// GET /api/sustainability/metrics

const sustainabilityController = require('../controllers/sustainabilityController');
router.get('/metrics', sustainabilityController.getMetrics);

module.exports = router;
