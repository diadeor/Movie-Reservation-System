import prisma from "../config/db.js";

export const getShows = async (req, res, next) => {
  try {
    const shows = await prisma.shows.findMany({});

    res.json({
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

    res.json({
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

    const shows = await prisma.shows.findMany({ where: { movie_id: +id } });

    res.json({
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
    const alreadyExists = await prisma.shows.findFirst({
      where: {
        date,
        time,
        movie_id,
      },
    });
    if (alreadyExists) throw new Error("Show already exists");

    const movieValid = await prisma.movies.findUniqueOrThrow({ where: { id: movie_id } });

    console.log({ movieValid });

    const newShow = await prisma.shows.create({ data: show });
    console.log({ newShow });
    res.json({
      success: true,
      message: "New show created",
      newShow,
    });
  } catch (error) {
    next(error);
  }
};
