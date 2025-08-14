import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

const LemonGame = () => {
  const [isGameActive, setIsGameActive] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(localStorage.getItem('lemonGameHighScore') || 0);
  const [lemonY, setLemonY] = useState(0);
  const [lemonX, setLemonX] = useState(60);
  const [isJumping, setIsJumping] = useState(false);
  const [cups, setCups] = useState([]);
  const [lemonadeCups, setLemonadeCups] = useState(new Set());
  const [gameSpeed, setGameSpeed] = useState(2);
  const [discountCode, setDiscountCode] = useState('');
  const [lemonPieces, setLemonPieces] = useState([]);
  const [birds, setBirds] = useState([]);
  const [cameraOffset, setCameraOffset] = useState(0);
  const [isLemonCarried, setIsLemonCarried] = useState(false);
  const [carriedLemonPosition, setCarriedLemonPosition] = useState({ x: 0, y: 0 });
  const [isSpecialSequence, setIsSpecialSequence] = useState(false);
  const [sequencePhase, setSequencePhase] = useState('none'); // 'flying_up', 'scrolling_to_text', 'at_text', 'returning', 'dropping'
  const [isGamePaused, setIsGamePaused] = useState(false);
  const [homepageBird, setHomepageBird] = useState(null);
  
  const gameAreaRef = useRef(null);
  const animationRef = useRef(null);
  const lemonRef = useRef({ y: 0, x: 60, velocity: 0, horizontalVelocity: 0, isJumping: false });
  const birdCarryRef = useRef(null);
  const sequenceTimeoutRef = useRef(null);
  
  const GRAVITY = 0.6;
  const JUMP_FORCE = -12;
  const GROUND_Y = 0;
  const LEMON_SIZE = 40;
  const CUP_WIDTH = 25;
  const CUP_HEIGHT = 35;
  const GAME_HEIGHT = 400; // Smaller height for homepage game interface
  
  // Generate a random discount code
  const generateDiscountCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'HOLYSIPS';
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };
  
  // Special sequence: Bird flies to top, scrolls to biblical text, returns and drops lemon
  const startSpecialSequence = useCallback(() => {
    setIsSpecialSequence(true);
    setSequencePhase('flying_up');
    
    // Phase 1: Fly to top of page (2 seconds)
    setTimeout(() => {
      setSequencePhase('scrolling_to_text');
      // Scroll to find the biblical text
      const heroElement = document.querySelector('[class*="Hero"]') || document.querySelector('p');
      if (heroElement) {
        heroElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 2000);
    
    // Phase 2: Stay at text (3 seconds)
    setTimeout(() => {
      setSequencePhase('at_text');
    }, 4000);
    
    // Phase 3: Return to game (2 seconds)
    setTimeout(() => {
      setSequencePhase('returning');
      // Scroll back to game
      if (gameAreaRef.current) {
        gameAreaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 7000);
    
    // Phase 4: Drop lemon and continue game (1 second)
    setTimeout(() => {
      setSequencePhase('dropping');
      setIsLemonCarried(false);
      setIsSpecialSequence(false);
      setSequencePhase('none');
      // Reset lemon position
      lemonRef.current.x = 60;
      lemonRef.current.y = 0;
      lemonRef.current.velocity = 0;
      lemonRef.current.horizontalVelocity = 0;
    }, 9000);
  }, []);
  
  // Handle jump
  const jump = useCallback(() => {
    if (!isGameActive || lemonRef.current.isJumping) return;
    
    lemonRef.current.velocity = JUMP_FORCE;
    lemonRef.current.horizontalVelocity = 3; // Forward movement during jump
    lemonRef.current.isJumping = true;
    setIsJumping(true);
  }, [isGameActive]);
  
  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [jump]);
  
  // Cleanup sequence timeouts on unmount
  useEffect(() => {
    return () => {
      if (sequenceTimeoutRef.current) {
        clearTimeout(sequenceTimeoutRef.current);
      }
    };
  }, []);
  
  // Game loop
  useEffect(() => {
    if (!isGameActive) return;
    
    const gameLoop = () => {
      // Allow bird movement even when game is paused
      const allowBirdMovement = isGamePaused;
      
      if (!allowBirdMovement) {
      // Update lemon physics
      lemonRef.current.velocity += GRAVITY;
      lemonRef.current.y += lemonRef.current.velocity;
      
      // Update horizontal movement
      if (lemonRef.current.horizontalVelocity > 0) {
        lemonRef.current.x += lemonRef.current.horizontalVelocity;
        lemonRef.current.horizontalVelocity *= 0.95; // Gradual slowdown
        if (lemonRef.current.horizontalVelocity < 0.1) {
          lemonRef.current.horizontalVelocity = 0;
        }
      }
      
      // Keep lemon within bounds and gradually return to starting position
      if (lemonRef.current.x > 60 && lemonRef.current.horizontalVelocity === 0) {
        lemonRef.current.x = Math.max(60, lemonRef.current.x - 1);
      }
      
      // Camera following - if lemon passes halfway across screen, follow it
      const gameAreaWidth = gameAreaRef.current?.offsetWidth || 600;
      if (lemonRef.current.x > gameAreaWidth / 2) {
        setCameraOffset(lemonRef.current.x - gameAreaWidth / 2);
      } else {
        setCameraOffset(0);
      }
      
      // Ground collision
      if (lemonRef.current.y >= GROUND_Y) {
        lemonRef.current.y = GROUND_Y;
        lemonRef.current.velocity = 0;
        lemonRef.current.isJumping = false;
        setIsJumping(false);
      }
      
      setLemonY(lemonRef.current.y);
      setLemonX(lemonRef.current.x);
      
      // Update lemon pieces animation
      setLemonPieces(prevPieces => 
        prevPieces.map(piece => ({
          ...piece,
          x: piece.x + piece.vx,
          y: piece.y + piece.vy,
          vy: piece.vy + 0.3, // Gravity for pieces
          rotation: piece.rotation + 5
        })).filter(piece => piece.y < GAME_HEIGHT + 50) // Remove pieces that fall off screen
      );
      
      // Update cups
      setCups(prevCups => {
        const newCups = prevCups.map(cup => ({
          ...cup,
          x: cup.x - gameSpeed
        })).filter(cup => cup.x > -CUP_WIDTH);
        
        // Add new cups with increased spacing based on game speed
        if (newCups.length === 0 || newCups[newCups.length - 1].x < 400) {
          const baseSpacing = 200 + Math.random() * 100;
          const speedMultiplier = 1 + (gameSpeed - 2) * 0.3; // Increase spacing as speed increases
          const spacing = baseSpacing * speedMultiplier;
          newCups.push({
            id: Date.now(),
            x: (newCups.length > 0 ? newCups[newCups.length - 1].x : 600) + spacing,
            passed: false
          });
        }
        
        return newCups;
      });
      } // End of non-paused game logic
      
      // Update birds with 4D-like movement (runs even when paused)
      setBirds(prevBirds => {
        const newBirds = prevBirds.map(bird => {
          bird.timer += 1;
          
          if (bird.phase === 'approaching') {
            // Normal approach movement
            return {
              ...bird,
              x: bird.x + bird.vx,
              y: bird.y + bird.vy
            };
          } else if (bird.phase === 'waiting_with_lemon') {
            // Wait for 1 second before moving up
            const newWaitTimer = (bird.waitTimer || 0) + 1;
            
            // After 60 frames (1 second at 60fps), start flying up
            if (newWaitTimer >= 60) {
              return { ...bird, phase: 'flying_up_in_game', hasLemon: true, flyUpTimer: 0 };
            }
            
            return {
              ...bird,
              waitTimer: newWaitTimer
            };
          } else if (bird.phase === 'flying_up_in_game') {
            // Bird and lemon fly straight up together within game area
            const newFlyUpTimer = (bird.flyUpTimer || 0) + 1;
            const newY = bird.y - 2; // Fly up at 2 pixels per frame (slower)
            
            // Update lemon position to move with bird
            setCarriedLemonPosition(prev => ({
              x: bird.x,
              y: newY + 20
            }));
            
            // When bird reaches top of game area, create homepage bird
            if (newY <= 0) {
              // Create homepage bird instance at game area position
              const gameAreaElement = document.querySelector('.relative.bg-gradient-to-b');
              const gameAreaRect = gameAreaElement ? gameAreaElement.getBoundingClientRect() : { top: 0, left: 0 };
              
              const homepageBirdData = {
                x: gameAreaRect.left + bird.x,
                y: gameAreaRect.top,
                phase: 'flying_to_top',
                hasLemon: true,
                timer: 0
              };
              setHomepageBird(homepageBirdData);
              
              // Remove this bird from game area
              return { ...bird, phase: 'disappeared' };
            }
            
            return {
              ...bird,
              y: newY,
              flyUpTimer: newFlyUpTimer
            };
          } else if (bird.phase === '4d_travel') {
            // 4D-like movement - complex sine wave patterns
            const time = bird.timer * 0.1;
            const baseSpeed = 3;
            return {
              ...bird,
              x: bird.x + Math.cos(time) * baseSpeed + Math.sin(time * 0.7) * 2,
              y: bird.y + Math.sin(time * 1.3) * 3 + Math.cos(time * 0.5) * 1.5,
              vx: Math.cos(time) * baseSpeed,
              vy: Math.sin(time * 1.3) * 3
            };
          }
          return bird;
        });
        
        // Get game area width for bird boundaries
        const gameAreaWidth = gameAreaRef.current?.offsetWidth || 600;
        
        const filteredBirds = newBirds.filter(bird => bird.phase !== 'disappeared' && bird.x > -100 && bird.x < gameAreaWidth + 100);
        
        // Spawn only 1 bird per game (1 in 800 chance per frame)
         if (Math.random() < 0.00125 && filteredBirds.length === 0) {
           filteredBirds.push({
             id: Date.now(),
             x: gameAreaWidth + 50,
             y: 150 + Math.random() * 100,
             vx: -0.8 - Math.random() * 0.8, // Slower horizontal speed
             vy: (Math.random() - 0.5) * 0.2, // Slower vertical speed
             hasLemon: false,
             phase: 'approaching', // approaching -> 4d_travel -> disappeared
             timer: 0,
             originalVx: -0.8 - Math.random() * 0.8, // Slower horizontal speed
             originalVy: (Math.random() - 0.5) * 0.2 // Slower vertical speed
           });
         }
        
        return filteredBirds;
      });
      
      // Check bird-lemon collision
      if (!isLemonCarried) {
        setBirds(prevBirds => {
          return prevBirds.map(bird => {
            const birdLeft = bird.x;
            const birdRight = bird.x + 40;
            const birdTop = bird.y;
            const birdBottom = bird.y + 30;
            
            const lemonLeft = lemonRef.current.x;
            const lemonRight = lemonLeft + LEMON_SIZE;
            const lemonTop = GAME_HEIGHT - 60 + lemonRef.current.y;
            const lemonBottom = lemonTop + LEMON_SIZE;
            
            // Check if lemon can avoid bird by jumping high enough
            const lemonIsHighEnough = lemonRef.current.y < -50; // Lemon needs to jump high to avoid bird
            
            if (birdRight > lemonLeft && birdLeft < lemonRight &&
                 birdBottom > lemonTop && birdTop < lemonBottom &&
                 bird.phase === 'approaching' && !lemonIsHighEnough) {
               
               // Pause the game when bird catches lemon
               setIsGamePaused(true);
               
               // Set lemon as carried
               setIsLemonCarried(true);
               setCarriedLemonPosition({ x: bird.x, y: bird.y + 20 });
               
               // Start with waiting phase for 1 second
               return { ...bird, phase: 'waiting_with_lemon', hasLemon: true, waitTimer: 0 };
             }
            return bird;
          });
        });
      }
      
      // Handle bird carrying lemon animation
        if (isLemonCarried && birdCarryRef.current) {
          const carry = birdCarryRef.current;
          carry.timer += 1;
          
          if (carry.phase === 'carrying' && carry.timer > 60) {
            // Switch to circling phase after initial carrying
            carry.phase = 'circling';
            carry.timer = 0;
          } else if (carry.phase === 'carrying') {
            // Bird carries lemon upward and can move outside game boundaries
            const carryTime = carry.timer * 0.05;
            const birdX = carry.birdStartX + Math.sin(carryTime) * 40;
            const birdY = carry.birdStartY - carry.timer * 1.2 + Math.cos(carryTime * 1.5) * 15;
            const lemonX = birdX;
            const lemonY = birdY + 20;
            
            // Update bird position in birds array
            setBirds(prevBirds => prevBirds.map(bird => 
              bird.hasLemon ? { ...bird, x: birdX, y: birdY } : bird
            ));
            setCarriedLemonPosition({ x: lemonX, y: lemonY });
          } else if (carry.phase === 'circling') {
            // Bird and lemon circle around the website in 4D-like pattern
            carry.circleAngle += 0.06;
            const spiralFactor = Math.sin(carry.timer * 0.03) * 50;
            const birdX = carry.centerX + Math.cos(carry.circleAngle) * (carry.circleRadius + spiralFactor);
            const birdY = carry.centerY + Math.sin(carry.circleAngle) * (carry.circleRadius + spiralFactor * 0.5) + Math.cos(carry.timer * 0.05) * 20;
            const lemonX = birdX;
            const lemonY = birdY + 20;
            
            // Update bird position
            setBirds(prevBirds => prevBirds.map(bird => 
              bird.hasLemon ? { ...bird, x: birdX, y: birdY } : bird
            ));
            setCarriedLemonPosition({ x: lemonX, y: lemonY });
            
            if (carry.timer > 240) { // 4 seconds of circling
              carry.phase = 'dropping';
              carry.timer = 0;
            }
          } else if (carry.phase === 'dropping') {
            // Bird drops lemon back to game area
            const dropX = 100 + Math.random() * 200;
            const dropY = GAME_HEIGHT - 100;
            
            // Animate drop
            const progress = carry.timer / 45; // 0.75 second drop
            if (progress >= 1) {
              // Lemon dropped, end game
              setIsLemonCarried(false);
              birdCarryRef.current = null;
              setIsGameOver(true);
              setIsGameActive(false);
              
              // Check for high score
              if (score > highScore) {
                setHighScore(score);
                localStorage.setItem('lemonGameHighScore', score);
              }
            } else {
              const currentBirdX = carry.centerX + (dropX - carry.centerX) * progress;
              const currentBirdY = carry.centerY + (dropY - carry.centerY) * progress;
              const currentLemonX = currentBirdX;
              const currentLemonY = currentBirdY + 20;
              
              // Update bird position
              setBirds(prevBirds => prevBirds.map(bird => 
                bird.hasLemon ? { ...bird, x: currentBirdX, y: currentBirdY } : bird
              ));
              setCarriedLemonPosition({ x: currentLemonX, y: currentLemonY });
            }
          }
        }
      
      // Check for game over conditions (only when lemon falls below ground)
      if (lemonRef.current.y > GAME_HEIGHT + 50) {
        setIsGameOver(true);
        setIsGameActive(false);
        
        // Check for high score and discount
        if (score > highScore) {
          setHighScore(score);
          localStorage.setItem('lemonGameHighScore', score);
        }
        
        // Award discount for score >= 10
        if (score >= 10) {
          setDiscountCode(generateDiscountCode());
        }
      }
      
      // Check collisions and score
      setCups(prevCups => {
        let newScore = score;
        const updatedCups = prevCups.map(cup => {
          // Check if lemon passed the cup
          if (!cup.passed && cup.x + CUP_WIDTH < 60) {
            newScore++;
            return { ...cup, passed: true };
          }
          
          // Check collision with water glass
          const lemonLeft = lemonRef.current.x;
          const lemonRight = lemonLeft + LEMON_SIZE;
          const lemonTop = GAME_HEIGHT - 60 + lemonRef.current.y;
          const lemonBottom = lemonTop + LEMON_SIZE;
          
          const cupLeft = cup.x;
          const cupRight = cup.x + CUP_WIDTH;
          const cupTop = GAME_HEIGHT - CUP_HEIGHT;
          const cupBottom = GAME_HEIGHT;
          
          if (lemonRight > cupLeft && lemonLeft < cupRight &&
              lemonBottom > cupTop && lemonTop < cupBottom &&
              !lemonadeCups.has(cup.id)) {
            // If lemon lands in water glass, turn it to lemonade and continue
            setLemonadeCups(prev => {
              const newLemonadeCups = new Set([...prev, cup.id]);
              // Check for win condition (3 lemonade cups)
               if (newLemonadeCups.size >= 3) {
                 // Create lemon pieces for splitting animation
                 const pieces = [];
                 for (let i = 0; i < 6; i++) {
                   pieces.push({
                     id: i,
                     x: lemonRef.current.x + (Math.random() - 0.5) * 20,
                     y: lemonRef.current.y + (Math.random() - 0.5) * 20,
                     vx: (Math.random() - 0.5) * 8,
                     vy: Math.random() * -5 - 2,
                     rotation: Math.random() * 360
                   });
                 }
                 setLemonPieces(pieces);
                 
                 // Delay game over to show animation
                 setTimeout(() => {
                   setIsWinner(true);
                   setIsGameOver(true);
                   setIsGameActive(false);
                   
                   // Check for high score and discount
                   if (newScore + 2 > highScore) {
                     setHighScore(newScore + 2);
                     localStorage.setItem('lemonGameHighScore', newScore + 2);
                   }
                   
                   // Award discount for winning
                   setDiscountCode(generateDiscountCode());
                 }, 1000);
               }
              return newLemonadeCups;
            });
            newScore += 2; // Bonus points for making lemonade
          }
          
          return cup;
        });
        
        if (newScore !== score) {
          setScore(newScore);
          // Increase speed every 5 points
          if (newScore % 5 === 0) {
            setGameSpeed(prev => Math.min(prev + 0.5, 8));
          }
        }
        
        return updatedCups;
      });
      
      if (isGameActive) {
        animationRef.current = requestAnimationFrame(gameLoop);
      }
    };
    
    animationRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isGameActive, score, gameSpeed, highScore, lemonadeCups, isLemonCarried]);
  
  // Homepage bird animation
  useEffect(() => {
    if (!homepageBird) return;
    
    const animateHomepageBird = () => {
      setHomepageBird(prevBird => {
        if (!prevBird) return null;
        
        const newTimer = prevBird.timer + 1;
        
        if (prevBird.phase === 'flying_to_top') {
          // Bird flies upward while screen scrolls to follow
          const newY = prevBird.y - 1.5; // Move up 1.5 pixels per frame (slower)
          
          // Scroll the page to follow the bird
          const scrollTarget = Math.max(0, window.innerHeight - newY - 200);
          window.scrollTo({
            top: scrollTarget,
            behavior: 'smooth'
          });
          
          // When bird reaches top of screen, stop and stay there
          if (newY <= 50) {
            return {
              ...prevBird,
              y: 50,
              phase: 'at_top',
              timer: 0
            };
          }
          
          return {
            ...prevBird,
            y: newY,
            timer: newTimer
          };
        } else if (prevBird.phase === 'at_top') {
          // Bird stays at top for a while, then disappears
          if (newTimer > 180) { // 3 seconds at 60fps
            setIsGamePaused(false); // Resume game when homepage bird disappears
            return null;
          }
          
          return {
            ...prevBird,
            timer: newTimer
          };
        }
        
        // Default behavior (should not reach here with new logic)
        return {
          ...prevBird,
          timer: newTimer
        };
      });
      
      if (homepageBird) {
        requestAnimationFrame(animateHomepageBird);
      }
    };
    
    requestAnimationFrame(animateHomepageBird);
  }, [homepageBird]);
  
  // Start game
  const startGame = () => {
    setIsGameActive(true);
    setIsGameOver(false);
    setIsWinner(false);
    setScore(0);
    setLemonY(0);
    setLemonX(60);
    setCups([]);
    setLemonadeCups(new Set());
    setLemonPieces([]);
    setBirds([]);
    setCameraOffset(0);
    setIsLemonCarried(false);
    setCarriedLemonPosition({ x: 0, y: 0 });
    setGameSpeed(2);
    setIsJumping(false);
    setIsGamePaused(false);
    setHomepageBird(null);
    lemonRef.current = { y: 0, velocity: 0, isJumping: false, x: 60, horizontalVelocity: 0 };
    birdCarryRef.current = null;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-lemonYellow to-limeGreen py-4 px-6">
        <h2 className="text-2xl font-bold text-gray-900">Lemon Runner Game</h2>
        <p className="text-gray-700">Help the lemon jump over cups! Make 3 lemonade cups to win or score 10+ for a discount!</p>
      </div>
      
      <div className="p-6">
        {!isGameActive && !isGameOver ? (
          <div>
            <div className="text-center py-4">
              <p className="text-lg text-gray-700 mb-4">
                Press SPACE or click to make the lemon jump over water glasses. 
                Turn water into lemonade! Make 3 lemonade cups to win or score 10+ for a discount!
              </p>
              <motion.button
                onClick={startGame}
                className="bg-orange hover:bg-orange/90 text-white font-medium py-3 px-6 rounded-lg text-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Game
              </motion.button>
              {highScore > 0 && (
                <p className="mt-4 text-gray-600">High Score: {highScore}</p>
              )}
            </div>
            
            {/* Preview Game Area */}
            <div className="py-4">
              <div 
                className="relative bg-gradient-to-b from-blue-200 to-green-200 border-2 border-gray-300 rounded-lg overflow-hidden"
                style={{ height: GAME_HEIGHT, width: '100%' }}
              >
                {/* Ground */}
                <div 
                  className="absolute bottom-0 w-full bg-green-400"
                  style={{ height: '20px' }}
                />
                
                {/* Static Lemon */}
                <div
                  className="absolute text-3xl"
                  style={{
                    left: '60px',
                    bottom: '60px',
                    fontSize: '40px'
                  }}
                >
                  🍋
                </div>
                
                {/* Sample Water Glasses */}
                <div
                  className="absolute"
                  style={{
                    left: '200px',
                    bottom: '20px',
                    fontSize: '30px'
                  }}
                >
                  🥛
                </div>
                <div
                  className="absolute"
                  style={{
                    left: '300px',
                    bottom: '20px',
                    fontSize: '30px'
                  }}
                >
                  🥛
                </div>
                <div
                  className="absolute"
                  style={{
                    left: '400px',
                    bottom: '20px',
                    fontSize: '30px'
                  }}
                >
                  🍹
                </div>
                
                {/* Instructions */}
                <div className="absolute top-4 left-4 text-sm text-gray-600">
                  Make 3 lemonade cups to win! Jump over or land in water glasses.
                </div>
              </div>
            </div>
          </div>
        ) : isGameOver ? (
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              {isWinner ? (
                <>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">You Win! 🎉</h3>
                  <p className="text-lg text-gray-700 mb-2">You made 3 lemonade cups!</p>
                  <p className="text-lg text-gray-700 mb-2">Final Score: {score}</p>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-red-600 mb-2">Game Over!</h3>
                  <p className="text-lg text-gray-700 mb-2">Final Score: {score}</p>
                </>
              )}
              {score > highScore && (
                <p className="text-lg text-green-600 font-bold">New High Score! 🎉</p>
              )}
              {discountCode && (
                <div className="mt-4 bg-gray-100 p-4 rounded-lg inline-block">
                  <p className="text-sm text-gray-600 mb-1">You earned a discount code!</p>
                  <p className="text-2xl font-mono font-bold tracking-wider text-orange">{discountCode}</p>
                  <p className="mt-2 text-sm text-gray-600">
                    Use this code for 10% off your next purchase!
                  </p>
                </div>
              )}
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
          <div className="py-4">
            {/* Score Display - Above game area */}
            <div className="flex justify-between items-center mb-2 px-2">
              <div className="text-lg font-bold text-white bg-black bg-opacity-50 px-3 py-1 rounded">
                Score: {score}
              </div>
              <div className="text-lg font-bold text-white bg-black bg-opacity-50 px-3 py-1 rounded">
                High: {highScore}
              </div>
            </div>
            
            {/* Game Area */}
            <div 
              ref={gameAreaRef}
              className="relative bg-gradient-to-b from-blue-200 to-green-200 border-2 border-gray-300 rounded-lg overflow-hidden cursor-pointer"
              style={{ height: GAME_HEIGHT, width: '100%' }}
              onClick={jump}
            >
              {/* Camera container */}
              <div 
                className="absolute inset-0"
                style={{ transform: `translateX(-${cameraOffset}px)` }}
              >
                {/* Ground */}
                <div 
                  className="absolute bottom-0 bg-green-400"
                  style={{ height: '20px', width: '2000px' }}
                />
                
                {/* Lemon */}
                {lemonPieces.length === 0 && !isLemonCarried && (
                  <motion.div
                    className="absolute text-3xl"
                    style={{
                      left: `${lemonX}px`,
                      bottom: `${60 - lemonY}px`,
                      fontSize: '40px'
                    }}
                    animate={{
                      rotate: isJumping ? [0, 360] : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    🍋
                  </motion.div>
                )}
                
                {/* Lemon Pieces (splitting animation) */}
                {lemonPieces.map(piece => (
                  <motion.div
                    key={piece.id}
                    className="absolute text-lg"
                    style={{
                      left: `${piece.x}px`,
                      bottom: `${60 - piece.y}px`,
                      fontSize: '20px',
                      transform: `rotate(${piece.rotation}deg)`
                    }}
                  >
                    🍋
                  </motion.div>
                ))}
                
                {/* Water Glasses / Lemonade */}
                {cups.map(cup => (
                  <div
                    key={cup.id}
                    className="absolute"
                    style={{
                      left: `${cup.x}px`,
                      bottom: '20px',
                      fontSize: '30px'
                    }}
                  >
                    {lemonadeCups.has(cup.id) ? '🍹' : '🥛'}
                  </div>
                ))}
                
                {/* Birds (only show birds that are not carrying lemon) */}
                {birds.filter(bird => !bird.hasLemon).map(bird => (
                  <motion.div
                    key={bird.id}
                    className="absolute text-2xl"
                    style={{
                      left: `${bird.x}px`,
                      bottom: `${GAME_HEIGHT - bird.y}px`,
                      fontSize: '30px',
                      transform: bird.vx < 0 ? 'scaleX(-1)' : 'scaleX(1)'
                    }}
                    animate={{
                      y: [0, -5, 0]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    🦅
                  </motion.div>
                ))}
              </div>
              
              
              {/* Carried Lemon (outside camera container for website-wide movement) */}
              {isLemonCarried && (
                <motion.div
                  className="absolute text-3xl z-50"
                  style={{
                    left: `${carriedLemonPosition.x}px`,
                    top: `${carriedLemonPosition.y}px`,
                    fontSize: '40px',
                    pointerEvents: 'none'
                  }}
                  animate={{
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  🍋
                </motion.div>
              )}
              
              {/* Birds carrying lemon (outside camera container for website-wide movement) */}
              {birds.filter(bird => bird.hasLemon && bird.phase !== 'special_sequence').map(bird => (
                <motion.div
                  key={`carrying-${bird.id}`}
                  className="absolute text-2xl z-40"
                  style={{
                    left: `${bird.x}px`,
                    top: `${bird.y}px`,
                    fontSize: '30px',
                    transform: bird.vx < 0 ? 'scaleX(-1)' : 'scaleX(1)',
                    pointerEvents: 'none'
                  }}
                  animate={{
                    y: [0, -5, 0]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🦅
                </motion.div>
              ))}
              
              {/* Special sequence bird (can move anywhere on the page) */}
              {isSpecialSequence && (
                <motion.div
                  className="fixed text-3xl z-50"
                  style={{
                    fontSize: '40px',
                    pointerEvents: 'none'
                  }}
                  animate={{
                    x: sequencePhase === 'flying_up' ? [carriedLemonPosition.x, window.innerWidth / 2] :
                       sequencePhase === 'scrolling_to_text' ? window.innerWidth / 2 :
                       sequencePhase === 'at_text' ? window.innerWidth / 2 :
                       sequencePhase === 'returning' ? [window.innerWidth / 2, carriedLemonPosition.x] :
                       carriedLemonPosition.x,
                    y: sequencePhase === 'flying_up' ? [carriedLemonPosition.y, 50] :
                       sequencePhase === 'scrolling_to_text' ? 50 :
                       sequencePhase === 'at_text' ? [50, 100, 50] :
                       sequencePhase === 'returning' ? [50, carriedLemonPosition.y] :
                       carriedLemonPosition.y,
                    rotate: [0, 360]
                  }}
                  transition={{
                    x: { duration: sequencePhase === 'at_text' ? 0 : 2, ease: "easeInOut" },
                    y: { duration: sequencePhase === 'at_text' ? 2 : 2, ease: "easeInOut", repeat: sequencePhase === 'at_text' ? Infinity : 0 },
                    rotate: { duration: 3, repeat: Infinity, ease: "linear" }
                  }}
                >
                  🦅🍋
                </motion.div>
              )}
              
              {/* Homepage bird (flies around the entire page) */}
              {homepageBird && (
                <motion.div
                  className="fixed text-3xl z-50"
                  style={{
                    left: `${homepageBird.x}px`,
                    top: `${homepageBird.y}px`,
                    fontSize: '40px',
                    pointerEvents: 'none'
                  }}
                  animate={{
                    rotate: [0, 360]
                  }}
                  transition={{
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" }
                  }}
                >
                  🦅🍋
                </motion.div>
              )}
              
              {/* Instructions */}
              <div className="absolute top-4 left-4 text-sm text-gray-600 z-10">
                Jump over or land in water glasses! Jump high to avoid birds!<br/>
                {isSpecialSequence && <span className="text-blue-600 font-bold">🦅 Special Mission: Bird is delivering the Word! 🍋</span>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LemonGame;