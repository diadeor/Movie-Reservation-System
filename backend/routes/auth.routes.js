import { Router } from "express";
import { signIn, signUp, signOut, changePass } from "../controllers/auth.controller.js";
import authorizeUser from "../middlewares/auth.middleware.js";
import { signInSchema, signUpSchema } from "../schemas/auth.schema.js";
import validate from "../middlewares/validate.middleware.js";

const authRouter = Router();

authRouter.post("/sign-in", validate(signInSchema), signIn);
authRouter.post("/sign-up", signUp);
authRouter.get("/sign-out", signOut);
authRouter.post("/change", authorizeUser, changePass);

export default authRouter;
