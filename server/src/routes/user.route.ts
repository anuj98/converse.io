import express from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { getUsers } from "../controllers/user.controller";

const router = express.Router();

router.post("", protectRoute, getUsers)

export default router;