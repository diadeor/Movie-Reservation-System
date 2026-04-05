import Router from "express";
import { getSeatsByShow, lockSeats } from "../controllers/seats.controller.js";
import authorizeUser from "../middlewares/auth.middleware.js";
import seatsUnlock from "../middlewares/seat.middleware.js";

const seatRouter = Router();

seatRouter.get("/:id", seatsUnlock, getSeatsByShow);
seatRouter.post("/lock", lockSeats);
seatRouter.get("/check/:id", getSeatsByShow);

export default seatRouter;
