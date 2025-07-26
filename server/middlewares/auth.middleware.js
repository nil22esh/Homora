import jwt from "jsonwebtoken";
import User from "../models/user.schema.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies.jwt_token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Not Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    req.user = user;
    next();
  } catch (error) {
    console.log(`Error while authenticating user: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};
