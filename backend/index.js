import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import prisma from "./config/db.js";
import userRouter from "./routes/users.route.js";
import movieRouter from "./routes/movies.route.js";

const app = express();

// Middlewares
app.use(urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res, next) => {
  res.send("hi there");
});
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);

app.listen(PORT, async () => {
  console.log("Listening on port", PORT);

  try {
    await prisma.$connect();
    console.log("Database connected !!");
  } catch {
    console.log("Database connection failed !!");
  }
});
