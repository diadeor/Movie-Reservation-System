import { Router } from "express";
import {
  addMovie,
  getMovie,
  getMovies,
  getMoviesName,
  getActiveMovies,
  updateStatus,
} from "../controllers/movies.controller.js";

const movieRouter = Router();

movieRouter.get("/", getMovies);
movieRouter.get("/active", getActiveMovies);
movieRouter.get("/admin", getMoviesName);
movieRouter.get("/:id", getMovie);
movieRouter.put("/:id/update", updateStatus);
movieRouter.post("/add", addMovie);

export default movieRouter;
