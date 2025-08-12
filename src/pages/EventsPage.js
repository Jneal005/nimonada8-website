import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LocationCard from '../components/LocationCard';

const EventsPage = () => {
  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'past'
  
  // Sample events data
  const events = [
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
    },
    {
      id: 4,
      name: 'Farmers Market',
      address: '789 Fresh Lane, Westside',
      date: '2023-07-29',
      time: '8:00 AM - 1:00 PM',
      description: 'Find our booth at the local farmers market! We\'ll be serving our signature lemonade and sharing about our ministry.',
      status: 'upcoming',
      coordinates: { lat: 34.0456, lng: -118.4565 }
    },
    {
      id: 5,
      name: 'Church Partnership',
      address: 'Grace Community Church, 321 Faith Road',
      date: '2023-06-25',
      time: '10:30 AM - 2:00 PM',
      description: 'We partnered with Grace Community Church for their summer festival, serving lemonade and sharing testimonies.',
      status: 'past',
      coordinates: { lat: 34.1234, lng: -118.3456 }
    },
    {
      id: 6,
      name: 'Park Outreach',
      address: 'Sunshine Park, East Side',
      date: '2023-08-05',
      time: '12:00 PM - 6:00 PM',
      description: 'Join us at Sunshine Park for a day of refreshment, games, and community building. We\'ll have activities for all ages!',
      status: 'upcoming',
      coordinates: { lat: 34.0789, lng: -118.2345 }
    }
  ];

  // Filter events based on selected filter
  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.status === filter);

  // Animation variants
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-lemonYellow to-limeGreen py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Upcoming Events
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-800 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Find out where we'll be serving next and join us for refreshment and fellowship!
          </motion.p>
        </div>
      </section>
      
      {/* Events Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Filter Controls */}
        <div className="mb-12 flex justify-center">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${filter === 'all' ? 'bg-orange text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              All Events
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-4 py-2 text-sm font-medium ${filter === 'upcoming' ? 'bg-orange text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter('past')}
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${filter === 'past' ? 'bg-orange text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Past Events
            </button>
          </div>
        </div>
        
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No events found matching your filter.</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredEvents.map(event => (
              <motion.div key={event.id} variants={itemVariants}>
                <LocationCard location={event} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Want to Host Limonada at Your Event?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-700 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We'd love to bring our refreshing lemonade and ministry to your church, community event, or gathering.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/contact" 
              className="inline-block bg-orange hover:bg-orange/90 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
            >
              Request Limonada
            </Link>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default EventsPage;