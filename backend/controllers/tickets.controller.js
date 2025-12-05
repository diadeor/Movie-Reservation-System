import prisma from "../config/db.js";

export const getTickets = async (req, res, next) => {
  try {
    const tickets = await prisma.tickets.findMany({});

    res.json({
      success: true,
      tickets,
    });
  } catch (error) {
    next(error);
  }
};

export const getTicket = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ticket = await prisma.tickets.findUnique({
      where: {
        id: +id,
      },
    });

    res.json({
      success: true,
      ticket,
    });
  } catch (error) {
    next(error);
  }
};

export const createTicket = async (req, res, next) => {
  try {
    const { seats, show } = req.body;

    const tickets = await prisma.tickets.create({});

    res.json({
      success: true,
      tickets,
    });
  } catch (error) {
    next(error);
  }
};
