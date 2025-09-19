const express = require('express');
const router = express.Router();

// GET /api/chat/messages

const chatController = require('../controllers/chatController');
router.get('/messages', chatController.getMessages);

module.exports = router;
