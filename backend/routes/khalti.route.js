import { Router } from "express";
import authorizeUser from "../middlewares/auth.middleware.js";
import { initiatePayment, verifyPayment } from "../controllers/khalti.controller.js";

const khaltiRouter = Router();

khaltiRouter.post("/initiate", authorizeUser, initiatePayment);

khaltiRouter.post("/verify", verifyPayment);

export default khaltiRouter;
