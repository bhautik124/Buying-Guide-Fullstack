import React, { useState, useEffect } from "react";
import axios from "axios";

const ShouldIBuyModal = ({ productId, isOpen, onClose, openCompareModal }) => {
  const [analysisResult, setAnalysisResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysis = async () => {
    setIsLoading(true);
    try {
      const productIdNumber = Number(productId);
      if (isNaN(productIdNumber)) {
        throw new Error("productId must be a number.");
      }

      const response = await axios.get(
        `http://localhost:3000/api/should-i-buy/${productIdNumber} `
      );

      // Set the analysis result from the backend
      setAnalysisResult(response.data.analysisResult);
    } catch (error) {
      // Handle specific error for insufficient reviews
      if (error.response && error.response.status === 400) {
        setAnalysisResult(error.response.data.message); // Set the error message from the backend
      } else {
        console.error("Error analyzing reviews:", error);
        setAnalysisResult("Failed to analyze reviews. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Reset analysisResult when the modal closes
  useEffect(() => {
    if (!isOpen) {
      setAnalysisResult("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-10">
      <div className="bg-[#101110] rounded-lg p-8 w-full max-w-2xl relative flex flex-col items-center">
        <button
          className="absolute top-4 right-4 text-white text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h3 className="text-2xl font-bold mb-10 text-center">Should I Buy?</h3>
        {analysisResult ? (
          <>
            <p className="text-xl text-center mb-6">{analysisResult}</p>
            {/* Show "Compare this product" button only if the result is not one of the two specific messages */}
            {analysisResult !==
              "Yes, this product is highly recommended based on reviews." &&
              analysisResult !==
                "Not enough reviews to analyze. At least 3 reviews are required." && (
                <button
                  className="bg-[#202020] px-4 py-2 rounded-lg text-xl hover:bg-[#303030]"
                  onClick={() => {
                    onClose(); // Close the Should I Buy modal
                    openCompareModal(); // Open the Compare Modal
                  }}
                >
                  Compare this product with another product
                </button>
              )}
          </>
        ) : (
          <div className="flex justify-center">
            <button
              className="bg-[#202020] px-4 py-2 rounded-lg text-xl hover:bg-[#303030]"
              onClick={handleAnalysis}
              disabled={isLoading}
            >
              {isLoading ? "Analyzing..." : "Analyze Reviews"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShouldIBuyModal;
