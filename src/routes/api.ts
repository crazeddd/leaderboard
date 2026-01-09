import express from "express";
var router = express.Router();

import { bearerAuth } from "auth";
import { getScores, submitScore, getTopScores } from "../controllers/api";

router.get("/scores", bearerAuth, getScores);
router.post("/scores", bearerAuth, submitScore);

router.get("/top-scores", getTopScores);

export default router;