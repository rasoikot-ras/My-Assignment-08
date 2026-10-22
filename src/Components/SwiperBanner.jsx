"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function SwiperBanner() {
  return (
    <div className="w-full rounded-2xl overflow-hidden my-4 border">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="h-80"
      >
        <SwiperSlide className="bg-gray-900 text-white flex flex-col justify-center items-center p-8 text-center">
          <h2 className="text-3xl font-black mb-2">Explore Digital Library</h2>
          <p className="text-sm text-gray-300 max-w-md">Borrow your favorite story, tech, and science books instantly.</p>
        </SwiperSlide>
        <SwiperSlide className="bg-black text-white flex flex-col justify-center items-center p-8 text-center">
          <h2 className="text-3xl font-black mb-2">Read Anytime, Anywhere</h2>
          <p className="text-sm text-gray-300 max-w-md">Seamless management and secure user authentication with BetterAuth.</p>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}