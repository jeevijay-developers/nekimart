import React from "react";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Abhishek Yadav",
    img: "/people/1.jpg",
    text: "The cotton shirts from O'Century are perfect for everyday wear—lightweight, breathable, and they look sharp without being too formal.",
  },
  {
    name: "Vishal",
    img: "/people/2.jpg",
    text: "I’ve been living in their cotton trousers lately. Super comfortable for work-from-home and still look polished enough for stepping out.",
  },
  {
    name: "Ajit Singh",
    img: "/people/3.jpg",
    text: "It’s hard to find clothes that fit well and feel good in this weather, but O'Century nailed it. Their cotton fabric is top-notch.",
  },
  {
    name: "Keshav Kumar",
    img: "/people/4.jpg",
    text: "I appreciate brands that focus on fabric quality, and O'Century definitely delivers. The shirt feels premium and still breathable in the heat.",
  },
  {
    name: "Lakshay Saxena",
    img: "/people/5.jpg",
    text: "Subtle, stylish, and super soft—my new O'Century kurta is easily the best one in my wardrobe. Great for both casual and festive wear.",
  },
  {
    name: "George ",
    img: "/people/6.jpg",
    text: "Bought a pair of O'Century cotton trousers and they’ve easily become my everyday favorite. The fit is clean, the fabric feels light and airy, and they’re versatile enough for both work and weekend wear. You can genuinely feel the quality.",
  },
];

const Testimonials = () => {
  return (
    <div className="w-full bg-gradient-to-b from-neutral-50 to-slate-100 py-16 text-center">
      <div className="flex items-center justify-center gap-x-4 md:gap-x-7">
        {[...Array(5)].map((_, idx) => (
          <FaStar
            className="text-2xl md:text-3xl lg:text-5xl "
            key={idx}
            style={{ color: "#ffd319"}}
          />
        ))}
      </div>
      <div className="px-6 font-[lora] text-[1.75rem] md:text-[2.25rem] lg:text-[3rem] text-center">
        Testimonials
      </div>

      <div className="mt-10 px-4 md:px-20">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500 }}
          loop={true}
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index}>
              <div className="h-full flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-7 text-left shadow-sm">
                <h4 className="mb-4 font-lexend font-normal leading-relaxed text-slate-600">
                  "{t.text}"
                </h4>
                <div className="mt-4 flex items-center space-x-3">
                  <figure className="h-10 w-10 overflow-hidden rounded-full">
                    <img src={t.img} className="h-full w-full object-cover" alt={t.name} />
                  </figure>
                  <p className="font-lexend text-xl font-medium text-blue-950">
                    {t.name}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
