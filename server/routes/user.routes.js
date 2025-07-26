import express from "express";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../controllers/user.controller.js";
import {
  loginUserValidations,
  registerUserValidations,
} from "../validations/user.validations.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUserValidations, registerUser);
userRouter.post("/login", loginUserValidations, loginUser);
userRouter.get("/logout", logoutUser);
userRouter.get("/me", authMiddleware, getUser);
userRouter.put("/update-profile/:id", authMiddleware, updateUser);

export default userRouter;
