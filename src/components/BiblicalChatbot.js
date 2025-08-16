import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateBiblicalResponse, isGoogleAIConfigured } from '../lib/googleAI';

const BiblicalChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome! I'm here to share biblical wisdom and provide spiritual encouragement. You can ask me about prayer, faith, love, forgiveness, hope, peace, wisdom, strength, or guidance. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    },
    {
      id: 2,
      text: "Try asking me: 'I need prayer' or 'Tell me about faith' or 'I need hope'",
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
      "Grace and peace! I'm here to help with any biblical questions you have.",
      "Welcome! I'm here to share biblical wisdom and provide spiritual encouragement. What's on your heart?"
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
    ],
    wisdom: [
      "James 1:5 tells us 'If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.'",
      "Proverbs 9:10 says 'The fear of the Lord is the beginning of wisdom, and knowledge of the Holy One is understanding.'",
      "Proverbs 3:5-6 reminds us to 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.'"
    ],
    strength: [
      "Isaiah 40:31 promises 'But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.'",
      "Philippians 4:13 declares 'I can do all this through him who gives me strength.'",
      "2 Corinthians 12:9 reminds us that God's 'power is made perfect in weakness.'"
    ],
    guidance: [
      "Psalm 32:8 says 'I will instruct you and teach you in the way you should go; I will counsel you with my loving eye on you.'",
      "Proverbs 16:9 tells us 'In their hearts humans plan their course, but the Lord establishes their steps.'",
      "Jeremiah 29:11 declares 'For I know the plans I have for you, plans to prosper you and not to harm you, to give you hope and a future.'"
    ]
  };

  const getRandomResponse = (responses) => {
    if (!responses || responses.length === 0) {
      console.error('No responses available for this category');
      return "I apologize, but I'm having trouble finding a response for that topic. Please try asking about prayer, faith, love, or another biblical topic.";
    }
    const response = responses[Math.floor(Math.random() * responses.length)];
    console.log('Selected response:', response);
    return response;
  };

  const generateFallbackResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    console.log('Processing message with fallback:', message);
    
    // Check for greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('greetings') || message.includes('good morning') || message.includes('good evening')) {
      console.log('Matched greetings');
      return getRandomResponse(biblicalResponses.greetings);
    }
    
    // Check for prayer-related keywords
    if (message.includes('pray') || message.includes('prayer') || message.includes('praying')) {
      console.log('Matched prayer');
      return getRandomResponse(biblicalResponses.prayer);
    }
    
    // Check for faith-related keywords
    if (message.includes('faith') || message.includes('believe') || message.includes('trust') || message.includes('believing')) {
      console.log('Matched faith');
      return getRandomResponse(biblicalResponses.faith);
    }
    
    // Check for love-related keywords
    if (message.includes('love') || message.includes('loving') || message.includes('compassion') || message.includes('kindness')) {
      console.log('Matched love');
      return getRandomResponse(biblicalResponses.love);
    }
    
    // Check for forgiveness-related keywords
    if (message.includes('forgive') || message.includes('forgiveness') || message.includes('mercy') || message.includes('sin') || message.includes('repent')) {
      return getRandomResponse(biblicalResponses.forgiveness);
    }
    
    // Check for hope-related keywords
    if (message.includes('hope') || message.includes('hopeless') || message.includes('despair') || message.includes('discouraged') || message.includes('depression')) {
      return getRandomResponse(biblicalResponses.hope);
    }
    
    // Check for peace-related keywords
    if (message.includes('peace') || message.includes('peaceful') || message.includes('anxiety') || message.includes('worry') || message.includes('stress') || message.includes('calm')) {
      return getRandomResponse(biblicalResponses.peace);
    }
    
    // Check for wisdom-related keywords
    if (message.includes('wisdom') || message.includes('wise') || message.includes('decision') || message.includes('choice')) {
      return getRandomResponse(biblicalResponses.wisdom);
    }
    
    // Check for strength-related keywords
    if (message.includes('strength') || message.includes('strong') || message.includes('weak') || message.includes('tired') || message.includes('exhausted') || message.includes('power')) {
      return getRandomResponse(biblicalResponses.strength);
    }
    
    // Check for guidance-related keywords
    if (message.includes('guide') || message.includes('guidance') || message.includes('path') || message.includes('way') || message.includes('lost') || message.includes('confused') || message.includes('plan')) {
      return getRandomResponse(biblicalResponses.guidance);
    }
    
    // Default response with more helpful suggestions
    console.log('Using default response');
    return "I'd be happy to help you explore God's Word! You can ask me about prayer, faith, love, forgiveness, hope, peace, wisdom, strength, or guidance. Feel free to share what's on your heart, and I'll do my best to provide biblical encouragement.";
  };

  const generateResponse = async (userMessage) => {
    // Try Google AI first if configured
    if (isGoogleAIConfigured()) {
      try {
        console.log('Using Google AI for response');
        const aiResponse = await generateBiblicalResponse(userMessage);
        return aiResponse;
      } catch (error) {
        console.error('Google AI failed, falling back to predefined responses:', error);
        // Fall back to predefined responses if AI fails
        return generateFallbackResponse(userMessage);
      }
    } else {
      console.log('Google AI not configured, using fallback responses');
      return generateFallbackResponse(userMessage);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage.trim();
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay for more natural conversation
    setTimeout(async () => {
      try {
        const responseText = await generateResponse(currentInput);
        const botResponse = {
          id: Date.now() + 1,
          text: responseText,
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botResponse]);
      } catch (error) {
        console.error('Error generating response:', error);
        const errorResponse = {
          id: Date.now() + 1,
          text: "I apologize, but I'm having trouble responding right now. Please try asking again, and I'll do my best to help you with biblical guidance.",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorResponse]);
      } finally {
        setIsTyping(false);
      }
    }, 800 + Math.random() * 800);
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