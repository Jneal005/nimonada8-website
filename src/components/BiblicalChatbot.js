import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BiblicalChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm here to help you with biblical questions and provide spiritual guidance. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Biblical responses database
  const biblicalResponses = {
    greetings: [
      "Peace be with you! How can I help you in your spiritual journey today?",
      "Blessings to you! What would you like to explore in God's Word?",
      "Grace and peace! I'm here to help with any biblical questions you have."
    ],
    prayer: [
      "Prayer is our direct line to God. As it says in Philippians 4:6-7, 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.'",
      "Jesus taught us to pray in Matthew 6:9-13. Remember, God hears every prayer and knows your heart before you even speak.",
      "1 Thessalonians 5:17 reminds us to 'pray continually.' God is always listening and ready to comfort you."
    ],
    faith: [
      "Faith is the foundation of our relationship with God. Hebrews 11:1 tells us 'Now faith is confidence in what we hope for and assurance about what we do not see.'",
      "Even when faith feels small, remember Matthew 17:20 - 'If you have faith as small as a mustard seed, you can say to this mountain, 'Move from here to there,' and it will move.'",
      "Romans 10:17 reminds us that 'faith comes from hearing the message, and the message is heard through the word about Christ.'"
    ],
    love: [
      "God's love for us is unconditional. Romans 8:38-39 assures us that nothing can separate us from the love of God that is in Christ Jesus our Lord.",
      "1 John 4:19 reminds us 'We love because he first loved us.' God's love enables us to love others.",
      "The greatest commandments are to love God and love your neighbor as yourself (Matthew 22:37-39)."
    ],
    forgiveness: [
      "God's forgiveness is complete and available to all. 1 John 1:9 says 'If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.'",
      "Jesus taught us to forgive others as we have been forgiven (Matthew 6:14-15). Forgiveness brings freedom to both the forgiver and the forgiven.",
      "Ephesians 4:32 encourages us to 'Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.'"
    ],
    hope: [
      "Our hope is anchored in Christ. Romans 15:13 says 'May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.'",
      "Even in difficult times, we have hope. Romans 8:28 reminds us that 'in all things God works for the good of those who love him.'",
      "Jeremiah 29:11 declares God's plans for us: 'For I know the plans I have for you, plans to prosper you and not to harm you, to give you hope and a future.'"
    ],
    peace: [
      "Jesus is our peace. In John 14:27, He says 'Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.'",
      "Philippians 4:7 speaks of 'the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.'",
      "Isaiah 26:3 promises 'You will keep in perfect peace those whose minds are steadfast, because they trust in you.'"
    ]
  };

  const getRandomResponse = (category) => {
    const responses = biblicalResponses[category];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Greeting patterns
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return getRandomResponse('greetings');
    }
    
    // Prayer-related
    if (message.includes('pray') || message.includes('prayer')) {
      return getRandomResponse('prayer');
    }
    
    // Faith-related
    if (message.includes('faith') || message.includes('believe') || message.includes('trust')) {
      return getRandomResponse('faith');
    }
    
    // Love-related
    if (message.includes('love') || message.includes('loving')) {
      return getRandomResponse('love');
    }
    
    // Forgiveness-related
    if (message.includes('forgive') || message.includes('forgiveness') || message.includes('sin')) {
      return getRandomResponse('forgiveness');
    }
    
    // Hope-related
    if (message.includes('hope') || message.includes('hopeless') || message.includes('despair')) {
      return getRandomResponse('hope');
    }
    
    // Peace-related
    if (message.includes('peace') || message.includes('anxiety') || message.includes('worry') || message.includes('stress')) {
      return getRandomResponse('peace');
    }
    
    // Default response
    return "That's a thoughtful question. While I can share biblical wisdom, I encourage you to also pray about this and seek guidance from your pastor or spiritual mentor. Is there a specific Bible verse or topic you'd like to explore?";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: generateResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 h-96 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg">
        <h3 className="text-lg font-semibold flex items-center">
          <span className="mr-2">📖</span>
          Biblical AI Assistant
        </h3>
        <p className="text-sm opacity-90">Ask me about faith, prayer, and biblical wisdom</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask me about faith, prayer, or biblical wisdom..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={isTyping || !inputMessage.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default BiblicalChatbot;