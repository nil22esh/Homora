import { validationResult } from "express-validator";
import Post from "../models/post.schema.js";
import mongoose from "mongoose";

export const createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    title,
    price,
    address,
    city,
    bedroom,
    bathroom,
    latitude,
    longitude,
    type,
    property,
    images,
    postDetail,
    user,
    savedPosts,
  } = req.body;
  try {
    const newPost = await Post.create({
      title,
      price,
      address,
      city,
      bedroom,
      bathroom,
      latitude,
      longitude,
      type,
      property,
      images,
      postDetail,
      user,
      savedPosts,
    });
    return res
      .status(201)
      .json({ message: "Post created successfully", newPost });
  } catch (error) {
    console.log(`Error while creating post: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate("user");
    return res.status(200).json({ count: posts.length, posts });
  } catch (error) {
    console.log(`Error while getting posts: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: "Post not found" });
  }
  try {
    const post = await Post.findById(id).populate("user");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json({ post });
  } catch (error) {
    console.log(`Error while getting post: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .json({ message: "Post updated successfully", updatedPost });
  } catch (error) {
    console.log(`Error while updating post: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: "Post not found" });
  }
  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      req.status(404).json({ message: "Post not found" });
    }
    return res
      .status(200)
      .json({ message: "Post deleted successfully", deletedPost });
  } catch (error) {
    console.log(`Error while deleting post: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};
