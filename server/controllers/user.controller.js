import { validationResult } from "express-validator";
import User from "../models/user.schema.js";

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    email,
    username,
    password,
    avatar,
    savedPosts = [],
    posts = [],
    chats = [],
    chatIDs = [],
  } = req.body;
  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      const field = existingUser.email === email ? "Email" : "Username";
      return res.status(400).json({ message: `${field} already exists` });
    }
    const user = await User.create({
      email,
      username,
      password,
      avatar,
      savedPosts,
      posts,
      chats,
      chatIDs,
    });
    const token = await user.generateJwtToken();
    res.cookie("jwt_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });
    return res
      .status(201)
      .json({ message: "User registered successfully", user, token });
  } catch (error) {
    console.log(`Error while registering user: ${error}`);
    return res.status(500).json({ messaage: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isPasswordMatch = await existingUser.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid email and password" });
    }
    const token = await existingUser.generateJwtToken();
    res.cookie("jwt_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });
    return res.status(200).json({
      message: "User logged in successfully",
      user: existingUser,
      token,
    });
  } catch (error) {
    console.log(`Error while logging in user: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    if (!req.cookies.jwt_token) {
      return res.status(400).json({ message: "User not logged in" });
    }
    res.clearCookie("jwt_token");
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(`Error while logging out user: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUser = async (req, res) => {
  console.log(req.user);
  const userId = req.user._id;
  if (!userId) {
    return res.status(404).json({ message: "User not found" });
  }
  try {
    const user = await User.findById(userId);
    return res.status(200).json({ user });
  } catch (error) {
    console.log(`Error while getting user: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(404).json({ message: "User not found" });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    }).select("-password");
    return res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.log(`Error while updating user: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};
