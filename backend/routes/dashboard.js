const express = require('express');
const router = express.Router();

// GET /api/dashboard/kpis

const dashboardController = require('../controllers/dashboardController');
router.get('/kpis', dashboardController.getKPIs);

module.exports = router;
