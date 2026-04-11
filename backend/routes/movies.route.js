import { Router } from "express";
import {
  addMovie,
  getMovie,
  getMovies,
  getMoviesName,
  getActiveMovies,
  updateStatus,
} from "../controllers/movies.controller.js";
import authorizeUser from "../middlewares/auth.middleware.js";

const movieRouter = Router();

movieRouter.get("/", getMovies);
movieRouter.get("/active", getActiveMovies);
movieRouter.get("/admin", getMoviesName);
movieRouter.post("/add", authorizeUser, addMovie);
// movieRouter.delete("/remove/:id", authorizeUser, removeMovie);
movieRouter.get("/:id", getMovie);
// movieRouter.put("/update/:id", updateStatus);

export default movieRouter;
