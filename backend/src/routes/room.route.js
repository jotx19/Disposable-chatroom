import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import { createRoom, joinRoom, getRooms, removeUser } from "../controllers/room.controller.js"

const router = express.Router();

router.post("/create", protectRoute, createRoom);
router.post("/join", protectRoute, joinRoom);
router.get("/my-rooms", protectRoute, getRooms);
router.post("/removeUser", protectRoute, removeUser);

export default router;
