import { Router } from "express";
import {
  createTicket,
  getTicket,
  getTickets,
  getTicketsByUser,
} from "../controllers/tickets.controller.js";

const ticketRouter = Router();

ticketRouter.get("/", getTickets);
ticketRouter.post("/create", createTicket);
ticketRouter.get("/user/:id", getTicketsByUser);
ticketRouter.get("/:id", getTicket);

export default ticketRouter;
