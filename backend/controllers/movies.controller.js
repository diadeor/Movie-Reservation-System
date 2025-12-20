import prisma from "../config/db.js";
import axios from "axios";

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
export const getActiveMovies = async (req, res, next) => {
  try {
    const movies = await prisma.movies.findMany({
      where: {
        status: "active",
      },
    });
    res.json({
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
    const movie = await prisma.movies.findUnique({ where: { id: +id } });

    res.json({
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
    const movie = await prisma.movies.findUnique({ where: { id: +id } });

    res.json({
      success: true,
      movie,
    });
  } catch (error) {
    next(error);
  }
};
export const getMoviesName = async (req, res, next) => {
  try {
    const movies = await prisma.movies.findMany({
      select: {
        id: true,
        title: true,
        poster: true,
        year: true,
        cast: true,
      },
    });

    res.json({
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
    const url = `https://www.omdbapi.com/?apikey=f9c86c81&i=${imdbID}`;
    const { data: movie } = await axios.get(url);

    if (movie.Response === "False") throw new Error(movie.Error);

    const alreadyExists = await prisma.movies.findUnique({
      where: {
        imdbID,
      },
    });
    if (alreadyExists) throw new Error("Movie already exists in database");

    const runtimeMins = +String(movie.Runtime).split(" ")[0];
    const hours = (runtimeMins / 60).toFixed(0);
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
    console.log(movieObject);
    const newMovie = await prisma.movies.create({
      data: movieObject,
    });
    console.log({ newMovie });
    res.json({ success: true, message: "New movie added", movie: { ...newMovie } });
  } catch (error) {
    next(error);
  }
};
