import { body } from "express-validator";

export const createPostValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a valid number"),
  body("address").notEmpty().withMessage("Address is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("bedroom")
    .notEmpty()
    .withMessage("Bedroom count is required")
    .isInt({ min: 0 })
    .withMessage("Bedroom must be a valid integer"),
  body("bathroom")
    .notEmpty()
    .withMessage("Bathroom count is required")
    .isInt({ min: 0 })
    .withMessage("Bathroom must be a valid integer"),
  body("latitude")
    .notEmpty()
    .withMessage("Latitude is required")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be between -90 and 90"),
  body("longitude")
    .notEmpty()
    .withMessage("Longitude is required")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be between -180 and 180"),
  body("property")
    .notEmpty()
    .withMessage("Type is required")
    .isIn(["RENT", "SALE"])
    .withMessage("Type must be 'rent' or 'sale'"),
  body("type")
    .notEmpty()
    .withMessage("Property is required")
    .isIn(["HOUSE", "APARTMENT", "VILLA", "STUDIO"])
    .withMessage("Property must be a valid type"),
];
