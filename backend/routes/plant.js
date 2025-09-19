const express = require('express');
const router = express.Router();

// GET /api/plant/list

const plantController = require('../controllers/plantController');
router.get('/list', plantController.getList);

module.exports = router;
