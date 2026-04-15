import { Router } from "express";
import {
  getShow,
  getShows,
  addShow,
  getShowByMovie,
  updateShow,
} from "../controllers/shows.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { addShowSchema, editShowSchema } from "../schemas/show.schema.js";
import { idParamSchema } from "../schemas/misc.schema.js";

const showRouter = Router();

showRouter.get("/", getShows);
showRouter.get("/movie/:id", validate(idParamSchema), getShowByMovie);
showRouter.post("/add", validate(addShowSchema), addShow);
showRouter.put("/update/:id", validate(editShowSchema), updateShow);
showRouter.get("/:id", validate(idParamSchema), getShow);

export default showRouter;
