import express from "express";
import { lastMessageUniqueUsers, getMessagesForUser,sendMessage } from "./messageController";

const messageRouter = express.Router();

messageRouter.get("/users/:id", lastMessageUniqueUsers);
messageRouter.get("/user/:id", getMessagesForUser);
messageRouter.post("", sendMessage)

export default messageRouter;