import Card from "./Card";
import Container from "../Shared/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";

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
        <h1 className="my-3 text-3xl sm:text-4xl font-extrabold tracking-wide text-red-200 drop-shadow-md text-center mb-8">
          My Products
        </h1>

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
              <Card product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
};

export default Products;
