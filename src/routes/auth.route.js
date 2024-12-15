import express from "express"
import { signup, login, logout } from "../controllers/auth.controller.js";
import passport from "passport";
import { googleAuth } from "../controllers/auth.controller.js";

const router = express.Router()

router.post("/signup",signup);

router.post("/login",login);

router.post("/logout",logout);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/auth/google/callback", passport.authenticate("google", { session: false }),googleAuth);

export default router;