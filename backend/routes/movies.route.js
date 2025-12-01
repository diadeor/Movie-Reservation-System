import { Router } from "express";
import { addMovie, getMovies } from "../controllers/movies.controller.js";

const movieRouter = Router();

movieRouter.get("/", getMovies);
movieRouter.post("/add", addMovie);

export default movieRouter;
