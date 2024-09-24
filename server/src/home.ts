import { Express } from  "express";
import { Server } from "socket.io";
import { Message, User } from "./models/schemas"

const Home = (app: Express, io: Server) => {
    app.get("/", async (req, res) => {
      res.json({
        "status": 1
      })
    });

    app.get("/users", async (req, res) => {
      const users = await User.find();
      res.json(users);
    })

    app.get("/users/:id/messages", async (req, res) => {
      const userId = req.params.id;
      console.log("Fetching messages for user: " + userId);
      const messages = await Message.find();
      res.json(messages);
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