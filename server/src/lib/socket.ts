import express from "express";
import { Server } from "socket.io";
import http from "http";

interface UserSocketMapping {
  [key: string]: string;
}

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

const userSocketMapping: UserSocketMapping = {};

export function getRecieverSocketId(userId: string) {
    return userSocketMapping[userId]
}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  const userId: string = socket.handshake.query.userId as string;
  if (userId) userSocketMapping[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(userSocketMapping));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMapping[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMapping));
  });
});

export { app, server, io };
