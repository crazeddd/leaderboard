import express from "express";
import http from "http";
import logger from "morgan";
import cors from "cors";

import apiRouter from "./routes/api";
import usersRouter from "./routes/users";

var app = express();
const server = http.createServer(app);

const corsConfig = {
  origin: ["http://localhost:3000", "https://cautious-space-eureka-rwjpxj9v6653p65g-3000.app.github.dev"],
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

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});