import express from 'express';
import { getNews } from '../controllers/newsController.js';

const router = express.Router();

// Define routes for news operations
router.get('/', getNews);

export default router;
