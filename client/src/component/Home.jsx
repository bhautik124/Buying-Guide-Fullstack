import React from "react";
import CircularGallery from "./animation/ProductSawcase";
import Magnet from "./animation/Button";
import DecryptedText from "./animation/Text";
import Aurora from "./animation/Aurora";
import { IoHomeOutline } from "react-icons/io5";
import { MdProductionQuantityLimits } from "react-icons/md";
import { IoIosContact } from "react-icons/io";
import { Link } from "react-router-dom";

const Home = () => {
  const items = [
    {
      icon: <IoHomeOutline size={21} />,
      label: "Home",
      onClick: () => alert("Home!"),
    },
    {
      icon: <MdProductionQuantityLimits size={21} />,
      label: "Products",
      onClick: () => alert("Archive!"),
    },
    {
      icon: <IoIosContact size={21} />,
      label: "Contact us",
      onClick: () => alert("Profile!"),
    },
  ];

  return (
    <div className="w-full min-h-screen">
      {/* first section */}
      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Aurora
            colorStops={["#cfdbd5", "#e8eddf", "#f5cb5c"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>
        <div className="relative z-10 w-full h-full flex items-center justify-center text-center px-4">
          <div className="px-8 py-6 rounded-lg">
            <h1 className="font-extrabold leading-tight text-white">
              <span className="block text-[14vw] leading-none">SHOP</span>
              <span className="block text-[14vw] leading-none">THE BEST</span>
            </h1>
            <p className="text-2xl lg:text-3xl text-white mt-4 max-w-3xl mx-auto">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim,
              odio!
            </p>
          </div>
        </div>
      </div>

      {/* second section */}
      <div className="w-full h-screen flex flex-col items-center justify-end mt-[-5%] pb-10">
        <div style={{ height: "600px", position: "relative", width: "100%" }}>
          <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
        </div>

        <Magnet
          padding={50}
          disabled={false}
          magnetStrength={5}
          wrapperClassName="border border-white p-4 text-white rounded-lg cursor-pointer"
        >
          <Link to="/product">
            <p>Browse Products!</p>
          </Link>
        </Magnet>
      </div>

      {/* third section */}
      <div className="w-full h-screen text-white flex flex-col justify-center items-center font-bold text-5xl md:text-7xl lg:text-9xl relative overflow-hidden">
        <div className="text-center leading-none text-9xl">
          <div>
            <DecryptedText
              text="CONTACT US"
              animateOn="view"
              revealDirection="center"
            />
          </div>
        </div>
        <div className="absolute bottom-10 w-full flex justify-between px-10 text-sm md:text-lg">
          <span className="underline">PROJECT INQUIRIES</span>
          <span className="underline">LEE@SIENA.FILM</span>
          <span className="underline">PHONE NUMBER</span>
          <span className="underline">+972-54-2804049</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
