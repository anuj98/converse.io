import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./db";
import Home from "./home";

// Connect to Mongo DB
connectDB();

// Express app creation
const app = express();
const server  = createServer(app);
const io = new Server(server);

// PORT to listen
const port = process.env.PORT || 5000;

// APIs and socket connection setup
Home(app, io)

server.listen(port, () => {
    console.log(`🚀Server running on port ${port}`)
});