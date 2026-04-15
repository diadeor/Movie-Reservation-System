import { Router } from "express";
import {
  createTicket,
  getTicket,
  getTickets,
  getTicketsByUser,
} from "../controllers/tickets.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { idParamSchema } from "../schemas/misc.schema.js";
import { createTicketSchema } from "../schemas/ticket.schema.js";

const ticketRouter = Router();

ticketRouter.get("/", getTickets);
ticketRouter.post("/create", validate(createTicketSchema), createTicket);
ticketRouter.get("/user/:id", validate(idParamSchema), getTicketsByUser);
ticketRouter.get("/:id", validate(idParamSchema), getTicket);

export default ticketRouter;
