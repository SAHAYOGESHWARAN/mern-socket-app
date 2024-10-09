const express = require('express');
const { getDocument, saveDocument } = require('../controllers/docController');
const router = express.Router();

router.get('/:id', getDocument);
router.post('/:id', saveDocument);

module.exports = router;
