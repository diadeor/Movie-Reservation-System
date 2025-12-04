import { Router } from "express";
import { getShow, getShows, addShow, getShowByMovie } from "../controllers/shows.controller.js";

const showRouter = Router();

showRouter.get("/", getShows);
showRouter.get("/:id", getShow);
showRouter.get("/movie/:id", getShowByMovie);
showRouter.post("/add", addShow);

export default showRouter;
