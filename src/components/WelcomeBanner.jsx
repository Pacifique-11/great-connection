// src/components/WelcomeBanner.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiShield, FiTrendingUp } from "react-icons/fi";

const WelcomeBanner = ({ 
  title = "Welcome to Great Connection Ltd", 
  subtitle = "Your trusted partner for premium real estate and vehicle trading in Rwanda." 
}) => {
  return (
    <div className="w-full bg-gradient-to-r from-emerald-900 via-green-800 to-teal-900 text-white shadow-xl py-12 px-6 md:px-16 relative overflow-hidden">
      {/* Background Decorative Glow Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
        
        {/* Text and CTA Content */}
        <div className="text-left space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 text-xs font-semibold tracking-wide"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Verified Properties & Vehicles in Kigali
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {title}
          </motion.h1>

          <motion.p
            className="text-gray-200 text-base md:text-lg leading-relaxed max-w-xl font-normal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-4 pt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Link
              to="/create-request-property"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-green-500/25 transition-all duration-200 text-sm"
            >
              <span>Explore Listings</span>
              <FiArrowRight size={16} />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl border border-white/20 backdrop-blur-md transition-all duration-200 text-sm"
            >
              <span>Contact Us</span>
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div 
            className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <FiShield className="text-green-400 text-base shrink-0" />
              <span>100% Verified Assets & Titles</span>
            </div>
            <div className="flex items-center gap-2">
              <FiTrendingUp className="text-green-400 text-base shrink-0" />
              <span>Transparent Investment Deals</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Image / Illustration Animation Section */}
        <motion.div
          className="flex justify-center md:justify-end"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-2">
            <img
              src="/welcome-banner.png"
              alt="Great Connection Assets"
              className="w-full h-72 sm:h-80 object-cover rounded-xl shadow-inner transform hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800';
              }}
            />
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default WelcomeBanner;