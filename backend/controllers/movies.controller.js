import prisma from "../config/db.js";
import axios from "axios";
import throwError from "../config/err.js";
import { OMDB_API } from "../config/env.js";

export const getMovies = async (req, res, next) => {
  try {
    const movies = await prisma.movie.findMany({});
    return res.json({
      success: true,
      movies,
    });
  } catch (error) {
    next(error);
  }
};
export const getActiveMovies = async (req, res, next) => {
  try {
    const movies = await prisma.movie.findMany({
      where: {
        status: "active",
      },
    });
    return res.json({
      success: true,
      movies,
    });
  } catch (error) {
    next(error);
  }
};
export const getMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await prisma.movie.findUnique({ where: { id } });

    if (!movie) throwError("No movie with that id", 404);

    return res.json({
      success: true,
      movie,
    });
  } catch (error) {
    next(error);
  }
};
export const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const okay = req.query;
    console.log({ okay, id });
    const movie = await prisma.movie.findUnique({ where: { id } });

    if (!movie) throwError("No movie with that id", 404);

    return res.json({
      success: true,
      movie,
    });
  } catch (error) {
    next(error);
  }
};
export const getMoviesName = async (req, res, next) => {
  try {
    const movies = await prisma.movie.findMany({
      select: {
        id: true,
        title: true,
        poster: true,
        year: true,
        cast: true,
      },
    });

    return res.json({
      success: true,
      movies,
    });
  } catch (error) {
    next(error);
  }
};
export const addMovie = async (req, res, next) => {
  try {
    const { imdbID, language } = req.body;
    const { role } = req.user;
    const url = `https://www.omdbapi.com/?apikey=${OMDB_API}&i=${imdbID}`;
    const { data: movie } = await axios.get(url);

    if (role != "admin") throwError("Must be an admin to perform this action.", 401);
    if (movie.Response === "False") throwError(movie.Error, 400);

    const alreadyExists = await prisma.movie.findUnique({
      where: {
        imdbID,
      },
    });
    if (alreadyExists) throwError("Movie already exists in database", 400);

    const runtimeMins = parseInt(movie.Runtime);
    const hours = parseInt(runtimeMins / 60);
    const minutes = runtimeMins % 60;
    const runtime = `${hours} hours ${minutes ? `${minutes} mins` : ""}`;

    const movieObject = {
      imdbID,
      title: movie.Title,
      year: +movie.Year,
      rated: movie.Rated,
      released: movie.Released,
      genre: movie.Genre,
      cast: movie.Actors,
      director: movie.Director,
      runtime,
      plot: movie.Plot,
      language,
      poster: movie.Poster,
      status: "inactive",
    };
    const newMovie = await prisma.movie.create({
      data: movieObject,
    });
    console.log({ newMovie });
    return res.json({ success: true, message: "New movie added", movie: { ...newMovie } });
  } catch (error) {
    next(error);
  }
};

// export const removeMovie = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { role } = req.user;

//     const isAdmin = role === "admin";
//     if (!isAdmin) throwError("Must be an admin to perform this action.", 401);

//     const movieExists = await prisma.movie.findUnique({ where: { imdbID: id } });
//     if (!movieExists) throwError("Movie with that id doesn't exist");

//     const { id: movie_id } = movieExists;
//     const shows = await prisma.show.findMany({ where: { movie_id } });

//     return res.json({ success: true });
//   } catch (error) {
//     next(error);
//   }
// };
