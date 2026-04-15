import Router from "express";
import { getSeatsByShow, lockSeats } from "../controllers/seats.controller.js";
import seatsUnlock from "../middlewares/seat.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { lockSeatSchema, getSeatsByShowSchema } from "../schemas/seat.schema.js";

const seatRouter = Router();

seatRouter.get("/:id", validate(getSeatsByShowSchema), seatsUnlock, getSeatsByShow);
seatRouter.post("/lock", validate(lockSeatSchema), lockSeats);
seatRouter.get("/check/:id", validate(getSeatsByShowSchema), getSeatsByShow);

export default seatRouter;
