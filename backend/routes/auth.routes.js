import { Router } from "express";
import { signIn, signUp, signOut, changePass } from "../controllers/auth.controller.js";
import authorizeUser from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/sign-in", signIn);
authRouter.post("/sign-up", signUp);
authRouter.get("/sign-out", signOut);
authRouter.post("/change", authorizeUser, changePass);

export default authRouter;
