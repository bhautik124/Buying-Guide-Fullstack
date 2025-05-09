import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SpotlightCard from "./animation/Card"; // Import the SpotlightCard component

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState("All");
  const [categoryIndex, setCategoryIndex] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate

  const allCategories = [
    "Smartphones",
    "Televisions",
    "Laptops",
    "Headphones",
    "Smartwatches",
    "Speakers",
    "Cameras",
    "Footwear",
    "Backpacks",
    "Kitchen Appliances",
    "Furniture",
    "Fitness",
    "Home Decor",
    "Power Banks",
  ];

  const visibleCategories = 6;

  const categories = ["trending_products", "lowest_price", "top_deals"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://mocki.io/v1/977cd685-f3b2-4355-ba69-1adf29f3fbd2"
        );

        if (response.status === 200 && response.data.products) {
          // Modify images to use local path
          const updatedProducts = response.data.products.map((product) => ({
            ...product,
            img: `/images/${product.name.replace(/\s+/g, "_")}.jpeg`, // Replace spaces with _
          }));

          setProducts({ ...response.data, products: updatedProducts });
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleCategoryClick = (category) => {
    setFilteredCategory(category);
  };

  const handlePrevClick = () => {
    setCategoryIndex((prevIndex) =>
      prevIndex === 0 ? allCategories.length - visibleCategories : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCategoryIndex((prevIndex) =>
      prevIndex === allCategories.length - visibleCategories ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="w-full min-h-screen bg-black text-white">
      {/* Categories Section */}
      <div className="flex justify-between items-center p-5">
        <button
          className={`border border-white rounded-full px-4 py-2 text-black hover:bg-white hover:text-black transition-all ${
            filteredCategory === "All" ? "bg-white text-black" : ""
          }`}
          onClick={() => handleCategoryClick("All")}
        >
          All
        </button>

        <div className="flex items-center space-x-2">
          <FaArrowLeft
            className="cursor-pointer text-white hover:text-gray-400"
            onClick={handlePrevClick}
          />
          <div className="flex space-x-2 overflow-hidden w-[600px] relative">
            <div
              className="flex space-x-2 transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${categoryIndex * 120}px)`,
              }}
            >
              {allCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleCategoryClick(category)}
                  className={`border border-white rounded-full px-4 py-2 text-white hover:bg-white hover:text-black transition-all flex-shrink-0 ${
                    filteredCategory === category ? "bg-white text-black" : ""
                  }`}
                >
                  {category}
                </button>
              ))}
              {/* Add duplicate categories for infinite scroll effect */}
              {allCategories.map((category, index) => (
                <button
                  key={`duplicate-${index}`}
                  onClick={() => handleCategoryClick(category)}
                  className={`border border-white rounded-full px-4 py-2 text-white hover:bg-white hover:text-black transition-all flex-shrink-0 ${
                    filteredCategory === category ? "bg-white text-black" : ""
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <FaArrowRight
            className="cursor-pointer text-white hover:text-gray-400"
            onClick={handleNextClick}
          />
        </div>

        <Link
          to="/"
          className="border border-white rounded-full px-4 py-2 text-white hover:bg-white hover:text-black transition-all"
        >
          Home
        </Link>
      </div>

      {/* Products Section */}
      {filteredCategory === "All" ? (
        <>
          {/* Existing sections: trending_products, lowest_price, top_deals */}
          {categories.map((category) => (
            <div key={category} className="p-10">
              <h2 className="text-3xl font-bold mb-5 text-white capitalize">
                {category.replace("_", " ")}
              </h2>
              <div className="flex overflow-x-auto space-x-5 pb-5">
                {products.categories &&
                  products.categories[category]?.map((productId) => {
                    const product = products.products.find(
                      (p) => p.id === productId
                    );
                    return (
                      <SpotlightCard
                        key={product.id}
                        className="custom-spotlight-card"
                        spotlightColor="rgba(255, 255, 255, 0.25)"
                      >
                        <div className="p-5">
                          <img
                            src={product.img}
                            alt={product.name}
                            className="w-full h-[150px] object-contain rounded-lg"
                          />
                          <h3 className="text-xl font-bold mt-3 text-center text-white">
                            {product.name}
                          </h3>
                          <p className="text-gray-700 text-center">
                            Price: ₹{product.price}
                          </p>
                          <p className="text-gray-500 text-center">
                            {product.description}
                          </p>
                          <div className="mt-3 flex justify-center">
                            <Link
                              to={`/product/${product.id}`} // Navigate to product details page
                              className="border border-white text-white rounded-full px-4 py-2 hover:bg-white hover:text-black transition-all"
                            >
                              BUY NOW
                            </Link>
                          </div>
                        </div>
                      </SpotlightCard>
                    );
                  })}
              </div>
            </div>
          ))}

          {/* New section: All Products */}
          <div className="p-10">
            <h2 className="text-3xl font-bold mb-5 text-white capitalize">
              All Products
            </h2>
            <div className="grid grid-cols-4 gap-10">
              {products.products?.map((product) => (
                <SpotlightCard
                  key={product.id}
                  className="custom-spotlight-card"
                  spotlightColor="rgba(255, 255, 255, 0.25)"
                >
                  <div className="p-5">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-[200px] object-contain rounded-lg"
                    />
                    <h3 className="text-xl font-bold mt-3 text-center text-white">
                      {product.name}
                    </h3>
                    <p className="text-gray-700 text-center">
                      Price: ₹{product.price}
                    </p>
                    <p className="text-gray-500 text-center">
                      {product.description}
                    </p>
                    <div className="mt-3 flex justify-center">
                      <Link
                        to={`/product/${product.id}`} // Navigate to product details page
                        className="border border-white text-white rounded-full px-4 py-2 hover:bg-white hover:text-black transition-all"
                      >
                        BUY NOW
                      </Link>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="p-10 grid grid-cols-4 gap-10">
          {products.products
            ?.filter((p) => p.category === filteredCategory)
            .map((product) => (
              <SpotlightCard
                key={product.id}
                className="custom-spotlight-card"
                spotlightColor="rgba(255, 255, 255, 0.25)"
              >
                <div className="p-5">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-[200px] object-contain rounded-lg"
                  />
                  <h3 className="text-xl font-bold mt-3 text-center text-white">
                    {product.name}
                  </h3>
                  <p className="text-gray-700 text-center">
                    Price: ₹{product.price}
                  </p>
                  <p className="text-gray-500 text-center">
                    {product.description}
                  </p>
                  <div className="mt-3 flex justify-center">
                    <Link
                      to={`/product/${product.id}`} // Navigate to product details page
                      className="border border-white text-white rounded-full px-4 py-2 hover:bg-white hover:text-black transition-all"
                    >
                      BUY NOW
                    </Link>
                  </div>
                </div>
              </SpotlightCard>
            ))}
        </div>
      )}
    </div>
  );
};

export default Product;
