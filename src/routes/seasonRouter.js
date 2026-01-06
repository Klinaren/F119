const express = require('express');
const router = express.Router();
const seasonController = require('../controllers/seasonController');

router.get('/', seasonController.index);
router.get('/season/:id', seasonController.show);

module.exports = router;