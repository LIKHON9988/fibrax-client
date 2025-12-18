import React from "react";
import hero from "../../assets/images/hero4.jpg";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Container from "../Shared/Container";

const HeroSection = () => {
  return (
    <section className="relative h-[40vh] md:h-[60vh] w-full text-white overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60"></div>
      </div>

      {/* Decorative Glows */}
      <div className="absolute -top-12 -left-12 w-40 h-40 md:w-72 md:h-72 bg-purple-600/30 blur-3xl z-10 animate-pulse-slow"></div>
      <div className="absolute -bottom-12 -right-12 w-40 h-40 md:w-72 md:h-72 bg-pink-500/30 blur-3xl z-10 animate-pulse-slow"></div>

      {/* Content slightly right from left edge */}
      <Container>
        {" "}
        <div className="relative pt-36 z-20 flex flex-col justify-center h-full  md:px-16 max-w-sm md:max-w-xl">
          {/* Heading */}
          <motion.h1
            className="text-xl md:text-4xl font-extrabold tracking-tight"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 60 }}
          >
            Powering Smarter Garment Production
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="mt-1 md:mt-4 text-xs md:text-lg text-gray-200 leading-relaxed"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 50 }}
          >
            Simplify production management and gain real-time visibility from
            order placement to final delivery.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="mt-2 md:mt-6"
            initial={{ opacity: 0, x: -70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, type: "spring", stiffness: 40 }}
          >
            <Link
              to="/allProducts"
              className="px-3 py-2 md:px-6 md:py-3 rounded-3xl bg-white/20 backdrop-blur-sm border border-white/30 text-xs md:text-white font-semibold hover:bg-white/30 transition-all"
            >
              Shop the Collection
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
