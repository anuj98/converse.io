import express from "express";
import {
  deleteMessage,
  getTopMessages,
  getMessagesForSingleFriend,
  insertMessage,
  updateMessage,
} from "../controllers/message.controller";
import { protectRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.get("", protectRoute, getTopMessages);

router.get("/user/:id", protectRoute, getMessagesForSingleFriend);

router.post("", protectRoute, insertMessage);

router.patch("/:id", protectRoute, updateMessage);

router.delete("/:id", protectRoute, deleteMessage);

export default router;
