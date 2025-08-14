import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LocationCard from '../components/LocationCard';
import LemonGame from '../components/LemonGame';
import LemonadeCustomizer from '../components/LemonadeCustomizer';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const HomePage = () => {
  // Sample location data
  const upcomingLocations = [
    {
      id: 1,
      name: 'Downtown Holy Sips Pop-up',
      address: '123 Main Street, Downtown',
      date: '2024-02-15',
      time: '10:00 AM - 4:00 PM',
      description: 'Join us for refreshing lemonade and fellowship in the heart of downtown!',
      isUpcoming: true,
      coordinates: { lat: 34.0522, lng: -118.2437 }
    },
    {
      id: 2,
      name: 'College Campus Outreach',
      address: 'University Plaza, Building A',
      date: '2024-02-22',
      time: '11:00 AM - 5:00 PM',
      description: 'Bringing lemonade and the Word to students. Special worship session at 2 PM!',
      isUpcoming: true,
      coordinates: { lat: 34.0187, lng: -118.4934 }
    },
    {
      id: 3,
      name: 'Beachside Ministry',
      address: 'Oceanview Beach, Pier 7',
      date: '2024-03-01',
      time: '12:00 PM - 6:00 PM',
      description: 'Refreshing beachgoers with cold lemonade and warm fellowship by the ocean.',
      isUpcoming: true,
      coordinates: { lat: 34.0201, lng: -118.4951 }
    }
  ];



  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <Hero />
      
      {/* Upcoming Locations Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto bg-gray-50">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Locations</h2>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {upcomingLocations.map((location, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="transform scale-90"
            >
              <LocationCard location={location} />
            </motion.div>
          ))}
        </motion.div>
      </section>
      
      {/* Prayer Request Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Join Our Prayer Community</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              "Therefore confess your sins to each other and pray for each other so that you may be healed. 
              The prayer of a righteous person is powerful and effective." - James 5:16
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Prayer showcase */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange to-lemonYellow rounded-full flex items-center justify-center">
                    <span className="text-2xl">🙏</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-800">Submit Prayer Requests</h3>
                    <p className="text-sm text-gray-600">Share your heart with our community</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  Whether you're facing challenges, celebrating blessings, or seeking guidance, 
                  our community is here to lift you up in prayer.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-limeGreen to-blue-400 rounded-full flex items-center justify-center">
                    <span className="text-2xl">💬</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-800">Community Support</h3>
                    <p className="text-sm text-gray-600">Connect through prayer and encouragement</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  Read and respond to others' prayer requests, offering words of comfort, 
                  encouragement, and letting them know they're not alone.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-800">Biblical AI Assistant</h3>
                    <p className="text-sm text-gray-600">Get spiritual guidance anytime</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  Chat with our AI assistant for biblical wisdom, scripture references, 
                  and spiritual encouragement whenever you need it.
                </p>
              </div>
            </motion.div>
            
            {/* Right side - Call to action */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange to-lemonYellow rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4">
                    <span className="text-4xl">✨</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Ready to Share Your Heart?
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Join our loving community where every prayer matters. Whether you need support 
                    or want to encourage others, your voice makes a difference.
                  </p>
                </div>
                
                <Link 
                  to="/prayer"
                  className="inline-block w-full"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-orange to-lemonYellow text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                  >
                    Visit Prayer Requests Page
                  </motion.button>
                </Link>
                
                <p className="text-sm text-gray-500 mt-4">
                  Submit requests • Read community prayers • Get biblical guidance
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Fun & Games Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Fun & Games</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Create your perfect lemonade mix and play our lemon runner game! 
            Design custom flavors, unlock secret combinations, and compete for high scores.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
          {/* Lemonade Customizer - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-2"
          >
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">🍋 Lemonade Customizer</h3>
              <p className="text-gray-600 text-sm">
                Mix flavors, see real-time color changes, and get QR codes for your custom drinks!
              </p>
            </div>
            <LemonadeCustomizer />
          </motion.div>
          
          {/* Lemon Runner Game - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-4"
          >
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">🎮 Lemon Runner</h3>
              <p className="text-gray-600 text-sm">
                Jump and collect lemons to win discounts on our merchandise!
              </p>
            </div>
            <LemonGame />
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;