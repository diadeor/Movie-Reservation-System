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
import validate from "../middlewares/validate.middleware.js";
import { idParamSchema } from "../schemas/misc.schema.js";
import { addMovieSchema } from "../schemas/show.schema.js";

const movieRouter = Router();

movieRouter.get("/", getMovies);
movieRouter.get("/active", getActiveMovies);
movieRouter.get("/admin", getMoviesName);
movieRouter.post("/add", authorizeUser, validate(addMovieSchema), addMovie);
movieRouter.get("/:id", validate(idParamSchema), getMovie);
// movieRouter.put("/update/:id", updateStatus);

export default movieRouter;
