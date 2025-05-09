import express from "express";
import {
  addReview,
  getReviews,
  shouldIBuy,
} from "../controller/ReviewController.js";

const router = express.Router();

router.post("/reviews", addReview);
router.get("/reviews/:productId", getReviews);
router.get("/should-i-buy/:productId", shouldIBuy);

export default router;
