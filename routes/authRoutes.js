import express from 'express';
import { loginPage, registerPage, register, login, logout } from '../controllers/authController.js';

const router = express.Router();

// Login Page Route
router.get('/login', loginPage);

// Register Page Route
router.get('/register', registerPage);

// Register Route
router.post('/register', register);

// Login Route
router.post('/login', login);

// Logout Route
router.get('/logout', logout);

export default router;
