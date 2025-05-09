import express from "express";
import { getAISuggestion } from "../controller/aiController.js";

const router = express.Router();

router.post("/suggest", getAISuggestion);

export default router;
