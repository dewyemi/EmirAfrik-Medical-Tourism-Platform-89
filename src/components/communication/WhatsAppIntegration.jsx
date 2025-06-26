import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiMessageCircle, FiCheck, FiClock, FiSend, FiPhone, FiBell, FiSettings } = FiIcons;

const WhatsAppIntegration = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [notifications, setNotifications] = useState({
    appointments: true,
    documents: true,
    payments: true,
    emergencies: true,
    updates: false
  });

  const whatsappFeatures = [
    {
      icon: FiBell,
      title: 'Appointment Reminders',
      description: 'Get timely reminders for upcoming appointments and consultations',
      active: notifications.appointments
    },
    {
      icon: FiCheck,
      title: 'Document Status Updates',
      description: 'Instant notifications when your documents are reviewed or approved',
      active: notifications.documents
    },
    {
      icon: FiPhone,
      title: 'Payment Confirmations',
      description: 'Receive payment receipts and transaction confirmations',
      active: notifications.payments
    },
    {
      icon: FiMessageCircle,
      title: 'Treatment Updates',
      description: 'Real-time updates on your treatment progress and next steps',
      active: notifications.updates
    }
  ];

  const quickCommands = [
    { command: 'STATUS', description: 'Check your application status' },
    { command: 'APPOINTMENTS', description: 'View upcoming appointments' },
    { command: 'DOCUMENTS', description: 'Check document requirements' },
    { command: 'PAYMENT', description: 'View payment information' },
    { command: 'HELP', description: 'Get assistance from our team' },
    { command: 'EMERGENCY', description: 'Connect to emergency support' }
  ];

  const conversationFlow = [
    {
      type: 'received',
      message: 'Welcome to EMIRAFRIK! 🏥 How can I assist you today?',
      time: '10:00 AM',
      options: ['Check Status', 'Book Appointment', 'Need Help']
    },
    {
      type: 'sent',
      message: 'Check Status',
      time: '10:01 AM'
    },
    {
      type: 'received',
      message: 'Your application is currently in Step 8 of 20 - Document Review. We are reviewing your submitted medical records. Expected completion: 2-3 business days. 📋',
      time: '10:01 AM'
    },
    {
      type: 'received',
      message: 'Would you like to:\n1️⃣ Upload additional documents\n2️⃣ Schedule a consultation\n3️⃣ Ask a question',
      time: '10:02 AM'
    }
  ];

  const handleConnectWhatsApp = () => {
    if (phoneNumber) {
      // Simulate connection
      setIsConnected(true);
      alert('WhatsApp connected successfully! You will start receiving notifications.');
    }
  };

  const handleNotificationToggle = (type) => {
    setNotifications({
      ...notifications,
      [type]: !notifications[type]
    });
  };

  const sendTestMessage = () => {
    alert('Test message sent to your WhatsApp! Please check your phone.');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-green-100 p-2 rounded-lg">
            <SafeIcon icon={FiMessageCircle} className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">WhatsApp Integration</h1>
            <p className="text-gray-600">Stay connected and get instant updates via WhatsApp</p>
          </div>
        </div>

        {/* Connection Status */}
        <div className={`p-4 rounded-lg border ${
          isConnected ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
        }`}>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              isConnected ? 'bg-green-500' : 'bg-yellow-500'
            }`}></div>
            <span className={`font-medium ${
              isConnected ? 'text-green-800' : 'text-yellow-800'
            }`}>
              {isConnected ? 'WhatsApp Connected' : 'WhatsApp Not Connected'}
            </span>
          </div>
          <p className={`text-sm mt-1 ${
            isConnected ? 'text-green-700' : 'text-yellow-700'
          }`}>
            {isConnected 
              ? 'You\'re all set to receive notifications and interact via WhatsApp'
              : 'Connect your WhatsApp to get instant notifications and support'
            }
          </p>
        </div>
      </div>

      {/* Setup Section */}
      {!isConnected && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect Your WhatsApp</h3>
          <div className="max-w-md space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp Phone Number
              </label>
              <div className="relative">
                <SafeIcon icon={FiPhone} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+971 50 123 4567"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Make sure this is the number you use for WhatsApp
              </p>
            </div>
            <button
              onClick={handleConnectWhatsApp}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiMessageCircle} className="w-4 h-4" />
              <span>Connect WhatsApp</span>
            </button>
          </div>
        </div>
      )}

      {/* Features Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">WhatsApp Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {whatsappFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg"
            >
              <div className="bg-green-100 p-2 rounded-lg">
                <SafeIcon icon={feature.icon} className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
              <div className={`w-4 h-4 rounded-full ${
                feature.active ? 'bg-green-500' : 'bg-gray-300'
              }`}></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Notification Settings */}
      {isConnected && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
            <button
              onClick={sendTestMessage}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
            >
              Send Test Message
            </button>
          </div>
          
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <h4 className="font-medium text-gray-900 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()} Notifications
                  </h4>
                  <p className="text-sm text-gray-600">
                    Receive WhatsApp notifications for {key.toLowerCase()}
                  </p>
                </div>
                <button
                  onClick={() => handleNotificationToggle(key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    value ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Commands */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Commands</h3>
        <p className="text-gray-600 mb-6">
          Send these commands to our WhatsApp bot for instant information
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickCommands.map((cmd, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-mono">
                {cmd.command}
              </span>
              <span className="text-gray-700 text-sm">{cmd.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Conversation Preview */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversation Preview</h3>
        <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
          <div className="space-y-3">
            {conversationFlow.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.type === 'sent'
                      ? 'bg-green-600 text-white'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.message}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'sent' ? 'text-green-100' : 'text-gray-500'
                  }`}>
                    {message.time}
                  </p>
                  {message.options && (
                    <div className="mt-2 space-y-1">
                      {message.options.map((option, optionIndex) => (
                        <button
                          key={optionIndex}
                          className="block w-full text-left px-2 py-1 bg-emerald-100 text-emerald-800 rounded text-xs hover:bg-emerald-200 transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Support */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <SafeIcon icon={FiBell} className="w-6 h-6 text-red-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-800 mb-2">Emergency WhatsApp Support</h3>
            <p className="text-red-700 text-sm mb-3">
              For urgent medical assistance, send "EMERGENCY" to our WhatsApp number or call our 24/7 hotline.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://wa.me/971501234567?text=EMERGENCY"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors inline-flex items-center space-x-2"
              >
                <SafeIcon icon={FiMessageCircle} className="w-4 h-4" />
                <span>Emergency WhatsApp</span>
              </a>
              <a
                href="tel:+971501234567"
                className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm hover:bg-red-200 transition-colors inline-flex items-center space-x-2"
              >
                <SafeIcon icon={FiPhone} className="w-4 h-4" />
                <span>Call Emergency</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppIntegration;