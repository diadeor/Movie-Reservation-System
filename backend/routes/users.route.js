import { Router } from "express";
import prisma from "../config/db.js";
import { getUsers, getUser, getCurrentUser, editUser } from "../controllers/users.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { idParamSchema } from "../schemas/misc.schema.js";
import { editUserSchema } from "../schemas/auth.schema.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/me", getCurrentUser);
userRouter.put("/edit", validate(editUserSchema), editUser);
userRouter.get("/:id", validate(idParamSchema), getUser);

export default userRouter;
