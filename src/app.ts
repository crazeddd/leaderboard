import express from "express";
import http from "http";
import logger from "morgan";
import cors from "cors";

import { config } from "config";

import apiRouter from "./routes/api";
import usersRouter from "./routes/users";


var app = express();
const server = http.createServer(app);

const corsConfig = {
  origin: config().trustedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsConfig));
app.options(/(.*)/, cors(corsConfig));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRouter);
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("pong");
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

server.listen(config().port, () => {
  console.log(`Server listening on port ${config().port}`);
});