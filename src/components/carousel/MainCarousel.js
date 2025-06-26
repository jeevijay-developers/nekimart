import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Controller, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

//internal import

import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";

const MainCarousel = () => {
  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue, showingUrl, showingImage } =
    useUtilsFunction();

  const sliderData = [
    {
      id: 1,
      url: showingUrl(storeCustomizationSetting?.slider?.first_link),
      image:
        showingImage(storeCustomizationSetting?.slider?.first_img) ||
        "/slider/slider-1.jpg",
    },
    {
      id: 2,
      url: showingUrl(storeCustomizationSetting?.slider?.second_link),
      image:
        showingImage(storeCustomizationSetting?.slider?.second_img) ||
        "/slider/slider-2.jpg",
    },
    {
      id: 3,
      url: showingUrl(storeCustomizationSetting?.slider?.third_link),
      image:
        showingImage(storeCustomizationSetting?.slider?.third_img) ||
        "/slider/slider-3.jpg",
    },
    {
      id: 4,
      url: showingUrl(storeCustomizationSetting?.slider?.four_link),
      image:
        showingImage(storeCustomizationSetting?.slider?.four_img) ||
        "/slider/slider-1.jpg",
    },
    {
      id: 5,
      url: showingUrl(storeCustomizationSetting?.slider?.five_link),
      image:
        showingImage(storeCustomizationSetting?.slider?.five_img) ||
        "/slider/slider-2.jpg",
    },
  ];

  return (
    <>
      <div className="relative">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
            hideOnClick: true,
            dynamicBullets: true,
          }}
          navigation={{
            enabled: true,
            nextEl: ".custom-swiper-button-next",
            prevEl: ".custom-swiper-button-prev",
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {sliderData?.map((item, i) => (
            <SwiperSlide
              className="w-full relative overflow-hidden"
              key={i + 1}
            >
              <div className="relative w-full h-[250px] sm:h-[320px] md:h-[380px] lg:h-[450px]">
                <img
                  src={item.image || "/slider/slider-1.jpg"}
                  alt={item.title || "Slider Image"}
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                  style={{ imageRendering: "auto" }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom navigation buttons */}
        <div className="custom-swiper-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-40 bg-transparent border border-gray-300 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105 hover:bg-gradient-to-b hover:from-black/20 hover:to-black/40">
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>

        <div className="custom-swiper-button-next absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-40 bg-transparent border border-gray-300 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105 hover:bg-gradient-to-b hover:from-black/20 hover:to-black/40">
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>

        {/* Custom pagination container */}
        <div className="swiper-pagination"></div>
      </div>

      <style jsx>{`
        .custom-swiper-button-prev:hover,
        .custom-swiper-button-next:hover {
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        /* Hide default swiper navigation buttons */
        .swiper-button-next,
        .swiper-button-prev {
          display: none !important;
        }

        /* Custom pagination styling */
        .swiper-pagination {
          bottom: 20px !important;
        }

        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.7) !important;
          opacity: 1 !important;
        }

        .swiper-pagination-bullet-active {
          background: white !important;
        }

        /* Responsive hide buttons on very small screens */
        @media (max-width: 480px) {
          .custom-swiper-button-prev,
          .custom-swiper-button-next {
            width: 10px;
            height: 10px;
          }

          .custom-swiper-button-prev svg,
          .custom-swiper-button-next svg {
            width: 4px;
            height: 4px;
          }
        }
      `}</style>
    </>
  );
};

export default MainCarousel;
