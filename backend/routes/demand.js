const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/auth');

// GET /api/demand/inventory

const demandController = require('../controllers/demandController');
router.get('/inventory', demandController.getInventory);
router.get('/customer', demandController.getCustomerDemand);
// simple admin endpoints to seed/update
router.post('/inventory', verifyToken, requireRole(['admin', 'manager']), demandController.createInventory);
router.post('/customer', verifyToken, requireRole(['admin', 'manager']), demandController.createCustomerDemand);
router.put('/inventory/:id', verifyToken, requireRole(['admin', 'manager']), demandController.updateInventory);
router.put('/customer/:id', verifyToken, requireRole(['admin', 'manager']), demandController.updateCustomerDemand);

module.exports = router;
