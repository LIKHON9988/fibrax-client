import React from "react";
import {
  FaShoppingCart,
  FaClipboardList,
  FaCogs,
  FaShippingFast,
} from "react-icons/fa";
import Container from "../Shared/Container";
import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    icon: <FaShoppingCart />,
    title: "Place Order",
    desc: "Buyers place orders with defined quantity, pricing, and payment terms.",
  },
  {
    step: "02",
    icon: <FaClipboardList />,
    title: "Order Review",
    desc: "Orders are reviewed, confirmed, and scheduled for production.",
  },
  {
    step: "03",
    icon: <FaCogs />,
    title: "Production",
    desc: "Manufacturing runs through cutting, sewing, finishing, and QC stages.",
  },
  {
    step: "04",
    icon: <FaShippingFast />,
    title: "Delivery",
    desc: "Products are packed, shipped, and delivered with tracking support.",
  },
];

export default function HowItWorks() {
  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08, when: "beforeChildren" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 18 },
    },
  };

  return (
    <section className="relative w-11/12 mx-auto md:w-full py-20 ">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px " />

      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            className=" text-2xl md:text-3xl font-extrabold tracking-tight text-purple-200"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 110, damping: 16 }}
          >
            How It Works
          </motion.h2>
          <motion.p
            className=" text-gray-400 mt-2"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 110, damping: 18, delay: 0.05 }}
          >
            A structured, transparent workflow designed for scalable garment
            production.
          </motion.p>
        </div>

        {/* Steps Row */}
        <motion.div
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((item, index) => (
            <motion.div
              key={index}
              className="relative rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-400/40 transition"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Step Number */}
              <span className="absolute -top-4 -right-4 h-10 w-10 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold shadow-lg">
                {item.step}
              </span>

              {/* Icon */}
              <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-purple-600/20 text-purple-300 text-2xl mb-6">
                {item.icon}
              </div>

              {/* Content */}
              <h4 className="text-lg font-semibold text-white mb-1">
                {item.title}
              </h4>
              <p className="text-gray-400 text-[13px] leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
