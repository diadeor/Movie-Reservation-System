import { Router } from "express";
import { getMovies } from "../controllers/movies.controller.js";

const movieRouter = Router();

movieRouter.get("/", getMovies);

export default movieRouter;
