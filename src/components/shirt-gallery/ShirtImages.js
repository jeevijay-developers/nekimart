export default function ShirtImages() {
  return (
    <div data-aos="fade-left" data-aos-duration="1000" className="relative w-full max-w-6xl mx-auto py-12 px-4">
      {/* Main Image Container */}
      <div className="relative h-[450px] sm:h-[450px] w-full">
        {/* Image 1 */}
        <div className="absolute top-6 left-4 w-40 h-56 sm:top-10 sm:left-10 sm:w-56 sm:h-72 rounded-xl overflow-hidden shadow-lg z-20 rotate-[-2deg] sm:rotate-[-3deg]">
          <img
            src="/shirts/shirt1.jpeg"
            alt="Black White Printed Shirt"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Image 2 */}
        <div className="absolute top-40 right-2 w-48 h-64 sm:top-32 sm:right-12 sm:w-64 sm:h-80 rounded-xl overflow-hidden shadow-2xl z-30 rotate-[1deg] sm:rotate-[2deg]">
          <img
            src="/shirts/shirt2.jpg"
            alt="Black and Maroon Shirts"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Image 3 - Hidden on mobile */}
        <div className="hidden lg:block absolute top-0 right-0 w-52 h-68 rounded-xl overflow-hidden shadow-md z-10 rotate-[5deg]">
          <img
            src="/shirts/shirt3.jpg"
            alt="White Shirt"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Image 4 - Hidden on mobile */}
        <div className="hidden lg:block absolute bottom-14 left-24 w-60 h-72 rounded-xl overflow-hidden shadow-xl z-20 rotate-[-4deg]">
          <img
            src="/shirts/shirt4.jpeg"
            alt="Maroon Shirt Closeup"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
