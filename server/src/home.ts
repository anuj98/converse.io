import { Express } from  "express";
import { Server } from "socket.io";
import { Message, User } from "./models/schemas";
import userRouter from "./routes/userRoutes";
import messageRouter from "./routes/messageRoutes";

const Home = (app: Express, io: Server) => {
    app.get("/", async (req, res) => {
      res.json({
        "status": 1
      })
    });

    app.use("/users", userRouter);
    app.use("/messages", messageRouter);

    // Establish a connection
    io.on('connection', socket => {
      console.log("New user connected to socket");
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });    
}

export default Home;