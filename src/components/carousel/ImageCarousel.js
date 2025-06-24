import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef } from "react";
import {
  IoChevronBackOutline,
  IoChevronForward,
  IoChevronForwardOutline,
} from "react-icons/io5"; // requires a loader
import { Autoplay, Controller, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

const ImageCarousel = ({ images, handleChangeImage }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="w-1/2 relative">
      <button
        ref={prevRef}
        className="absolute top-1/2 -translate-y-1/2 left-[-30px] z-10 transform bg-white p-2 rounded-full shadow "
      >
        {" "}
        <IoChevronBackOutline size={24} />
      </button>
      <button
        ref={nextRef}
        className="absolute top-1/2 right-[-30px] z-10 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
      >
        <IoChevronForwardOutline size={24} />
      </button>
      <Swiper
        spaceBetween={1}
        // navigation={true}
        allowTouchMove={false}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        slidesPerView={2}
        modules={[Autoplay, Navigation, Pagination, Controller]}
        className="mySwiper image-carousel"
        onBeforeInit={(swiper) => {
          if (typeof swiper.params.navigation !== "boolean") {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
      >
        {images?.map((img, i) => (
          <SwiperSlide key={i + 1} className="group">
            <button onClick={() => handleChangeImage(img)}>
              <Image
                className="border inline-flex items-center justify-center  mt-2 overflow-hidden rounded-2xl p-2 object-contain"
                src={img}
                alt="product"
                width={100}
                height={100}
              />
            </button>
          </SwiperSlide>
        ))}
        {/* <button ref={prevRef} className="prev">
          <IoChevronBackOutline />
        </button>
        <button ref={nextRef} className="next">
          <IoChevronForward />
        </button> */}
      </Swiper>
    </div>
  );
};

export default dynamic(() => Promise.resolve(ImageCarousel), { ssr: false });
