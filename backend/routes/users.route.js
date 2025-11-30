import { Router } from "express";
import prisma from "../config/db.js";
import { getUsers, getUser } from "../controllers/users.controller.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);

export default userRouter;
