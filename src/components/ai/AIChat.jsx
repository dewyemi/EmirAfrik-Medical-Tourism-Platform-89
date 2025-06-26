import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiX, FiSend, FiBot, FiUser } = FiIcons;

const AIChat = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hello! I\'m your EMIRAFRIK AI assistant. How can I help you with your medical tourism journey today?',
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

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('cost') || input.includes('price') || input.includes('payment')) {
      return 'Our treatment packages vary based on your specific medical needs and chosen tourism options. I can connect you with a care coordinator who will provide detailed pricing information tailored to your requirements. Would you like me to schedule a consultation?';
    }
    
    if (input.includes('process') || input.includes('steps') || input.includes('how')) {
      return 'Our medical tourism process includes 20 comprehensive steps: from initial consultation and medical assessment to treatment planning, travel arrangements, medical care, and post-treatment follow-up. Each step is carefully coordinated by our AI-assisted team. Would you like me to explain any specific step in detail?';
    }
    
    if (input.includes('hospital') || input.includes('doctor') || input.includes('specialist')) {
      return 'We partner with over 50 premium hospitals and medical centers across the UAE, featuring world-renowned specialists in various fields. Based on your medical condition, I can recommend the most suitable facilities and doctors. What type of medical treatment are you seeking?';
    }
    
    if (input.includes('travel') || input.includes('visa') || input.includes('accommodation')) {
      return 'We handle all travel arrangements including visa assistance, flight bookings, luxury accommodation, and local transportation. Our packages can include tourism activities and cultural experiences in Dubai and the UAE. Would you like information about our travel packages?';
    }
    
    if (input.includes('appointment') || input.includes('consultation') || input.includes('schedule')) {
      return 'I can help you schedule a consultation with our medical team. We offer virtual consultations for initial assessments and in-person meetings in Dubai. What type of consultation would you prefer, and what is your preferred timeframe?';
    }
    
    return 'Thank you for your question. I\'m here to assist you with information about our medical tourism services, treatment options, travel arrangements, and more. Could you please provide more specific details about what you\'d like to know? I can also connect you with one of our human specialists for personalized assistance.';
  };

  const quickActions = [
    'Tell me about the 20-step process',
    'What are the costs involved?',
    'Schedule a consultation',
    'Available medical specialties',
    'Travel and accommodation options'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl z-50 flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-emerald-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiBot} className="w-5 h-5" />
              <span className="font-semibold">EMIRAFRIK AI Assistant</span>
            </div>
            <button
              onClick={onToggle}
              className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded"
            >
              <SafeIcon icon={FiX} className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === 'ai' && (
                      <SafeIcon icon={FiBot} className="w-4 h-4 mt-0.5 text-primary-600" />
                    )}
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiBot} className="w-4 h-4 text-primary-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="p-4 border-t">
              <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
              <div className="space-y-1">
                {quickActions.slice(0, 3).map((action, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(action)}
                    className="w-full text-left text-xs bg-gray-50 hover:bg-gray-100 p-2 rounded transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <SafeIcon icon={FiSend} className="w-4 h-4" />
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIChat;