import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuthContext } from './AuthProvider';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuthContext();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl">🍋</span>
            <span className="font-bold text-2xl text-orange">Holy Sips</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-800 hover:text-orange font-medium transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-800 hover:text-orange font-medium transition-colors">
              About
            </Link>
            <Link to="/locations" className="text-gray-800 hover:text-orange font-medium transition-colors">
              Locations
            </Link>
            <Link to="/menu" className="text-gray-800 hover:text-orange font-medium transition-colors">
              Menu
            </Link>
            <Link to="/prayer" className="text-gray-800 hover:text-orange font-medium transition-colors">
              Prayer Requests
            </Link>
            <Link to="/contact" className="text-gray-800 hover:text-orange font-medium transition-colors">
              Contact
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/account" className="text-gray-800 hover:text-orange font-medium transition-colors">
                  My Account
                </Link>
                <button
                  onClick={signOut}
                  className="bg-orange hover:bg-orange/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-orange hover:bg-orange/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-gray-800 hover:text-orange transition-colors"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          className="md:hidden bg-white"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-gray-800 hover:text-orange font-medium transition-colors py-2"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-gray-800 hover:text-orange font-medium transition-colors py-2"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link 
              to="/locations" 
              className="text-gray-800 hover:text-orange font-medium transition-colors py-2"
              onClick={toggleMenu}
            >
              Locations
            </Link>
            <Link 
              to="/menu" 
              className="text-gray-800 hover:text-orange font-medium transition-colors py-2"
              onClick={toggleMenu}
            >
              Menu
            </Link>
            <Link 
              to="/prayer" 
              className="text-gray-800 hover:text-orange font-medium transition-colors py-2"
              onClick={toggleMenu}
            >
              Prayer Requests
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-800 hover:text-orange font-medium transition-colors py-2"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/account" 
                  className="text-gray-800 hover:text-orange font-medium transition-colors py-2"
                  onClick={toggleMenu}
                >
                  My Account
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    toggleMenu();
                  }}
                  className="bg-orange hover:bg-orange/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="bg-orange hover:bg-orange/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors inline-block"
                onClick={toggleMenu}
              >
                Sign In
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;