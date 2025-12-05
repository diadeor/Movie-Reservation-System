import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

const authorizeUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      const error = new Error("Unauthorized: Not logged in");
      error.statusCode = 401;
      throw error;
    }

    const user = jwt.verify(token, JWT_SECRET);

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authorizeUser;
