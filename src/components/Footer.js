import React from 'react';
import { motion } from 'framer-motion';
import { FaTiktok, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';
import { SiCashapp } from 'react-icons/si';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-lemonYellow">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-lemonYellow" />
                <a href="mailto:HolySips1615@gmail.com" className="hover:text-lemonYellow transition-colors">
                  HolySips1615@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-lemonYellow" />
                <a href="tel:4044243357" className="hover:text-lemonYellow transition-colors">
                  404-424-335<span className="text-2xl">7</span>
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <SiCashapp className="text-lemonYellow" />
                <span>$HolySips</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-lemonYellow">Follow Us</h3>
            <div className="flex space-x-4">
              <motion.a 
                href="https://www.tiktok.com/@HolySips" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-gray-900 p-3 rounded-full hover:bg-lemonYellow transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTiktok size={24} />
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/HolySipsMovement" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-gray-900 p-3 rounded-full hover:bg-lemonYellow transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaInstagram size={24} />
              </motion.a>
            </div>
            <div className="mt-6">
              <h4 className="text-xl font-semibold mb-2">Our Mission</h4>
              <p className="text-gray-300">SIP THE MISSION, SHARE THE VISION</p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-lemonYellow">Stay Updated</h3>
            <p className="mb-4 text-gray-300">Subscribe to our newsletter for the latest updates on locations and events.</p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-lemonYellow"
                required
              />
              <motion.button 
                type="submit" 
                className="w-full bg-lemonYellow hover:bg-lemonYellow/90 text-gray-900 font-medium py-2 px-4 rounded-md transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Holy Sips Lemonade. All rights reserved.
          </p>
          <p className="mt-2 text-gray-400">
            Owner: Raven Emilien
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;