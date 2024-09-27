import express from "express";
import { getUser, getUsers } from "./userController";

const userRouter = express.Router();

userRouter.get("", getUsers);
userRouter.get("/:name", getUser);

export default userRouter;