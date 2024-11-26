import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { Document } from "mongoose";
import authRoutes from "./routes/auth.route";
import messageRoutes from "./routes/message.route";
import userRoutes from "./routes/user.route";
import { connectDB } from "./lib/db";
import cors from "cors";
import { app, server } from "./lib/socket";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user: Document;
    }
  }
}

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

if (process.env.NODE_ENV !== "development") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => [
    res.sendFile(path.join(__dirname, "../client", "build", "index.html")),
  ]);
}

server.listen(PORT, () => {
  console.log(`Connected to server successfully on port ${PORT}!!!`);
  connectDB();
});
