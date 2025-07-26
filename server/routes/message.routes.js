import express from "express";
import { addMessage } from "../controllers/message.controller.js";
import { authMiddleware } from "./../middlewares/auth.middleware.js";

const messageRouter = express.Router();

messageRouter.post("/:chatId/add-message", authMiddleware, addMessage);

export default messageRouter;
