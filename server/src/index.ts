import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./db";
import socketConnect from "./home";

// Connect to Mongo DB
connectDB();

// Express app creation
const app = express();
const server  = createServer(app);
const io = new Server(server);

// PORT to listen
const port = process.env.PORT || 5000;

// Listen to socket connection in express app
socketConnect(app, io)

server.listen(port, () => {
    console.log(`🚀Server running on port ${port}`)
});