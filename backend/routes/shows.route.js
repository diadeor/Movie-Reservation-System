import { Router } from "express";
import {
  getShow,
  getShows,
  addShow,
  getShowByMovie,
  updateShow,
} from "../controllers/shows.controller.js";

const showRouter = Router();

showRouter.get("/", getShows);
showRouter.get("/:id", getShow);
showRouter.get("/movie/:id", getShowByMovie);
showRouter.post("/add", addShow);
showRouter.put("/update/:id", updateShow);

export default showRouter;
