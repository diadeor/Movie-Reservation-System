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
    const { id } = req.user;
    const { seats, show } = req.body;
    const showExists = await prisma.shows.findUniqueOrThrow({ where: { id: show } });

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
    res.json({
      success: true,
      tickets,
    });
  } catch (error) {
    next(error);
  }
};
