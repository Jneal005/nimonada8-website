import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LocationCard from '../components/LocationCard';
import PrayerRequestForm from '../components/PrayerRequestForm';
import LemonGame from '../components/LemonGame';

const HomePage = () => {
  // Sample location data
  const locations = [
    {
      id: 1,
      name: 'Downtown Limonada Pop-up',
      address: '123 Main Street, Downtown',
      date: '2023-07-15',
      time: '10:00 AM - 4:00 PM',
      description: 'Join us for refreshing lemonade and fellowship in the heart of downtown!',
      status: 'upcoming',
      coordinates: { lat: 34.0522, lng: -118.2437 }
    },
    {
      id: 2,
      name: 'Beach Outreach',
      address: 'Oceanview Beach, Pier 7',
      date: '2023-07-22',
      time: '11:00 AM - 5:00 PM',
      description: 'Bringing lemonade and the Word to beachgoers. Special music performance at 2 PM!',
      status: 'upcoming',
      coordinates: { lat: 34.0187, lng: -118.4934 }
    },
    {
      id: 3,
      name: 'Community Center',
      address: '456 Park Avenue, Midtown',
      date: '2023-07-08',
      time: '9:00 AM - 3:00 PM',
      description: 'We had a wonderful time serving the community and sharing God\'s love through refreshments and conversation.',
      status: 'past',
      coordinates: { lat: 34.0611, lng: -118.3011 }
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
      
      {/* Locations Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Where to Find Us</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're bringing refreshment and the Word to various locations. 
            Check out where we'll be serving next!
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {locations.map(location => (
            <motion.div key={location.id} variants={itemVariants}>
              <LocationCard location={location} />
            </motion.div>
          ))}
        </motion.div>
      </section>
      
      {/* Prayer Request Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Prayer Requests</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              "Therefore confess your sins to each other and pray for each other so that you may be healed. 
              The prayer of a righteous person is powerful and effective." - James 5:16
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <PrayerRequestForm />
          </motion.div>
        </div>
      </section>
      
      {/* Game Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Fun & Games</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take a moment to have some fun and possibly win a discount on our merchandise!
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <LemonGame />
        </motion.div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;