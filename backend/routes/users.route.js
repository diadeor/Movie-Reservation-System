import { Router } from "express";
import prisma from "../config/db.js";
import { getUsers, getUser, getCurrentUser, editUser } from "../controllers/users.controller.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/me", getCurrentUser);
userRouter.put("/edit", editUser);
userRouter.get("/:id", getUser);

export default userRouter;
