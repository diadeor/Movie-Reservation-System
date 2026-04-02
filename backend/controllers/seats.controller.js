import prisma from "../config/db.js";
import throwError from "../config/err.js";

export const getSeatsByShow = async (req, res, next) => {
  try {
    const { id } = req.params;
    const showExists = await prisma.show.findUnique({ where: { id } });
    if (!showExists) throwError("Show not found");

    const seats = await prisma.seat.findMany({ where: { show_id: id } });

    const sortedSeats = seats.sort((a, b) => {
      return a.seat_number.localeCompare(b.seat_number, undefined, {
        numeric: true,
        sensitivity: "base",
      });
    });

    return res.json({ success: true, seats: sortedSeats });
  } catch (error) {
    next(error);
  }
};

export const lockSeats = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { show, seats } = req.body;
    if (!seats || !show) throwError("Show & seat info is required");

    const showExists = await prisma.show.findUnique({ where: { id: show } });
    if (!showExists) throwError("A show with that id doesn't exist.");

    const lockedUntil = new Date(Date.now() + 15 * 60 * 1000);

    const updatedSeats = await prisma.seat.updateMany({
      where: { show_id: show, seat_number: { in: seats } },
      data: { locked_by: id, status: "locked", locked_until: lockedUntil },
    });

    return res.json({ success: true, updatedSeats });
  } catch (error) {
    next(error);
  }
};

export const checkSeatStatus = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { show, seats } = req.body;
    if (!seats || !show) throwError("Show & Seat info is required");

    const showExists = await prisma.show.findUnique({ where: { id: show } });
    if (!showExists) throwError("A show with that id doesn't exist");

    await prisma.seat.updateMany({
      where: {
        show_id: show,
        seat_number: { in: seats },
        status: "locked",
        locked_until: { lt: new Date() },
      },
      data: { status: "available", locked_by: null, locked_until: null },
    });

    const updatedSeats = await prisma.seat.findMany({
      where: { show_id: show, seat_number: { in: seats } },
      select: { seat_number: true, status: true },
    });

    return res.json({ success: true, seats: updatedSeats });
  } catch (error) {
    next(error);
  }
};
