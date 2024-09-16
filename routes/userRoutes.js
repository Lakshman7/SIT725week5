import express from 'express';
import { getUsers } from '../controllers/userController.js';

const router = express.Router();

// Define routes for user operations
router.get('/', getUsers);

export default router;
