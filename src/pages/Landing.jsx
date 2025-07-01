import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { motion, AnimatePresence } from "framer-motion";
import "../pages/style/swiper.css";
import { EffectCards } from "swiper/modules";
import { Link } from "react-router-dom";

const Landing = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (e.g., fetching assets)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#FFFFFF] min-h-screen max-h-screen max-w-screen relative overflow-hidden ">
      {/* <div className="bg-[#FFFFFF] min-h-screen flex items-center justify-center overflow-hidden relative"> */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:items-center px-4 md:px-0"
      >
        {/* LEFT SECTION */}
        <div className="flex flex-col z-20 justify-between gap-8 md:gap-12 p-4 md:p-8 min-h-[60vh] md:min-h-screen max-h-full">
          <div>
            <img className="w-14" src="./logo.png" alt="" />
          </div>
          <div className="text-center sm:text-start">
            <p className="space-mono-regular text-base md:text-lg">
              Welcome to Our CV Creator
            </p>
            <h1 className="2xl:text-6xl xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-3xl uppercase mb-4 overflow-hidden anton-regular">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <span>Upgrade Your Career with</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <span> a Professional CV</span> <br />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -300 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <span> –- Free & Easy</span>
              </motion.div>
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex py-2 sm:py-0 sm:hidden justify-center items-center"
            >
              <img
                src="/cv/cv1.webp"
                alt=""
                className="w-3/4 h-auto rounded shadow-lg "
              />
              {/* Loading... */}
            </motion.div>

            <Link to={"/homepage"}>
              <button className="bg-black py-3 px-8 w-full sm:w-auto mt-2">
                <span className="bg-black text-white rounded anton-regular btn-shine">
                  Get Started
                </span>
              </button>
            </Link>
          </div>
          <div className="hidden md:block"></div>
          <div>
            <p className="font-light mb-6 space-mono-regular w-full md:w-3/4 text-sm md:text-base">
              Create a polished, modern CV that opens doors – no cost, no
              limits. Tailored for executives, managers, and skilled workers.
            </p>
          </div>
        </div>

        {/* RIGHT GALLERY SECTION */}

        <div className="gallery  absolute flex w-full h-full top-[100px] right-[-100px] sm:w-1/2 sm:right-0 sm:top-0 gap-2 rotate-45 overflow-hidden md:gap-4 h-screen opacity-25 sm:opacity-75 max-h-full   md:max-h-screen md:overflow-visible pb-4 md:pb-0 ">
          {/* Column 1 */}
          <motion.div
            initial={{ opacity: 0, y: -300 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="min-w-[120px] md:min-w-0"
          >
            <div className="flex flex-col gap-2 md:gap-4 mt-[-100px] md:mt-[-300px]">
              <img
                src="/cv/cv1.webp"
                alt=""
                className="w-24 md:w-32 lg:w-40 xl:w-48 h-auto rounded shadow"
              />
              <img
                src="/cv/cv2.webp"
                alt=""
                className="w-24 md:w-32 lg:w-40 xl:w-48 h-auto rounded shadow"
              />
              <img
                src="/cv/cv3.webp"
                alt=""
                className="w-24 md:w-32 lg:w-40 xl:w-48 h-auto rounded shadow"
              />
              <img
                src="/cv/cv4.webp"
                alt=""
                className="w-24 md:w-32 lg:w-40 xl:w-48 h-auto rounded shadow"
              />
            </div>
          </motion.div>

          {/* Column 2 */}
          <motion.div
            initial={{ opacity: 0, y: 300 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="min-w-[120px] md:min-w-0"
          >
            <div className="flex flex-col gap-2 md:gap-4 mt-[-50px] md:mt-[-150px]">
              <img
                src="/cv/cv5.webp"
                alt=""
                className="w-24 md:w-32 lg:w-40 xl:w-48 h-auto rounded shadow"
              />
              <img
                src="/cv/cv6.webp"
                alt=""
                className="w-24 md:w-32 lg:w-40 xl:w-48 h-auto rounded shadow"
              />
              <img
                src="/cv/cv7.webp"
                alt=""
                className="w-24 md:w-32 lg:w-40 xl:w-48 h-auto rounded shadow"
              />
              <img
                src="/cv/cv8.webp"
                alt=""
                className="w-24 md:w-32 lg:w-40 xl:w-48 h-auto rounded shadow"
              />
            </div>
          </motion.div>

          {/* Column 3 */}
          <motion.div
            initial={{ opacity: 0, y: -500 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="min-w-[120px] md:min-w-0"
          >
            <div className="flex flex-col gap-2 md:gap-4">
              <img
                src="/cv/cv9.webp"
                alt=""
                className="w-24 md:w-32 lg:w-40 xl:w-48 h-auto rounded shadow"
              />
              <img
                src="/cv/cv1.webp"
                alt=""
                className="w-24 md:w-32 lg:w-40 xl:w-48 h-auto rounded shadow"
              />
              <img
                src="/cv/cv2.webp"
                alt=""
                className="w-24 md:w-32 lg:w-40 xl:w-48 h-auto rounded shadow"
              />
              <img
                src="/cv/cv3.webp"
                alt=""
                className="w-24 md:w-32 lg:w-40 xl:w-48 h-auto rounded shadow"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Landing;
