import React, { useState } from "react";
import axios from "axios";

const AIHelpModal = ({ product, isAIOpen, setIsAIOpen }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [aiResponse, setAIResponse] = useState("");

  const handleAIClick = async (question) => {
    setSelectedQuestion(question);
    const prompt = `${question} for ${product.name} in one short sentence`;
    try {
      const response = await axios.post(
        "http://localhost:3000/api/ai/suggest",
        {
          prompt,
        }
      );
      const shortResponse = response.data.response.split(".")[0];
      setAIResponse(shortResponse);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAIResponse("Failed to fetch AI response.");
    }
  };

  const resetAI = () => {
    setSelectedQuestion(null);
    setAIResponse("");
  };

  const categoryQuestions = {
    Smartphones: [
      "Does this phone support 5G?",
      "What is the battery backup of this phone?",
      "Is the display AMOLED or LCD?",
      "Which processor does this smartphone have?",
      "Does it support wireless charging?",
      "Is this phone good for gaming?",
    ],
    Televisions: [
      "Does this TV support 4K resolution?",
      "Is this a smart TV with built-in apps?",
      "What is the refresh rate of this TV?",
      "Does it have Dolby Atmos support?",
      "Can I connect Bluetooth headphones to this TV?",
      "Does it come with a wall mount?",
    ],
    Laptops: [
      "Is this laptop good for video editing?",
      "What is the RAM and SSD capacity?",
      "Does this laptop have a dedicated graphics card?",
      "How long does the battery last on a full charge?",
      "Does it come with pre-installed Windows?",
      "Is the keyboard backlit?",
    ],
    Headphones: [
      "Does this headphone support active noise cancellation?",
      "Are these headphones wireless or wired?",
      "How long does the battery last on a full charge?",
      "Does it have a built-in microphone for calls?",
      "Is it compatible with both Android and iOS?",
      "Are these headphones sweatproof for workouts?",
    ],
    Smartwatches: [
      "Does this smartwatch have GPS tracking?",
      "Is it compatible with iPhones?",
      "Does this watch have a heart rate monitor?",
      "Can I make calls using this smartwatch?",
      "Is the strap replaceable?",
      "What is the battery life of this smartwatch?",
    ],
    Speakers: [
      "Is this speaker waterproof?",
      "What is the battery life of this Bluetooth speaker?",
      "Does it support stereo pairing?",
      "How is the bass quality of this speaker?",
      "Can I connect it via AUX cable?",
      "Does this speaker support voice assistant integration?",
    ],
    Cameras: [
      "Is this camera good for low-light photography?",
      "Does it support 4K video recording?",
      "What is the optical zoom range?",
      "Is this DSLR mirrorless or traditional?",
      "Does it come with a lens kit?",
      "Is this camera weatherproof?",
    ],

    Footwear: [
      "Are these shoes suitable for running?",
      "Is this material breathable?",
      "Are these waterproof shoes?",
      "What is the return and exchange policy?",
      "Do these shoes have memory foam insoles?",
      "Are these true to size?",
    ],
    Backpacks: [
      "Is this backpack waterproof?",
      "Does it have a separate laptop compartment?",
      "How many liters is this backpack?",
      "Is this backpack suitable for travel?",
      "What material is used for durability?",
      "Are the straps adjustable and padded?",
    ],

    KitchenAppliances: [
      "Does this microwave have convection mode?",
      "What is the power consumption of this induction cooktop?",
      "Is this mixer grinder suitable for heavy-duty use?",
      "Does this kettle have an automatic shut-off feature?",
      "Is the air fryer truly oil-free?",
      "What is the capacity of this rice cooker?",
    ],
    Furniture: [
      "Is this chair ergonomic?",
      "Does this sofa come with storage space?",
      "What is the material of this table?",
      "Is assembly required for this bed?",
      "Does this office chair have adjustable lumbar support?",
      "Is this furniture termite-resistant?",
    ],
    Fitness: [
      "Is this treadmill foldable?",
      "Does this dumbbell set have adjustable weights?",
      "What is the resistance level of this exercise bike?",
      "Is this yoga mat slip-resistant?",
      "Does this skipping rope have adjustable length?",
      "Is this gym equipment suitable for beginners?",
    ],
    HomeDecor: [
      "Is this lamp rechargeable?",
      "Does this wall clock have silent movement?",
      "Are these curtains blackout?",
      "Are these decorative lights waterproof?",
      "What material is this painting frame made of?",
      "Is this vase ceramic or plastic?",
    ],
    PowerBanks: [
      "What is the battery capacity of this power bank?",
      "Does this power bank support fast charging?",
      "How many devices can be charged at once?",
      "Does it come with a charging cable?",
      "Is this power bank allowed in flights?",
      "How long does it take to fully charge this power bank?",
    ],
  };

  return (
    isAIOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-10">
        <div className="bg-[#101110] rounded-lg p-8 w-full max-w-4xl relative">
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setIsAIOpen(false)}
          >
            &times;
          </button>
          <h3 className="text-2xl font-bold mb-4">AI Help</h3>
          <div className="flex flex-col space-y-4">
            {!selectedQuestion && (
              <div className="space-y-4">
                {categoryQuestions[product.category]?.map((question, index) => (
                  <button
                    key={index}
                    className="w-full bg-[#202020] px-4 py-2 rounded-lg text-xl hover:bg-[#303030]"
                    onClick={() => handleAIClick(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {selectedQuestion && (
              <div className="flex flex-col space-y-4">
                <div className="flex justify-end">
                  <div className="bg-[#202020] px-4 py-2 rounded-lg text-xl max-w-[70%]">
                    {selectedQuestion}
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-[#202020] px-4 py-2 rounded-lg text-xl max-w-[70%]">
                    {aiResponse}
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    className="bg-[#202020] px-4 py-2 rounded-lg text-xl hover:bg-[#303030]"
                    onClick={resetAI}
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default AIHelpModal;
