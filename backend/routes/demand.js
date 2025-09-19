const express = require('express');
const router = express.Router();

// GET /api/demand/inventory

const demandController = require('../controllers/demandController');
router.get('/inventory', demandController.getInventory);
router.get('/customer', demandController.getCustomerDemand);

module.exports = router;
