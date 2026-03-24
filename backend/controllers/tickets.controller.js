import prisma from "../config/db.js";
import throwError from "../config/err.js";

export const getTickets = async (req, res, next) => {
  try {
    const tickets = await prisma.tickets.findMany({
      orderBy: {
        id: "desc",
      },
    });
    const newObj = {};

    for (let x of tickets) {
      const keyExists = Object.keys(newObj).includes(String(x.show));
      keyExists ? newObj[x.show].push(x) : (newObj[x.show] = [x]);
    }

    return res.json({
      success: true,
      tickets: newObj,
    });
  } catch (error) {
    next(error);
  }
};

export const getTicketsByUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userExists = await prisma.users.findUnique({ where: { id: +id } });
    if (!userExists) throwError("User does not exist", 400);

    const tickets = await prisma.tickets.findMany({
      where: { user: +id },
      orderBy: { createdAt: "desc" },
    });

    return res.json({
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
    const ticket = await prisma.tickets.findUnique({ where: { id: +id } });
    if (!ticket) throwError("No ticket with such id", 404);

    return res.json({
      success: true,
      ticket,
    });
  } catch (error) {
    next(error);
  }
};

export const createTicket = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { seats, show } = req.body;

    const showExists = await prisma.shows.findUnique({ where: { id: show } });
    if (!showExists) throwError("Show does not exist", 404);

    const ticketObj = {
      show,
      user: +id,
      seats,
      number_of_seats: seats.length,
      seat_price: showExists.price,
    };
    const available_seats = showExists.available_seats.filter((item) => !seats.includes(item));

    const [shows, tickets] = await prisma.$transaction([
      prisma.shows.update({
        where: { id: show },
        data: {
          reserved_seats: [...showExists.reserved_seats, ...seats],
          available_seats,
        },
      }),
      prisma.tickets.create({ data: ticketObj }),
    ]);

    console.log(shows, tickets);
    return res.json({
      success: true,
      tickets,
    });
  } catch (error) {
    next(error);
  }
};
