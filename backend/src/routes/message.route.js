import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getRoomMessages, sendMessage } from '../controllers/message.controller.js';

const router = express.Router();

router.post('/sendMessage', protectRoute, sendMessage);
router.get('/:roomId/messages', protectRoute, getRoomMessages); 

export default router;