import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import '../pages/style/swiper.css';
// import required modules
import { EffectCards } from 'swiper/modules';
const Landing = () => {
  return (
    <div className="bg-[#00171F] min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto">
        <div className="header text-center text-white py-5">
          <h1 className="text-4xl font-black mb-4">
            Upgrade Your Career with a <br /> <span className='text-[#4CC9F0]'>Professional CV</span> – Free & Easy
          </h1>
          <h2 className="text-2xl font-light mb-6">
            Create a polished, modern CV that opens doors – no cost, no limits.{" "}
            <br />
            Tailored for executives, managers, and skilled workers.
          </h2>

          <div className="flex justify-center gap-4">
            <button className="border-2 text-[#4CC9F0] border-[#4CC9F0] px-8 py-2 font-black italic rounded-full">
              About Us
            </button>
            <button className="bg-[#4CC9F0] px-8 py-2 font-black italic rounded-full">
              Create now
            </button>
          </div>
        </div>

        <div>
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            <SwiperSlide><img src="https://www.my-resume-templates.com/wp-content/uploads/2023/05/student-resume-example.jpg" alt="" /></SwiperSlide>
            <SwiperSlide><img src="https://www.my-resume-templates.com/wp-content/uploads/2023/05/student-resume-example.jpg" alt="" /></SwiperSlide>
            <SwiperSlide><img src="https://www.my-resume-templates.com/wp-content/uploads/2023/05/student-resume-example.jpg" alt="" /></SwiperSlide>
          </Swiper>
        </div>

        {/* <div className="swiper flex ">
          <div>
            <img
              src="https://www.my-resume-templates.com/wp-content/uploads/2023/05/student-resume-example.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://resumesector.com/wp-content/uploads/2024/10/Pro-CV-Template-Free-Download-MS-Word-724x1024.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://i.pinimg.com/736x/41/7d/79/417d79e6b167de3b0cefc8330b5af540.jpg"
              alt=""
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Landing;
