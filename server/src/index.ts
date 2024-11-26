import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
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
const FRONTEND_URL = process.env.FRONTEND_URL ?? "";
// const __dirname = path.resolve();

app.use(
  cors({
    origin: [FRONTEND_URL],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Methods",
      "Access-Control-Request-Headers",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send(`Server is running on PORT ${PORT}`);
});

app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', FRONTEND_URL);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.send();
});

// if (process.env.NODE_ENV !== "development") {
//   app.use(express.static(path.join(__dirname, "../client/build")));

//   app.get("*", (req, res) => [
//     res.sendFile(path.join(__dirname, "../client", "build", "index.html")),
//   ]);
// }

server.listen(PORT, () => {
  console.log(`Connected to server successfully on port ${PORT}!!!`);
  connectDB();
});
