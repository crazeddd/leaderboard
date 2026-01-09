import express from "express";
var router = express.Router();

import { getScores, submitScore, getTopScores } from "../controllers/api";

router.get("/scores", getScores);
router.get("/top-scores", getTopScores);
router.post("/scores", submitScore);

export default router;