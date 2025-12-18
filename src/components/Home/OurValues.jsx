import React from "react";
import {
  FaMedal,
  FaLeaf,
  FaUsers,
  FaDraftingCompass,
  FaIndustry,
  FaCogs,
  FaTachometerAlt,
  FaEye,
  FaTag,
  FaHandshake,
} from "react-icons/fa";
import Container from "../Shared/Container";
import { motion } from "framer-motion";

const values = [
  { icon: <FaMedal />, label: "Uncompromising Quality" },
  { icon: <FaLeaf />, label: "Sustainable Production" },
  { icon: <FaUsers />, label: "Customer-First Approach" },
  { icon: <FaDraftingCompass />, label: "Design Innovation" },
  { icon: <FaIndustry />, label: "Ethical Manufacturing" },
  { icon: <FaCogs />, label: "Optimized Operations" },
  { icon: <FaTachometerAlt />, label: "Operational Efficiency" },
  { icon: <FaEye />, label: "Process Transparency" },
  { icon: <FaTag />, label: "Affordable Quality" },
  { icon: <FaHandshake />, label: "Openness & Trust" },
];

export default function OurValues() {
  return (
    <section className="relative w-full pt-28">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h2
          className="text-2xl md:text-3xl font-extrabold tracking-tight text-purple-200"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Our Values
        </motion.h2>
      </div>

      {/* Full Width Content */}
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-8 gap-x-4">
          {values.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Icon – unchanged size */}
              <div className="h-14 w-14 flex items-center justify-center rounded-full bg-emerald-50 text-purple-700 text-2xl">
                {item.icon}
              </div>

              {/* Label */}
              <p className="mt-2 text-xs font-medium text-white max-w-[120px] leading-snug">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
