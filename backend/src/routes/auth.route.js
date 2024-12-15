import express from "express"
import { signup, login, logout, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import passport from "passport";
import { googleAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router()

router.post("/signup",signup);

router.post("/login",login);

router.post("/logout",logout);

router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/auth/google/callback", passport.authenticate("google", { session: false }),googleAuth);

export default router;