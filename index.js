import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { createServer } from 'http';
import  { findUser, addUser, getRoomUsers,  }  from "./utils.js";
import { Server } from "socket.io";
import { register, getMe, login, findUserOne } from "./controllers/UserController.js";
import { registerValidation, loginValidation } from "./validations/validations.js";
import { msgCreate, msgGet, msgGetAllUsers, msgRoomCreate } from "./controllers/MsgController.js";
import checkAuth from './utils/checkAuth.js';

mongoose.connect("mongodb+srv://Admin:Qwe12345@cluster0.dnz9j0y.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log("DB Ok"))
.catch((err) => console.log("DB ERROR", err));
const app = express();
app.use(express.json());
app.use(cors());
const httpServer = createServer(app);
httpServer.listen(process.env.PORT || 4000, (err) => {
    if(err) {
        return console.log(err);
    }
    console.log('Server OK');
});
const io = new Server(httpServer, {
    cors: {
      origin: "*",
    }
  });

  io.on("connection", (socket) => {
    socket.on("join", ({ name, room }) => { 
      socket.join(room);
      const { user, isExist } = addUser({ name, room });
      const userMessage = isExist
      ? `${user.name}, here you go again`
      : `Hey my love ${user.name}`
      

      socket.broadcast.to(user.room).emit("message", {
        data: { user: { name: "Admin" }, message: `${user.name} has joined` },
      });

      socket.on("sendMessage", ({ message, params }) => {
        console.log(message);
        const user = findUser(params);
        if (user) {
          io.to(user.room).emit("message", { data: { user, message } });
        }
      });
    }); 
    io.on("disconnect", () => {
      console.log("Disconnect");
    });
  });

  app.post('/auth/register', registerValidation, register);
  app.get('/auth/me', checkAuth, getMe);
  app.post('/auth/login', loginValidation, login);
  app.post('/user/findUser', checkAuth, findUserOne)