import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { Link } from "react-router";

const slides = [
  {
    image:
      "https://images.stockcake.com/public/9/d/5/9d5dfedc-acaf-4c5a-9ffb-92caaf2a1302_large/neon-fashion-display-stockcake.jpg",
    title: "Crafted Apparel",
    subtitle: "Refined materials with timeless character",
    cta: "Shop Now",
  },
  {
    image:
      "https://png.pngtree.com/background/20240112/original/pngtree-fashion-boutique-featuring-clothing-shoes-and-personal-accessories-with-vibrant-neon-picture-image_7236479.jpg",
    title: "Effortless Selection",
    subtitle: "Curated pieces for modern lifestyles",
    cta: "Shop Now",
  },
  {
    image:
      "https://img.freepik.com/premium-photo/high-end-fashion-boutique-latest-trends-highlighted-sophisticated-glow-neon-spotlights_308548-2918.jpg",
    title: "Designed For You",
    subtitle: "Modern fits with elevated details",
    cta: "Shop Now",
  },
];

const HeroSection = () => {
  return (
    <section className="relative h-[32vh] md:h-[40vh] text-white overflow-hidden">
      {/* Accent glows */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-purple-600/25 blur-3xl z-0" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-pink-600/25 blur-3xl z-0" />

      <Swiper
        modules={[Autoplay, Pagination, EffectCoverflow]}
        effect="coverflow"
        coverflowEffect={{
          rotate: 5,
          depth: 90,
          modifier: 1,
          slideShadows: false,
        }}
        slidesPerView={1}
        loop
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="h-full"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${s.image})` }}
            >
              <div className="relative h-full flex items-center z-10">
                <div className="max-w-7xl mx-auto px-4 md:px-28 w-full">
                  {/* Glass Content Card */}
                  <div
                    className="
                      max-w-[90%] md:max-w-xl
                      rounded-2xl md:rounded-3xl
                      bg-black/55 md:bg-white/10
                      backdrop-blur-none md:backdrop-blur-sm
                      border border-white/25
                      shadow-lg md:shadow-xl
                      p-4 md:p-8
                    "
                  >
                    <h1 className="text-xl md:text-4xl font-extrabold text-white">
                      {s.title}
                    </h1>

                    <p className="mt-2 md:mt-3 text-xs md:text-base text-gray-200 leading-relaxed">
                      {s.subtitle}
                    </p>

                    {/* Button */}
                    <Link
                      to="/allProducts"
                      className="
                        inline-flex items-center gap-2 mt-4 md:mt-5
                        px-4 py-2 md:px-6 md:py-3
                        rounded-full
                        bg-white/30 md:bg-white/20
                        backdrop-blur-none md:backdrop-blur-sm
                        border border-white/30
                        text-xs md:text-sm font-semibold text-white
                        shadow
                        hover:bg-white/40 md:hover:bg-white/30
                        transition-all
                      "
                    >
                      {s.cta}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-3.5 h-3.5 md:w-4 md:h-4"
                      >
                        <path d="M5.25 12a.75.75 0 01.75-.75h10.19l-3.72-3.72a.75.75 0 111.06-1.06l5 5a.75.75 0 010 1.06l-5 5a.75.75 0 11-1.06-1.06l3.72-3.72H6a.75.75 0 01-.75-.75z" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
