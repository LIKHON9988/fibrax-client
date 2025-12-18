import Card from "./Card";
import Container from "../Shared/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { motion } from "framer-motion";
import { Link } from "react-router";

import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Products = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["active-products"],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/active-products`
      );
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      <div className="mt-16 px-2 sm:px-0">
        <motion.h1
          className="text-2xl md:text-3xl font-extrabold tracking-tight text-purple-200 text-center mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Our Products
        </motion.h1>

        <Swiper
          effect="coverflow"
          grabCursor
          loop
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1.1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 90,
            modifier: 0.9,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product._id} className="pb-10">
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
              >
                <Card product={product} />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-8">
          <Link
            to="/allProducts"
            className="inline-block px-6 py-3 rounded-full  text-center 
              bg-gradient-to-r from-purple-600/40 to-pink-600/40
              border border-purple-300/30
              text-white text-sm font-semibold
              hover:from-purple-600/60 hover:to-pink-600/60
              transition-all"
          >
            View All Products
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Products;
