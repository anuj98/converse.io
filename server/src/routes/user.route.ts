import express from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { getUsers } from "../controllers/user.controller";

const router = express.Router();

router.get("", protectRoute, getUsers)

export default router;