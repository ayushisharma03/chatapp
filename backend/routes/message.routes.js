import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages); // <-- this line was causing the error
router.post("/:id", protectRoute, sendMessage);

export default router;
