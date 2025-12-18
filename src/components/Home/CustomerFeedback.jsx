import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";

const CustomerFeedback = () => {
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/reviews`);
      return res.data;
    },
    staleTime: 60 * 1000,
  });

  return (
    <section className="px-4  md:py-7 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <motion.h2
            className="text-2xl pt-20 md:text-3xl font-extrabold tracking-tight text-purple-200"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            What Our Customers Say
          </motion.h2>
          <motion.p
            className="mt-2 text-sm md:text-base text-gray-300"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
          >
            Real feedback from people who love our products
          </motion.p>
        </div>

        {isLoading && (
          <div className="flex justify-center py-10">
            <div className="h-6 w-6 border-2 border-purple-300/40 border-t-purple-400 rounded-full animate-spin" />
          </div>
        )}

        {!isLoading && (
          <Swiper
            effect="coverflow"
            loop
            grabCursor
            autoplay={{ delay: 1500, disableOnInteraction: false }}
            spaceBetween={12} // smaller spacing between slides
            slidesPerView={1.2} // smaller cards by showing part of next slide
            breakpoints={{
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3 },
            }}
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 90,
              modifier: 0.9,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="mySwiper"
          >
            {reviews.map((r, idx) => {
              const name = r?.name || r?.customer_name || "Anonymous";
              const email = r?.email || r?.customer_email || "";
              const avatar = r?.image || r?.avatar;
              const comment =
                r?.comment || r?.text || r?.feedback || "No comment provided.";
              const rating = Number(r?.rating || 0);
              const product = r?.product || r?.product_name || r?.name || "";

              return (
                <SwiperSlide key={r?._id || idx} className="pb-8">
                  <motion.div
                    className="h-[200px] rounded-2xl bg-white/10 backdrop-blur-2xl border border-purple-300/20 shadow-2xl p-4 flex flex-col"
                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full border border-purple-300/30 bg-purple-600/40 overflow-hidden flex items-center justify-center text-white">
                        {avatar ? (
                          <img
                            src={avatar}
                            alt={name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-sm font-semibold">
                            {String(name).slice(0, 1).toUpperCase()}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="text-purple-200 font-semibold truncate">
                          {name}
                        </div>
                        {email && (
                          <div className="text-gray-400 text-xs truncate">
                            {email}
                          </div>
                        )}
                      </div>

                      <div className="ml-auto flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`w-3 h-3 ${
                              i < rating ? "text-yellow-300" : "text-gray-500"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Comment */}
                    <div className="mt-3 text-sm text-gray-200 line-clamp-3 flex-1">
                      {comment}
                    </div>

                    {/* Product */}
                    {product && (
                      <div className="mt-2 text-xs text-gray-400 mt-auto">
                        Related Product:{" "}
                        <span className="text-purple-200">{product}</span>
                      </div>
                    )}
                  </motion.div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default CustomerFeedback;
