import { Router } from "express";
import { getShow, getShows, addShow } from "../controllers/shows.controller.js";

const showRouter = Router();

showRouter.get("/", getShows);
showRouter.get("/:id", getShow);
showRouter.post("/add", addShow);

export default showRouter;
