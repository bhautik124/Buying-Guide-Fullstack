// controllers/reviewController.js
import Review from "../model/ReviewModel.js"

// Add a new review
export const addReview = async (req, res) => {
  try {
    const { productId, username, review, rating } = req.body;

    const newReview = new Review({
      productId, // Now it accepts a number
      username,
      review,
      rating,
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error: error.message });
  }
};

// Get reviews for a specific product
export const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId });
    res.status(200).json(reviews);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching reviews", error: error.message });
  }
};
// controllers/reviewController.js
export const shouldIBuy = async (req, res) => {
  try {
    const { productId } = req.params;

    // Convert productId to a number
    const productIdNumber = Number(productId);
    if (isNaN(productIdNumber)) {
      return res.status(400).json({
        message: "productId must be a number.",
      });
    }

    // Fetch reviews for the product
    const reviews = await Review.find({ productId: productIdNumber });

    // Check if there are more than 3 reviews
    if (reviews.length <= 3) {
      return res.status(400).json({
        message: "Not enough reviews to analyze. At least 3 reviews are required.",
      });
    }

    // Perform analysis (e.g., sentiment analysis, average rating, etc.)
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    // Determine if the product is worth buying
    let analysisResult;
    if (averageRating >= 4) {
      analysisResult = "Yes, this product is highly recommended based on reviews.";
    } else if (averageRating >= 3) {
      analysisResult = "This product is decent, but consider other options.";
    } else {
      analysisResult = "No, this product has poor reviews and is not recommended.";
    }

    res.status(200).json({ analysisResult, averageRating });
  } catch (error) {
    res.status(500).json({ message: "Error analyzing reviews", error: error.message });
  }
};