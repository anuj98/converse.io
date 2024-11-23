import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {Document} from "mongoose";
import authRoutes from "./routes/auth.route";
import messageRoutes from "./routes/message.route";
import userRoutes from "./routes/user.route";
import { connectDB } from "./lib/db";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user: Document;
    }
  }
}

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Connected to server successfully on port ${PORT}!!!`);
  connectDB();
});
