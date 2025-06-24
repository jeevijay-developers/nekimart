import AOS from 'aos';
import 'aos/dist/aos.css'; 

const ClassicShirtCard = () => {
  const shirts = [
    {
      image: "shirts/t-shirt1.png",
      alt: "Close-up of a light blue linen shirt with wooden buttons and a label that reads 'Punekar Cotton'",
      title: "Royal blue floral",
    },
    {
      image: "shirts/t-shirt2.png",
      alt: "White formal cotton shirt neatly folded on a table",
      title: "Formal Printed Cotton",
    },
    {
      image: "shirts/t-shirt3.png",
      alt: "A patterned casual shirt hanging on a wooden hanger",
      title: "Formal Super Fine Cotton",
    },
  ];

  return (
    <div className="px-6 py-6">
      <div className="flex flex-wrap justify-center gap-4">
        {shirts.map((shirt, index) => (
          <div data-aos="fade-up" 
            key={index}
            className="relative w-full sm:w-[22rem] md:w-[26rem] lg:w-[30rem] group overflow-hidden shadow-md"
          >
            <img
              src={shirt.image}
              alt={shirt.alt}
              className="w-full h-72 sm:h-80 md:h-96 lg:h-[30rem] object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-30 transition duration-300" />
            <div className="absolute bottom-4 left-4 text-white text-xl sm:text-2xl font-[Roboto] px-2 py-1 group">
              <span className="relative font-light after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-0 after:bg-white after:transition-all after:duration-300 group-hover:after:w-full">
                {shirt.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassicShirtCard;
