import prisma from "../config/db.js";
import axios from "axios";
import { KHALTI_SECRET_KEY } from "../config/env.js";
import { generateTicket, ticketVerified } from "./tickets.controller.js";

const BASE_URL = "http://localhost:5173";
const KHALTI_API = "https://dev.khalti.com/api/v2/epayment";
const SECRET_KEY = `Key ${KHALTI_SECRET_KEY}`;

export const initiatePayment = async (req, res, next) => {
  const { amt, show, seats } = req.body;
  const { id } = req.user;
  try {
    const ticket = await generateTicket(show, id, amt, seats);

    const { data } = await axios.post(
      `${KHALTI_API}/initiate/`,
      {
        return_url: `${BASE_URL}/payment/verify/`,
        website_url: BASE_URL,
        amount: amt * 100,
        purchase_order_id: ticket.id,
        purchase_order_name: `CineReserve Tickets - ${ticket.id}`,
      },
      {
        headers: {
          Authorization: SECRET_KEY,
          "Content-Type": "application/json",
        },
      },
    );
    const { pidx } = data;
    await prisma.ticket.update({ where: { id: ticket.id }, data: { pidx } });

    return res.json({ success: true, payment_url: data.payment_url });
  } catch (error) {
    console.log(error);
    // Safely extract Khalti's specific error message if it exists
    const errorDetail = error.response?.data?.detail || "Payment initiation failed";
    res.status(400).json({ success: false, error: errorDetail });
  }
};

export const verifyPayment = async (req, res, next) => {
  const { pidx } = req.body;
  try {
    const { data } = await axios.post(
      `${KHALTI_API}/lookup/`,
      {
        pidx,
      },
      {
        headers: {
          Authorization: SECRET_KEY,
          "Content-Type": "application/json",
        },
      },
    );
    const ticket = await prisma.ticket.findUnique({ where: { pidx } });
    if (data.status === "Completed") {
      await ticketVerified(ticket.id, data.transaction_id);
      return res.json({
        success: true,
        message: "Seats Confirmed.",
      });
    } else {
      return res.json({ success: false, message: "Payment cancelled." });
    }
  } catch (error) {
    console.log(error);
  }
};
