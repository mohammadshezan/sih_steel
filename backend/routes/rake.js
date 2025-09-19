const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/auth');

// POST /api/rake/plan

const rakeController = require('../controllers/rakeController');
router.post('/plan', verifyToken, requireRole(['admin', 'manager']), rakeController.planRake);
// GET last plan
router.get('/last', verifyToken, rakeController.getLastPlan);
// List plans (recent)
router.get('/plans', verifyToken, requireRole(['admin', 'manager']), rakeController.listPlans);

module.exports = router;
