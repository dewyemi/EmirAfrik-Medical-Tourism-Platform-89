import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiMessageSquare, FiPhone, FiMail, FiSend, FiUser, FiClock } = FiIcons;

const CommunicationCenter = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      patientName: 'Ahmed Al-Mansouri',
      patientId: 'EA-001',
      lastMessage: 'Thank you for the update on my test results.',
      timestamp: '10:30 AM',
      unread: 2,
      type: 'inquiry',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 2,
      patientName: 'Fatima Hassan',
      patientId: 'EA-002',
      lastMessage: 'When should I arrive for my pre-op appointment?',
      timestamp: 'Yesterday',
      unread: 0,
      type: 'appointment',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 3,
      patientName: 'Mohammed Al-Zahra',
      patientId: 'EA-003',
      lastMessage: 'Payment has been processed successfully.',
      timestamp: '2 hours ago',
      unread: 1,
      type: 'payment',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    }
  ];

  const messages = selectedConversation ? [
    {
      id: 1,
      sender: 'patient',
      content: 'Hello, I have some questions about my upcoming procedure.',
      timestamp: '2:30 PM',
      read: true
    },
    {
      id: 2,
      sender: 'employee',
      content: 'Hello! I\'d be happy to help you with any questions. What would you like to know?',
      timestamp: '2:35 PM',
      read: true
    },
    {
      id: 3,
      sender: 'patient',
      content: 'What time should I arrive on the day of my procedure?',
      timestamp: '2:40 PM',
      read: true
    },
    {
      id: 4,
      sender: 'employee',
      content: 'Please arrive at 7:00 AM for your pre-procedure preparation. The actual procedure is scheduled for 9:00 AM.',
      timestamp: '2:42 PM',
      read: true
    }
  ] : [];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      setNewMessage('');
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'inquiry':
        return 'bg-blue-100 text-blue-800';
      case 'appointment':
        return 'bg-green-100 text-green-800';
      case 'payment':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-[600px] bg-white rounded-lg shadow-sm flex">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
        </div>
        
        <div className="overflow-y-auto h-full">
          {conversations.map((conversation) => (
            <motion.div
              key={conversation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedConversation?.id === conversation.id ? 'bg-blue-50' : ''
              }`}
              onClick={() => setSelectedConversation(conversation)}
            >
              <div className="flex items-start space-x-3">
                <img
                  src={conversation.avatar}
                  alt={conversation.patientName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {conversation.patientName}
                    </h3>
                    <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 truncate mb-2">
                    {conversation.lastMessage}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(conversation.type)}`}>
                      {conversation.type}
                    </span>
                    
                    {conversation.unread > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedConversation.avatar}
                    alt={selectedConversation.patientName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedConversation.patientName}</h3>
                    <p className="text-sm text-gray-500">ID: {selectedConversation.patientId}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                    <SafeIcon icon={FiPhone} className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                    <SafeIcon icon={FiMail} className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'employee' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.sender === 'employee'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'employee' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <SafeIcon icon={FiSend} className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <SafeIcon icon={FiMessageSquare} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-600">Choose a patient conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunicationCenter;