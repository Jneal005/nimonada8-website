import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState('drinks');

  const categories = [
    { id: 'drinks', name: 'Drinks' },
    { id: 'specials', name: 'Specials' }
  ];

  const menuItems = {
    drinks: [
      {
        id: 1,
        name: 'Classic Lemonade',
        description: 'Our signature fresh-squeezed lemonade with the perfect balance of sweet and tart',
        price: 3.99,
        image: '🍋',
        popular: true,
        vegan: true,
        glutenFree: true
      },
      {
        id: 2,
        name: 'Strawberry Lemonade',
        description: 'Fresh lemonade infused with real strawberries',
        price: 4.50,
        image: '🍓',
        popular: true,
        vegan: true,
        glutenFree: true
      },
      {
        id: 3,
        name: 'Blueberry Mint Lemonade',
        description: 'Refreshing lemonade with blueberries and fresh mint',
        price: 4.50,
        image: '🫐',
        vegan: true,
        glutenFree: true
      },
      {
        id: 4,
        name: 'Mango Paradise Lemonade',
        description: 'Tropical twist with fresh mango puree',
        price: 4.99,
        image: '🥭',
        vegan: true,
        glutenFree: true
      },
      {
        id: 5,
        name: 'Sparkling Raspberry Lemonade',
        description: 'Bubbly lemonade with raspberry puree',
        price: 4.99,
        image: '✨',
        vegan: true,
        glutenFree: true
      },
      {
        id: 6,
        name: 'Holy Sips Special',
        description: 'Our secret recipe with a blend of citrus and berries',
        price: 5.50,
        image: '🙏',
        popular: true,
        vegan: true,
        glutenFree: true
      },
      {
        id: 7,
        name: 'PASSION FOR CHRIST',
        description: 'A passionate blend of tropical passion fruit with divine citrus notes',
        price: 5.25,
        image: '💛',
        popular: true,
        vegan: true,
        glutenFree: true
      },
      {
        id: 8,
        name: 'BERRIED N\' DA WORD',
        description: 'Mixed berry lemonade that speaks to your soul',
        price: 4.99,
        image: '🫐',
        vegan: true,
        glutenFree: true
      },
      {
        id: 9,
        name: 'PEACH THE GOSPEL',
        description: 'Sweet peach lemonade that spreads the good news of flavor',
        price: 4.75,
        image: '🍑',
        popular: true,
        vegan: true,
        glutenFree: true
      },
      {
        id: 10,
        name: 'GLORY GLOW',
        description: 'Golden turmeric and ginger lemonade that radiates divine light',
        price: 5.50,
        image: '✨',
        vegan: true,
        glutenFree: true
      },
      {
        id: 11,
        name: 'HEAVENLY BREEZE',
        description: 'Light and refreshing cucumber mint lemonade from above',
        price: 4.50,
        image: '🌿',
        vegan: true,
        glutenFree: true
      },
      {
        id: 12,
        name: 'LORD HAVE MERCY',
        description: 'Spicy jalapeño lemonade that will make you call on the Lord',
        price: 5.25,
        image: '🌶️',
        vegan: true,
        glutenFree: true
      }
    ],
    specials: [
      {
        id: 20,
        name: 'Sunday Blessing Special',
        description: 'Any premium lemonade at a special discounted price',
        price: 3.99,
        image: '✝️',
        popular: true,
        vegan: true,
        glutenFree: true
      },
      {
        id: 21,
        name: 'Family Fellowship Pack',
        description: 'Four lemonades of your choice - perfect for sharing',
        price: 14.99,
        image: '👨‍👩‍👧‍👦',
        popular: true,
        vegan: true,
        glutenFree: true
      }
    ]
  };

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
              Our Menu
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-700 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Refreshing drinks made with love and the finest ingredients
            </motion.p>
          </div>
        </section>

        {/* Menu Categories */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-2 rounded-full text-lg font-medium transition-colors ${activeCategory === category.id ? 'bg-orange text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Menu Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems[activeCategory].map((item) => (
                <motion.div 
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                        <p className="text-gray-600 mt-1">{item.description}</p>
                      </div>
                      <span className="text-3xl">{item.image}</span>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-lg font-bold text-orange">${item.price.toFixed(2)}</p>
                      <div className="flex space-x-2">
                        {item.popular && (
                          <span className="bg-orange/10 text-orange text-xs px-2 py-1 rounded-full">Popular</span>
                        )}
                        {item.vegan && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Vegan</span>
                        )}
                        {item.glutenFree && (
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">GF</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Order?</h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
              Visit one of our locations or call ahead for pickup
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/locations" className="bg-orange hover:bg-orange/90 text-white px-6 py-3 rounded-md text-lg font-medium transition-colors">
                Find a Location
              </Link>
              <a href="tel:+15551234567" className="bg-white border-2 border-orange text-orange hover:bg-orange/10 px-6 py-3 rounded-md text-lg font-medium transition-colors">
                Call for Pickup
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MenuPage;