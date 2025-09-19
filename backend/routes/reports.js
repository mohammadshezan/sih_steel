const express = require('express');
const router = express.Router();

// GET /api/reports/metrics

const reportsController = require('../controllers/reportsController');
router.get('/metrics', reportsController.getMetrics);

// Exports
router.get('/export/pdf', reportsController.exportPdf);
router.get('/export/xlsx', reportsController.exportXlsx);

module.exports = router;
