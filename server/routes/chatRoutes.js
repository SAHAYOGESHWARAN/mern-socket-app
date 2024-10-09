const express = require('express');
const { getChatMessages, postChatMessage } = require('../controllers/chatController');
const router = express.Router();

router.get('/', getChatMessages);
router.post('/', postChatMessage);

module.exports = router;
