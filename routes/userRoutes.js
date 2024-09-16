const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Define routes for user operations
router.get('/', userController.getUsers); // Example route

module.exports = router;
