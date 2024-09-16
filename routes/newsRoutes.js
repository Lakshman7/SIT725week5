const express = require('express');
const newsController = require('../controllers/newsController');

const router = express.Router();

// Define routes for news operations
router.get('/', newsController.getNews); // Example route

module.exports = router;
