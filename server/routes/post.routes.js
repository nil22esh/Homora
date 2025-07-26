import express from "express";
import { createPostValidation } from "../validations/post.validations.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../controllers/post.controller.js";

const postRouter = express.Router();

postRouter.post("/add-post", createPostValidation, authMiddleware, createPost);
postRouter.get("/get-posts", authMiddleware, getPosts);
postRouter.get("/get-post/:id", authMiddleware, getPostById);
postRouter.put("/update-post/:id", authMiddleware, updatePost);
postRouter.delete("/delete-post/:id", authMiddleware, deletePost);

export default postRouter;
