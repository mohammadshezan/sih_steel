const express = require('express');
const router = express.Router();

// GET /api/iot/rake

const iotController = require('../controllers/iotController');
router.get('/rake', iotController.getRake);

module.exports = router;
