import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import throwError from "../config/err.js";

const authorizeUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) throwError("Unauthorized: Not logged in", 401);

    const user = jwt.verify(token, JWT_SECRET);

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authorizeUser;
