import Router from "express";
import { checkSeatStatus, getSeatsByShow, lockSeats } from "../controllers/seats.controller.js";
import authorizeUser from "../middlewares/auth.middleware.js";

const seatRouter = Router();

seatRouter.get("/:id", getSeatsByShow);
seatRouter.post("/lock", lockSeats);
seatRouter.post("/check", checkSeatStatus);

export default seatRouter;
