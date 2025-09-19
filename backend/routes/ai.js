const express = require('express');
const router = express.Router();

// POST /api/ai/forecast

const aiController = require('../controllers/aiController');
router.post('/forecast', aiController.forecast);

module.exports = router;
