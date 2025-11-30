import prisma from "../config/db.js";

export const getMovies = async (req, res, next) => {
  try {
    const movies = await prisma.movies.findMany({});
    res.json({
      success: true,
      movies,
    });
  } catch (error) {
    next(error);
  }
};
