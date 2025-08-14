import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'qrcode';

const LemonadeCustomizer = () => {
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [cupColor, setCupColor] = useState('#FFE135'); // Default lemon yellow
  const [customName, setCustomName] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [qrCode, setQRCode] = useState('');
  const [unlockedSecrets, setUnlockedSecrets] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [savedMixes, setSavedMixes] = useState([]);


  const [isShaking, setIsShaking] = useState(false);
  const [draggedFlavor, setDraggedFlavor] = useState(null);
  const testTubeRef = useRef(null);

  // Available flavors with colors and seasonal availability
  const availableFlavors = [
    { id: 'classic', name: 'Classic Lemon', color: '#FFE135', seasonal: false, icon: '🍋', price: 0 },
    { id: 'strawberry', name: 'Strawberry', color: '#FF6B9D', seasonal: false, icon: '🍓', price: 0.5 },
    { id: 'blueberry', name: 'Blueberry', color: '#4A90E2', seasonal: false, icon: '🫐', price: 0.5 },
    { id: 'mint', name: 'Fresh Mint', color: '#4CAF50', seasonal: false, icon: '🌿', price: 0.25 },
    { id: 'pineapple', name: 'Pineapple', color: '#FFD700', seasonal: false, icon: '🍍', price: 0.75 },
    { id: 'raspberry', name: 'Raspberry', color: '#E91E63', seasonal: true, icon: '🫐', price: 0.5 },
    { id: 'peach', name: 'Peach', color: '#FFAB91', seasonal: true, icon: '🍑', price: 0.75 },
    { id: 'lavender', name: 'Lavender', color: '#9C27B0', seasonal: true, icon: '💜', price: 1.0 },
    { id: 'mango', name: 'Mango', color: '#FFA500', seasonal: true, icon: '🥭', price: 0.75 },
     { id: 'watermelon', name: 'Watermelon', color: '#FF6B6B', seasonal: true, icon: '🍉', price: 0.5 }
   ];

  // Secret combinations
  const secretCombos = [
    {
      id: 'holy-sip-special',
      name: 'Holy Sip Special',
      combo: ['classic', 'pineapple', 'mint'],
      discount: 15,
      description: 'Divine refreshment with a heavenly discount!'
    },
    {
      id: 'berry-bliss',
      name: 'Berry Bliss',
      combo: ['strawberry', 'blueberry', 'raspberry'],
      discount: 10,
      description: 'Triple berry paradise!'
    }
  ];

  // Popular mixes for leaderboard
  const popularMixes = [
    { name: "Jordan's Sunshine Splash", flavors: ['classic', 'pineapple'], votes: 127 },
    { name: "Berry Heaven", flavors: ['strawberry', 'blueberry'], votes: 98 },
    { name: "Mint Madness", flavors: ['classic', 'mint'], votes: 85 },
    { name: "Tropical Paradise", flavors: ['pineapple', 'peach'], votes: 72 },
    { name: "Purple Rain", flavors: ['blueberry', 'lavender'], votes: 64 }
  ];

  // Calculate mixed color based on selected flavors
  const calculateMixedColor = (flavors) => {
    if (flavors.length === 0) return '#FFE135';
    
    let totalRatio = flavors.reduce((sum, f) => sum + (f.ratio || 30), 0);
    let r = 0, g = 0, b = 0;
    
    flavors.forEach(flavor => {
      const weight = (flavor.ratio || 30) / totalRatio;
      const color = flavor.color;
      const rgb = hexToRgb(color);
      r += rgb.r * weight;
      g += rgb.g * weight;
      b += rgb.b * weight;
    });
    
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
  };

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 255, g: 225, b: 53 };
  };

  // Add flavor to cup
  const addFlavor = (flavor) => {
    if (selectedFlavors.length < 5) {
      const existing = selectedFlavors.find(f => f.id === flavor.id);
      if (existing) {
        setSelectedFlavors(prev => 
          prev.map(f => f.id === flavor.id ? { ...f, ratio: f.ratio + 10 } : f)
        );
      } else {
        setSelectedFlavors(prev => [...prev, { ...flavor, ratio: 30 }]);
      }
    }
  };

  const handleDragStart = (e, flavor) => {
    setDraggedFlavor(flavor);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedFlavor && selectedFlavors.length < 5) {
      addFlavor(draggedFlavor);
      setDraggedFlavor(null);
    }
  };

  const handleShake = () => {
    if (selectedFlavors.length > 0) {
      setIsShaking(true);
      // Mix colors more intensely when shaking
      const mixedColor = blendColors(selectedFlavors.map(f => f.color));
      setCupColor(mixedColor);
      setTimeout(() => setIsShaking(false), 1000);
    }
  };

  // Enhanced color blending for shake effect
  const blendColors = (colors) => {
    if (colors.length === 0) return '#FFE135';
    if (colors.length === 1) return colors[0];
    
    // Convert hex to RGB, blend, and convert back
    const rgbColors = colors.map(hex => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return [r, g, b];
    });
    
    const avgR = Math.round(rgbColors.reduce((sum, [r]) => sum + r, 0) / rgbColors.length);
    const avgG = Math.round(rgbColors.reduce((sum, [, g]) => sum + g, 0) / rgbColors.length);
    const avgB = Math.round(rgbColors.reduce((sum, [, , b]) => sum + b, 0) / rgbColors.length);
    
    return `#${avgR.toString(16).padStart(2, '0')}${avgG.toString(16).padStart(2, '0')}${avgB.toString(16).padStart(2, '0')}`;
  };

  // Update flavor ratio
  const updateRatio = (flavorId, newRatio) => {
    setSelectedFlavors(prev => 
      prev.map(f => f.id === flavorId ? { ...f, ratio: Math.max(0, newRatio) } : f)
        .filter(f => f.ratio > 0)
    );
  };

  // Remove flavor
  const removeFlavor = (flavorId) => {
    setSelectedFlavors(prev => prev.filter(f => f.id !== flavorId));
  };

  // Check for secret combinations
  const checkSecretCombos = () => {
    const currentFlavors = selectedFlavors.map(f => f.id).sort();
    
    secretCombos.forEach(secret => {
      const secretFlavors = secret.combo.sort();
      const hasCombo = secretFlavors.every(flavor => currentFlavors.includes(flavor));
      
      if (hasCombo && !unlockedSecrets.includes(secret.id)) {
        setUnlockedSecrets(prev => [...prev, secret.id]);
      }
    });
  };

  // Generate QR code for the mix
  const generateQR = async () => {
    const mixData = {
      name: customName || 'Custom Mix',
      flavors: selectedFlavors.map(f => ({ id: f.id, ratio: f.ratio }))
    };
    
    try {
      const qr = await QRCode.toDataURL(JSON.stringify(mixData));
      setQRCode(qr);
      setShowQR(true);
    } catch (err) {
      console.error('QR generation failed:', err);
    }
  };

  // Save custom mix
  const saveMix = () => {
    if (!customName.trim()) {
      alert('Please name your custom drink!');
      return;
    }
    
    const newMix = {
      id: Date.now(),
      name: customName,
      flavors: selectedFlavors,
      color: cupColor,
      created: new Date().toLocaleDateString()
    };
    
    setSavedMixes(prev => [...prev, newMix]);
    alert(`"${customName}" saved successfully!`);
  };

  // Share on social media
  const shareOnSocial = () => {
    const text = `Check out my custom lemonade mix: "${customName || 'My Custom Mix'}"! 🍋✨ Made with ${selectedFlavors.map(f => f.name).join(', ')} at Holy Sips Ministry!`;
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({ title: 'My Custom Lemonade', text, url });
    } else {
      // Fallback to Twitter
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
    }
  };

  // Update cup color when flavors change
  useEffect(() => {
    setCupColor(calculateMixedColor(selectedFlavors));
    checkSecretCombos();
  }, [selectedFlavors]);

  // Get current season
  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'fall';
    return 'winter';
  };

  const currentSeason = getCurrentSeason();
  const filteredFlavors = availableFlavors.filter(f => !f.seasonal || currentSeason === 'summer');

  return (
    <>
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">🍋 Lemonade Customizer</h2>
        <p className="text-gray-600">Create your perfect custom lemonade mix!</p>
      </div>

      <div className="space-y-6">
        {/* Action Panel, Test Tube Display, and Mix Details */}
        <div className="flex gap-4 items-start">
          {/* Action Panel */}
          <div className="flex flex-col space-y-3 min-w-[200px]">
              {/* Show Leaderboard Button */}
              <button
                onClick={() => setShowLeaderboard(!showLeaderboard)}
                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg whitespace-nowrap"
              >
                🏆 {showLeaderboard ? 'Hide' : 'Show'} Leaderboard
              </button>
              
              {/* Custom Name Input */}
              <input
                type="text"
                placeholder="Name your creation..."
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="p-2 border rounded-lg"
              />
              
              {/* Action Buttons */}
              <button
                onClick={saveMix}
                disabled={selectedFlavors.length === 0}
                className="bg-lemonYellow hover:bg-yellow-400 text-gray-800 font-semibold py-2 px-4 rounded-lg disabled:opacity-50"
              >
                💾 Save My Mix
              </button>
              
              <button
                onClick={shareOnSocial}
                disabled={selectedFlavors.length === 0}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50"
              >
                📱 Share on Social
              </button>
              
              <button
                onClick={generateQR}
                disabled={selectedFlavors.length === 0}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50"
              >
                📱 Get QR Code
              </button>
            </div>
            
            {/* Test Tube Display */}
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Your Custom Mix</h3>
              
              {/* Test Tube Container */}
              <div className="relative mx-auto w-24 h-64 mb-4">
                <motion.div
                  ref={testTubeRef}
                  className="w-20 h-48 rounded-b-full border-4 border-gray-300 relative overflow-hidden shadow-lg bg-gray-50 mx-auto"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  animate={{ 
                    x: isShaking ? [0, -5, 5, -5, 5, 0] : 0,
                    y: isShaking ? [0, -2, 2, -2, 2, 0] : 0
                  }}
                  transition={{ duration: isShaking ? 0.5 : 0 }}
                  onClick={handleShake}
                  style={{ cursor: selectedFlavors.length > 0 ? 'pointer' : 'default' }}
                >
                  {/* Test Tube Liquid */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 rounded-b-full"
                    style={{ 
                      backgroundColor: cupColor,
                      height: `${Math.min(85, selectedFlavors.length * 15 + 10)}%`,
                      filter: isShaking ? 'brightness(1.2) saturate(1.3)' : 'brightness(0.9)'
                    }}
                    initial={{ height: 0 }}
                    animate={{ 
                      height: `${Math.min(85, selectedFlavors.length * 15 + 10)}%`,
                      filter: isShaking ? 'brightness(1.2) saturate(1.3)' : 'brightness(0.9)'
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                  
                  {/* Bubbles */}
                  <AnimatePresence>
                    {selectedFlavors.map((flavor, index) => (
                      <motion.div
                        key={`${flavor.id}-${index}`}
                        className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-70"
                        style={{
                          left: `${25 + (index * 12) % 50}%`,
                          bottom: `${5 + (index * 8)}%`
                        }}
                        initial={{ scale: 0, y: 10 }}
                        animate={{ 
                          scale: isShaking ? [0, 1.5, 0] : [0, 1, 0],
                          y: isShaking ? [10, -20, -40] : [10, -15, -25]
                        }}
                        transition={{ 
                          duration: isShaking ? 1 : 2,
                          repeat: Infinity,
                          delay: index * 0.2
                        }}
                      >
                        <div className="text-xs">{flavor.icon}</div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {/* Drop zone indicator */}
                  {draggedFlavor && (
                    <motion.div
                      className="absolute inset-0 border-4 border-dashed border-yellow-400 rounded-b-full bg-yellow-100 bg-opacity-30"
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </motion.div>
                
                {/* Shake instruction */}
                {selectedFlavors.length > 0 && (
                  <motion.div
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 text-center whitespace-nowrap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    Click or tap to shake! 🥤
                  </motion.div>
                )}
              </div>
            </div>
            
            {/* Mix Details */}
            {selectedFlavors.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4 flex-1">
                <h4 className="font-semibold mb-2">Current Mix:</h4>
                {selectedFlavors.map(flavor => (
                  <div key={flavor.id} className="flex items-center justify-between mb-2">
                    <span className="text-sm">{flavor.icon} {flavor.name}</span>
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={flavor.ratio}
                        onChange={(e) => updateRatio(flavor.id, parseInt(e.target.value))}
                        className="w-20"
                      />
                      <span className="text-sm w-12">{flavor.ratio}%</span>
                      <button
                        onClick={() => removeFlavor(flavor.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Secret Combinations Unlocked */}
        {unlockedSecrets.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-yellow-800 mb-2">🎉 Secret Combo Unlocked!</h4>
            {unlockedSecrets.map(secretId => {
              const secret = secretCombos.find(s => s.id === secretId);
              return (
                <div key={secretId} className="text-sm text-yellow-700">
                  <strong>{secret.name}</strong> - {secret.description}
                  <br />💰 {secret.discount}% discount at our stand!
                </div>
              );
            })}
          </div>
        )}

        {/* Flavor Selection - Horizontal Layout */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">Choose Your Flavors</h3>
          <div className="text-sm text-gray-600 mb-4 text-center">Drag fruits to the test tube above:</div>
          
          <div className="bg-white border-2 border-gray-200 rounded-lg p-4 shadow-sm mb-6">
              <div className="grid grid-cols-5 gap-3">
                {filteredFlavors.map((flavor) => (
                  <motion.div
                    key={flavor.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, flavor)}
                    className="p-3 rounded-lg border border-gray-200 hover:border-yellow-400 transition-all duration-200 bg-gray-50 hover:bg-yellow-50 cursor-grab active:cursor-grabbing text-center"
                    whileHover={{ scale: 1.05 }}
                    whileDrag={{ scale: 1.1, rotate: 5 }}
                  >
                    <div className="text-2xl mb-1">{flavor.icon}</div>
                    <div className="text-xs font-medium text-gray-700">{flavor.name}</div>
                    {flavor.seasonal && (
                      <div className="text-xs text-orange-500">Seasonal</div>
                    )}
                  </motion.div>
                ))}
              </div>
          </div>
        </div>

      {/* Leaderboard Modal */}
      <AnimatePresence>
        {showLeaderboard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowLeaderboard(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">🏆 Popular Mixes</h3>
              <div className="space-y-3">
                {popularMixes.map((mix, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <div className="font-medium">{mix.name}</div>
                      <div className="text-sm text-gray-600">
                        {mix.flavors.map(fId => availableFlavors.find(f => f.id === fId)?.icon).join(' ')}
                      </div>
                    </div>
                    <div className="text-sm font-semibold">{mix.votes} votes</div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowLeaderboard(false)}
                className="w-full mt-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowQR(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">📱 Your QR Code</h3>
              <p className="text-sm text-gray-600 mb-4">
                Show this QR code at our stand to get your custom mix!
              </p>
              {qrCode && (
                <img src={qrCode} alt="QR Code" className="mx-auto mb-4" />
              )}
              <button
                onClick={() => setShowQR(false)}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
};

export default LemonadeCustomizer;