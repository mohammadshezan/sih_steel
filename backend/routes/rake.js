const express = require('express');
const router = express.Router();

// POST /api/rake/plan

const rakeController = require('../controllers/rakeController');
router.post('/plan', rakeController.planRake);
// GET last plan
router.get('/last', rakeController.getLastPlan);

module.exports = router;
