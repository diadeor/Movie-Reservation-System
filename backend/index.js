import express from "express";
import { PORT } from "./config/env.js";
import prisma from "./config/db.js";

const app = express();

app.get("/", (req, res, next) => {
  res.send("hi there");
});

app.listen(PORT, async () => {
  console.log("Listening on port", PORT);
  await prisma.$connect();
  console.log("Database connected !!");
});
