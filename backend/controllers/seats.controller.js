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

    const showExists = await prisma.show.findUnique({ where: { id: show } });
    if (!showExists) throwError("A show with that id doesn't exist.");

    const lockFor = new Date(Date.now() + 15 * 60 * 1000); // Lock for 15 mins

    const findMatches = await prisma.seat.findMany({
      where: {
        show_id: show,
        seat_number: { in: seats },
        OR: [{ status: "available" }, { locked_until: { lt: new Date() } }],
      },
      select: { seat_number: true },
    });

    const changeValid = findMatches.length === seats.length;

    if (changeValid) {
      await prisma.seat.updateMany({
        where: {
          show_id: show,
          seat_number: { in: seats },
          OR: [{ status: "available" }, { locked_until: { lt: new Date() } }],
        },
        data: { locked_by: id, status: "locked", locked_until: lockFor },
      });
    }

    const unavailable = changeValid
      ? null
      : seats.filter((item) => !findMatches.some((seat) => seat.seat_number === item));
    const updatedSeats = await prisma.seat.findMany({ where: { show_id: show } });

    const sortedSeats = updatedSeats.sort((a, b) => {
      return a.seat_number.localeCompare(b.seat_number, undefined, {
        numeric: true,
        sensitivity: "base",
      });
    });

    return res.json({
      success: true,
      message: changeValid ? "Seats locked !!" : "One or more seats you chose is already taken.",
      unavailable,
      updatedSeats: sortedSeats,
    });
  } catch (error) {
    next(error);
  }
};
