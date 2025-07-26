import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  addChat,
  getChat,
  getChats,
  readChat,
} from "../controllers/chat.controller.js";

const chatRouter = express.Router();

chatRouter.post("/add-chat", authMiddleware, addChat);
chatRouter.get("/get-chats", authMiddleware, getChats);
chatRouter.get("/get-chat/:id", authMiddleware, getChat);
chatRouter.put("/read-chat/:id", authMiddleware, readChat);

export default chatRouter;
