"use client"
import React from 'react';
import ShirtImages from './ShirtImages';
import { useRouter } from 'next/navigation';

const ShirtGallery = () => {
  const router = useRouter()
  return (
    <div
      data-aos="fade-right"
      data-aos-duration="1000"
      className="flex flex-col md:flex-row justify-between items-center max-w-3xl md:max-w-5xl lg:max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16"
    >
      {/* Left Section */}
      <div className="w-full md:w-1/2 text-center md:text-left mb-12 md:mb-0">
        <p className="text-gray-500 text-lg sm:text-xl mb-2">
          Give the gift that gives comfort
        </p>
        <h2 className="px-6 md:px-0 font-[lora] text-[1.75rem] md:text-[2.25rem] lg:text-[3rem] text-center md:text-start my-7">
          Comfortable Shirts
        </h2>
        <p className="text-gray-700 text-lg sm:text-[22px] mb-6">
          We are launching our new collection of cotton shirts at affordable
          rates.
        </p>
        <button
          className="bg-black text-white px-6 sm:px-8 py-3 rounded-md text-sm font-semibold hover:bg-gray-800 transition"
          onClick={() =>
            router.push(
              "/search?category=a-men-s-cotton-shirt-&_id=67fe0b82f18106004633a7e0"
            )
          }
        >
          SHOP NOW
        </button>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2">
        <ShirtImages />
      </div>
    </div>
  );
};

export default ShirtGallery;
