const express = require('express');
const router = express.Router();

// GET /api/route/network

const routeController = require('../controllers/routeController');
router.get('/network', routeController.getNetwork);

module.exports = router;
