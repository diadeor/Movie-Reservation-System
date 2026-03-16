import prisma from "../config/db.js";
import throwError from "../config/err.js";

export const getShows = async (req, res, next) => {
  try {
    const shows = await prisma.shows.findMany({});

    return res.json({
      success: true,
      shows,
    });
  } catch (error) {
    next(error);
  }
};

export const getShow = async (req, res, next) => {
  try {
    const { id } = req.params;

    const show = await prisma.shows.findUnique({ where: { id } });

    if (!show) throwError("Show doesn't exist", 404);

    return res.json({
      success: true,
      show,
    });
  } catch (error) {
    next(error);
  }
};
export const getShowByMovie = async (req, res, next) => {
  try {
    const { id } = req.params;

    const movieExists = await prisma.movies.findUnique({ where: { id } });

    if (!movieExists) throwError("Movie doesn't exist", 404);

    const shows = await prisma.shows.findMany({ where: { movie_id: +id } });

    return res.json({
      success: true,
      shows,
    });
  } catch (error) {
    next(error);
  }
};

export const addShow = async (req, res, next) => {
  try {
    const { show } = req.body;
    const { date, time, price, status, available_seats, reserved_seats, movie_id } = show;

    console.log({ show });

    const movieExists = await prisma.movies.findUnique({ where: { id: movie_id } });
    if (!movieExists) throwError("Movie doesn't exist", 404);

    const alreadyExists = await prisma.shows.findFirst({
      where: {
        date,
        time,
        movie_id,
      },
    });

    if (alreadyExists) throwError("Show already exists", 401);

    const now = new Date();
    const currentDateStr = now.toLocaleDateString("en-CA");
    const currentTimeStr = now.toLocaleTimeString("en-GB", { hour12: false });

    await prisma.shows.updateMany({
      where: {
        status: "upcoming",
        movie_id,
        OR: [
          { date: { lt: currentDateStr } },
          { date: { equals: currentDateStr }, time: { lt: currentTimeStr } },
        ],
      },
      data: { status: "expired" },
    });

    const newShow = await prisma.$transaction([
      prisma.shows.create({ data: show }),
      prisma.movies.update({ where: { id: movie_id }, data: { status: "active" } }),
    ]);
    return res.json({
      success: true,
      message: "New show created",
      newShow,
    });
  } catch (error) {
    next(error);
  }
};

export const updateShow = async (req, res, next) => {
  try {
    const { date, time, price, status } = req.body;
    const { id } = req.params;

    const providedTimeStamp = new Date(`${date}T${time}`);
    const currentTimeStamp = new Date();

    const showExists = await prisma.shows.findUnique({ where: { id: +id } });
    if (!showExists) throwError("Show does not exist", 404);

    const { date: showDate, time: showTime, price: showPrice, status: showStatus } = showExists;
    const noChangesMade = date === showDate && time === showTime && price === showPrice;
    const statusChanged = showStatus === status ? false : true;
    const statusChangeOnly = noChangesMade ? true : false;

    !statusChanged && noChangesMade && throwError("No changes made");

    if (statusChangeOnly && status === "upcoming") throwError("Invalid time", 400);
    if (!statusChangeOnly && currentTimeStamp > providedTimeStamp) {
      throwError("Invalid time", 400);
    }
    const { movie_id } = showExists;

    const updatedShow = await prisma.shows.update({
      where: { id: +id },
      data: statusChangeOnly ? { status } : { date, time, price: +price, status },
    });
    const now = new Date();
    const currentDateStr = now.toLocaleDateString("en-CA");
    const currentTimeStr = now.toLocaleTimeString("en-GB", { hour12: false });

    await prisma.shows.updateMany({
      where: {
        status: "upcoming",
        movie_id,
        OR: [
          { date: { lt: currentDateStr } },
          { date: { equals: currentDateStr }, time: { lt: currentTimeStr } },
        ],
      },
      data: { status: "expired" },
    });

    const shows = await prisma.shows.findMany({
      where: { status: "upcoming", movie_id },
    });

    !shows.length &&
      (await prisma.movies.update({ where: { id: movie_id }, data: { status: "inactive" } }));

    return res.json({
      success: true,
      message: `Show ${statusChangeOnly ? "status" : "information"} updated.`,
      show: { ...updatedShow },
    });
  } catch (error) {
    next(error);
  }
};
