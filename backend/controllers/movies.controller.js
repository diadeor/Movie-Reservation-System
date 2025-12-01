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

export const addMovie = async (req, res, next) => {
  try {
    const { imdbID: id } = req.body;
    const url = `https://www.omdbapi.com/?apikey=f9c86c81&i=${id}`;
    const { data: movie } = await axios.get(url);
    console.log(movie);

    const movieObject = {
      title: movie.Title,
      year: movie.Year,
      rated: movie.Rated,
      released: movie.Released,
      genre: movie.Genre,
      cast: movie.Actors,
      director: movie.Director,
      runtime: movie.Runtime,
      plot: movie.Plot,
      language: movie.Language,
      poster: movie.Poster,
      status: "active",
    };
  } catch (error) {
    next(error);
  }
};
