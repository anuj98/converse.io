import { Express } from  "express";
import { Server } from "socket.io";
import mongoose from "mongoose";
const User = mongoose.model("users");

const Home = (app: Express, io: Server) => {
    app.get("/users", async (req, res) => {
      const users = await User.find();
      res.json(users);
    })

    // Establish a connection
    io.on('connection', socket => {
      console.log("New user connected to socket");
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });    
}

export default Home;