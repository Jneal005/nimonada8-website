import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-lemonYellow to-limeGreen py-20">
      {/* Background Wave Animation */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-20"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut"
        }}
      >
        <svg viewBox="0 0 1440 320" className="w-full h-full">
          <path 
            fill="#FF9800" 
            fillOpacity="1" 
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,149.3C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Bible Verse Banner */}
        <motion.div 
          className="bg-white/90 p-4 rounded-lg shadow-lg mb-12 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg md:text-xl font-semibold text-gray-800">
            "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit." - Matthew 28:19
          </p>
        </motion.div>

        {/* Main Hero Content */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="md:w-1/2 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Holy Sips Lemonade
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-orange mb-6">
              SIP THE MISSION, SHARE THE VISION
            </p>
            <p className="text-lg text-gray-800 mb-8">
              Refreshing lemonade with a purpose. Join us in our mission to spread joy and faith through every sip.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button 
                className="bg-orange hover:bg-orange/90 text-white px-6 py-3 rounded-lg font-medium text-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Find Us Today
              </motion.button>
              <Link to="/menu">
                <motion.button 
                  className="bg-white hover:bg-gray-100 text-orange border-2 border-orange px-6 py-3 rounded-lg font-medium text-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Our Menu
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="relative">
              <div className="bg-white p-2 rounded-full shadow-xl">
                <div className="bg-lemonYellow rounded-full p-8 aspect-square flex items-center justify-center">
                  <span className="text-9xl">🍋</span>
                </div>
              </div>
              <motion.div 
                className="absolute -top-4 -right-4 bg-coral text-white text-lg font-bold px-4 py-2 rounded-full shadow-lg"
                animate={{
                  rotate: [0, -5, 5, -5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut"
                }}
              >
                Fresh Daily!
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;