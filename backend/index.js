import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import prisma from "./config/db.js";
import userRouter from "./routes/users.route.js";
import movieRouter from "./routes/movies.route.js";
import cors from "cors";
import showRouter from "./routes/shows.route.js";
import authRouter from "./routes/auth.routes.js";
import ErrorMiddleware from "./middlewares/error.middleware.js";
import authorizeUser from "./middlewares/auth.middleware.js";
import ticketRouter from "./routes/tickets.route.js";

const app = express();

// cors
app.use(
  cors({
    origin: ["https://web-chat-virid-two.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// Middlewares
app.use(urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res, next) => {
  res.send("You got the endpoint");
});
app.use("/api/users", authorizeUser, userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/shows", showRouter);
app.use("/api/auth", authRouter);
app.use("/api/tickets", authorizeUser, ticketRouter);

// Error middleware
app.use(ErrorMiddleware);

app.listen(PORT, async () => {
  console.log("Listening on port", PORT);

  try {
    await prisma.$connect();
    console.log("Database connected !!");
  } catch {
    console.log("Database connection failed !!");
  }
});
