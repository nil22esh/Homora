import { body } from "express-validator";

export const registerUserValidations = [
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("username").notEmpty().withMessage("username is required"),
  body("password").notEmpty().withMessage("password is required"),
];

export const loginUserValidations = [
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("password").notEmpty().withMessage("password is required"),
];
