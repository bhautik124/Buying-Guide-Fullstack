import React, { useState } from "react";
import { Link } from "react-router-dom";

const CompareModal = ({ productId, products, isOpen, onClose }) => {
  const [selectedProductId, setSelectedProductId] = useState("");

  // Find the current product
  const currentProduct = products.find((p) => p.id === parseInt(productId));

  // Find the selected product for comparison
  const selectedProduct = products.find(
    (p) => p.id === parseInt(selectedProductId)
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-10">
      <div className="bg-[#101110] rounded-lg p-8 w-full max-w-4xl relative">
        {/* Top Row */}
        <div className="flex justify-between items-center mb-6">
          {/* Left: "Compare Products" Text */}
          <h3 className="text-2xl font-bold">Compare Products</h3>

          {/* Center: Dropdown */}
          <select
            className="bg-[#202020] px-4 py-2 rounded-lg text-white"
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
          >
            <option value="">Select a product to compare</option>
            {products
              .filter((p) => p.id !== parseInt(productId)) // Exclude the current product
              .map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
          </select>

          {/* Right: Cross Button */}
          <button className="text-white text-2xl" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* Product Comparison Boxes */}
        <div className="flex space-x-8">
          {/* Current Product */}
          <div className="w-1/2 border border-white rounded-lg p-4">
            <h4 className="text-xl font-bold mb-4">{currentProduct.name}</h4>
            <img
              src={currentProduct.img}
              alt={currentProduct.name}
              className="w-full h-48 object-contain rounded-lg"
            />
            <p className="mt-4">Price: ₹{currentProduct.price}</p>
            <p>Brand: {currentProduct.brand}</p>
            <p>Description: {currentProduct.description}</p>
          </div>

          {/* Selected Product */}
          {selectedProduct && (
            <div className="w-1/2 border border-white rounded-lg p-4">
              <h4 className="text-xl font-bold mb-4">{selectedProduct.name}</h4>
              <img
                src={selectedProduct.img}
                alt={selectedProduct.name}
                className="w-full h-48 object-contain rounded-lg"
              />
              <p className="mt-4">Price: ₹{selectedProduct.price}</p>
              <p>Brand: {selectedProduct.brand}</p>
              <p>Description: {selectedProduct.description}</p>
              <Link
                to={`/product/${selectedProduct.id}`}
                className="mt-4 inline-block bg-[#202020] px-4 py-2 rounded-lg text-white hover:bg-[#303030]"
                onClick={onClose} // Close modal on click
              >
                Know More
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompareModal;
