import prisma from "../config/db.js";
import throwError from "../config/err.js";

const seatsUnlock = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Seat unlock function
    await prisma.seat.updateMany({
      where: {
        show_id: id,
        status: "locked",
        locked_until: { lt: new Date() },
      },
      data: { status: "available", locked_by: null, locked_until: null },
    });
    next();
  } catch (error) {
    next(error);
  }
};

export default seatsUnlock;
