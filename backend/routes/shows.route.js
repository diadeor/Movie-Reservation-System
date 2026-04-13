import { Router } from "express";
import {
  getShow,
  getShows,
  addShow,
  getShowByMovie,
  updateShow,
} from "../controllers/shows.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { addShowSchema } from "../schemas/show.schema.js";

const showRouter = Router();

showRouter.get("/", getShows);
showRouter.get("/movie/:id", getShowByMovie);
showRouter.post("/add", validate(addShowSchema), addShow);
showRouter.put("/update/:id", updateShow);
showRouter.get("/:id", getShow);

export default showRouter;
