import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PrayerRequestForm from '../components/PrayerRequestForm';

const PrayerRequestsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-lemonYellow to-limeGreen py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Prayer Requests
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-700 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Share your prayer needs with our community. We believe in the power of prayer.
            </motion.p>
          </div>
        </section>

        {/* Prayer Request Form Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <PrayerRequestForm />
            </div>
          </div>
        </section>

        {/* Community Prayer Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Community Prayers</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* These would typically come from a database */}
              {[
                {
                  id: 1,
                  name: 'Sarah J.',
                  request: 'Please pray for my mother who is recovering from surgery.',
                  date: '2 days ago'
                },
                {
                  id: 2,
                  name: 'Michael T.',
                  request: 'Seeking prayers for guidance in my career path.',
                  date: '3 days ago'
                },
                {
                  id: 3,
                  name: 'Anonymous',
                  request: 'Prayers for healing and strength during a difficult time.',
                  date: '1 week ago'
                },
                {
                  id: 4,
                  name: 'Rebecca L.',
                  request: 'Please pray for my family as we navigate some challenges.',
                  date: '1 week ago'
                },
                {
                  id: 5,
                  name: 'David W.',
                  request: 'Asking for prayers for my upcoming medical tests.',
                  date: '2 weeks ago'
                },
                {
                  id: 6,
                  name: 'Anonymous',
                  request: 'Prayers for peace and comfort during a time of loss.',
                  date: '2 weeks ago'
                }
              ].map(prayer => (
                <motion.div 
                  key={prayer.id}
                  className="bg-white p-6 rounded-lg shadow-md"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">{prayer.name}</h3>
                    <span className="text-sm text-gray-500">{prayer.date}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{prayer.request}</p>
                  <div className="flex justify-end">
                    <button className="text-orange hover:text-orange/80 text-sm font-medium flex items-center">
                      <span className="mr-1">🙏</span> Praying
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Scripture Section */}
        <section className="py-16 bg-gradient-to-r from-limeGreen to-lemonYellow">
          <div className="container mx-auto px-4 text-center">
            <blockquote className="text-2xl italic font-medium text-gray-800 max-w-3xl mx-auto">
              "Therefore confess your sins to each other and pray for each other so that you may be healed. The prayer of a righteous person is powerful and effective."
            </blockquote>
            <p className="mt-4 text-xl font-bold text-gray-800">James 5:16</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrayerRequestsPage;