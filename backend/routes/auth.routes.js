import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";

const router = express.Router();

// Allow both GET and POST requests for logout
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);  

export default router;
