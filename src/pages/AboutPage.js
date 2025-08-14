import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'Pastor John Davis',
      role: 'Founder & Director',
      bio: 'Pastor John founded Holy Sips with a vision to refresh both body and soul through community outreach.',
      image: '🧑‍🦱' // Using emoji as placeholder
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Outreach Coordinator',
      bio: 'Sarah organizes our pop-up events and coordinates with local communities to maximize our impact.',
      image: '👩' // Using emoji as placeholder
    },
    {
      id: 3,
      name: 'Michael Rodriguez',
      role: 'Prayer Team Leader',
      bio: 'Michael leads our prayer initiative, ensuring that spiritual refreshment accompanies our physical refreshment.',
      image: '👨' // Using emoji as placeholder
    },
    {
      id: 4,
      name: 'Lisa Chen',
      role: 'Volunteer Coordinator',
      bio: 'Lisa manages our amazing team of volunteers who make each Holy Sips event possible.',
      image: '👩‍🦰' // Using emoji as placeholder
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      quote: "Holy Sips' presence at our community event brought such joy and meaningful conversations. The lemonade was delicious, but the message of hope was even sweeter.",
      author: "Maria S., Community Center Director"
    },
    {
      id: 2,
      quote: "I stopped by for a refreshing drink on a hot day and ended up having the most profound spiritual conversation I've had in years. Thank you for quenching both thirsts!",
      author: "David T., Local Resident"
    },
    {
      id: 3,
      quote: "As a church partner with Holy Sips, we've seen incredible connections made through this simple ministry. It's amazing how God uses lemonade to open doors!",
      author: "Pastor Robert, Grace Community Church"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-lemonYellow to-limeGreen py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About Holy Sips Ministry
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-800 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Refreshing bodies and souls, one cup at a time.
          </motion.p>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="prose prose-lg text-gray-600">
              <p>
                Holy Sips began in the summer of 2018 when Pastor John Davis set up a simple lemonade stand outside his church on a hot Sunday. What started as a way to refresh his congregation after service quickly became something more meaningful.
              </p>
              <p>
                As people from the neighborhood stopped by for free lemonade, conversations naturally turned to matters of faith, hope, and community. Pastor John realized that this simple act of hospitality was opening doors for ministry that traditional outreach hadn't reached.
              </p>
              <p>
                Today, Holy Sips has grown into a mobile ministry that travels throughout the city, setting up pop-up lemonade stands in parks, community events, and neighborhoods. We offer free, refreshing lemonade as a way to start conversations, build relationships, and share the refreshing message of God's love.
              </p>
              <blockquote className="italic border-l-4 border-lemonYellow pl-4 py-2">
                "I was thirsty and you gave me something to drink..." - Matthew 25:35
              </blockquote>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative h-96 rounded-lg overflow-hidden shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-lemonYellow/80 to-limeGreen/80 flex items-center justify-center text-9xl">
              🍋
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center bg-white/90 p-6 rounded-lg max-w-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Mission</h3>
                <p className="text-gray-700">
                  To refresh bodies with lemonade and souls with the living water of God's Word, creating moments of connection in a disconnected world.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Testimonials and Reviews</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from those who have experienced Holy Sips in their communities.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map(testimonial => (
            <motion.div 
              key={testimonial.id} 
              className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-lemonYellow"
              variants={itemVariants}
            >
              <div className="text-4xl text-lemonYellow mb-4">❝</div>
              <p className="text-gray-700 italic mb-6">{testimonial.quote}</p>
              <div className="font-medium text-gray-900">{testimonial.author}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated people behind Holy Sips who make our ministry possible.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {teamMembers.map(member => (
              <motion.div 
                key={member.id} 
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                variants={itemVariants}
              >
                <div className="h-40 bg-gradient-to-r from-lemonYellow to-limeGreen flex items-center justify-center text-6xl">
                  {member.image}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-orange font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-lemonYellow to-limeGreen">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Join Our Mission
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-800 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Whether you want to volunteer, donate, or partner with us, there are many ways to support Holy Sips' mission.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <a 
              href="#contact" 
              className="inline-block bg-orange hover:bg-orange/90 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
            >
              Get Involved
            </a>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutPage;