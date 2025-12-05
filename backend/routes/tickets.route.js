import { Router } from "express";
import { createTicket, getTicket, getTickets } from "../controllers/tickets.controller.js";

const ticketRouter = Router();

ticketRouter.get("/", getTickets);
ticketRouter.get("/:id", getTicket);
ticketRouter.post("/create", createTicket);

export default ticketRouter;
