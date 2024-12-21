import express from 'express';
import { createRoom, getUserRooms, joinRoom } from '../controllers/room.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/create',protectRoute, createRoom); 
router.post('/join',protectRoute, joinRoom);
router.get('/rooms',protectRoute, getUserRooms); 

export default router;
