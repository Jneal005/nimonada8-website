import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LemonGame = () => {
  const [clicks, setClicks] = useState(0);
  const [cupFill, setCupFill] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameActive, setIsGameActive] = useState(false);

  const MAX_CLICKS = 20;
  
  // Generate a random discount code
  const generateDiscountCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'HOLYSIPS';
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  // Handle lemon click
  const handleLemonClick = () => {
    if (!isGameActive || isGameComplete) return;
    
    const newClicks = clicks + 1;
    setClicks(newClicks);
    setCupFill((newClicks / MAX_CLICKS) * 100);
    
    if (newClicks >= MAX_CLICKS) {
      setIsGameComplete(true);
      setDiscountCode(generateDiscountCode());
      setIsGameActive(false);
    }
  };

  // Start the game
  const startGame = () => {
    setClicks(0);
    setCupFill(0);
    setIsGameComplete(false);
    setDiscountCode('');
    setTimeLeft(30);
    setIsGameActive(true);
  };

  // Timer effect
  useEffect(() => {
    if (!isGameActive || isGameComplete) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsGameActive(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isGameActive, isGameComplete]);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-lemonYellow to-limeGreen py-4 px-6">
        <h2 className="text-2xl font-bold text-gray-900">Squeeze the Lemon Game</h2>
        <p className="text-gray-700">Click the lemon to fill the cup and win a discount!</p>
      </div>
      
      <div className="p-6">
        {!isGameActive && !isGameComplete ? (
          <div className="text-center py-8">
            <p className="text-lg text-gray-700 mb-6">
              Click the lemon as fast as you can to fill the cup with lemonade. 
              Complete the challenge in 30 seconds to win a discount code!
            </p>
            <motion.button
              onClick={startGame}
              className="bg-orange hover:bg-orange/90 text-white font-medium py-3 px-6 rounded-lg text-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Game
            </motion.button>
          </div>
        ) : isGameComplete ? (
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h3 className="text-2xl font-bold text-green-600 mb-2">Congratulations!</h3>
              <p className="text-lg text-gray-700">You've filled the cup and earned a discount!</p>
              <div className="mt-4 bg-gray-100 p-4 rounded-lg inline-block">
                <p className="text-sm text-gray-600 mb-1">Your discount code:</p>
                <p className="text-2xl font-mono font-bold tracking-wider text-orange">{discountCode}</p>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Use this code at checkout for 10% off your next purchase.
              </p>
            </motion.div>
            <motion.button
              onClick={startGame}
              className="bg-limeGreen hover:bg-limeGreen/90 text-white font-medium py-2 px-4 rounded-md transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Play Again
            </motion.button>
          </div>
        ) : (
          <div className="py-6">
            <div className="flex justify-between items-center mb-4">
              <div className="bg-gray-200 rounded-full h-4 w-full overflow-hidden">
                <motion.div 
                  className="bg-lemonYellow h-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${cupFill}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="ml-4 text-lg font-bold text-gray-700">
                {timeLeft}s
              </div>
            </div>
            
            <div className="flex justify-center py-8">
              <motion.div
                className="cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLemonClick}
              >
                <motion.div
                  animate={{
                    rotate: clicks % 2 === 0 ? [-5, 5, -5] : [5, -5, 5],
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-9xl"
                >
                  🍋
                </motion.div>
                <p className="text-center mt-2 text-gray-700">Click me!</p>
              </motion.div>
            </div>
            
            <div className="text-center">
              <div className="inline-block bg-gray-100 px-4 py-2 rounded-lg">
                <span className="font-bold text-orange text-lg">{clicks}</span>
                <span className="text-gray-700 text-lg"> / {MAX_CLICKS} squeezes</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LemonGame;