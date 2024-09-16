const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login Page Route
router.get('/login', authController.loginPage);

// Register Page Route
router.get('/register', authController.registerPage);

// Register Route
router.post('/register', authController.register);

// Login Route
router.post('/login', authController.login);

// Logout Route
router.get('/logout', authController.logout);

module.exports = router;
