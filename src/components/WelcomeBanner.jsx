import React from "react";
import { motion } from "framer-motion";

const WelcomeBanner = ({ title = "Welcome to PropertyConnect", subtitle = "We simplify your property needs" }) => {
  return (
    <div className="w-full bg-white shadow-md py-8 px-4 text-center">
      <motion.h1
        className="text-3xl md:text-4xl font-extrabold text-blue-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h1>

      <motion.p
        className="text-gray-600 mt-3 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {subtitle}
      </motion.p>

      <motion.div
        className="flex justify-center mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <img
          src="/welcome-banner.png"
          alt="Welcome Animation"
          className="w-64 md:w-96 rounded-md shadow"
        />
      </motion.div>
    </div>
  );
};

export default WelcomeBanner;
