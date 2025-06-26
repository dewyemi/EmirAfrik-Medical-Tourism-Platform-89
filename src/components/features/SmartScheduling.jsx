import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiCalendar, FiClock, FiMapPin, FiUser, FiZap, FiCheckCircle, FiAlertTriangle } = FiIcons;

const SmartScheduling = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [preferences, setPreferences] = useState({
    timeOfDay: 'morning',
    doctorGender: 'any',
    language: 'english',
    urgency: 'normal'
  });

  const aiRecommendations = [
    {
      id: 1,
      type: 'Optimal Timing',
      title: 'Best Time for Your Procedure',
      description: 'Based on your medical history and recovery patterns, Tuesday-Thursday mornings show 23% better outcomes.',
      confidence: 87,
      icon: FiClock,
      color: 'blue'
    },
    {
      id: 2,
      type: 'Doctor Match',
      title: 'Recommended Specialist',
      description: 'Dr. Ahmed Al-Rashid has 95% success rate for your condition and speaks Arabic fluently.',
      confidence: 92,
      icon: FiUser,
      color: 'green'
    },
    {
      id: 3,
      type: 'Travel Optimization',
      title: 'Reduced Travel Time',
      description: 'Scheduling on Jan 28th allows combining 3 appointments in one trip, saving 2 days.',
      confidence: 78,
      icon: FiMapPin,
      color: 'purple'
    }
  ];

  const smartSuggestions = [
    {
      date: '2024-01-28',
      time: '09:00 AM',
      doctor: 'Dr. Ahmed Al-Rashid',
      type: 'Initial Consultation',
      duration: '45 mins',
      optimizationScore: 95,
      benefits: ['Optimal recovery timing', 'Doctor availability', 'Reduced waiting time']
    },
    {
      date: '2024-01-29',
      time: '02:00 PM',
      doctor: 'Dr. Sarah Al-Mahmoud',
      type: 'Pre-operative Assessment',
      duration: '30 mins',
      optimizationScore: 88,
      benefits: ['Same-day lab results', 'Combined appointments', 'Travel efficiency']
    },
    {
      date: '2024-02-02',
      time: '08:00 AM',
      doctor: 'Dr. Hassan Al-Zahra',
      type: 'Surgical Procedure',
      duration: '3 hours',
      optimizationScore: 92,
      benefits: ['Peak performance hours', 'Fresh medical team', 'Optimal room availability']
    }
  ];

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100';
    if (confidence >= 75) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-gradient-to-r from-primary-600 to-emerald-600 p-2 rounded-lg">
            <SafeIcon icon={FiZap} className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Smart Scheduling</h1>
            <p className="text-gray-600">AI-powered appointment optimization for better outcomes</p>
          </div>
        </div>

        {/* AI Status */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiZap} className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">AI Analysis Complete</span>
          </div>
          <p className="text-sm text-blue-700 mt-1">
            Analyzed 1,247 similar cases and 15 factors to optimize your schedule
          </p>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiRecommendations.map((rec, index) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border-2 border-${rec.color}-200 rounded-lg p-4 hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`bg-${rec.color}-100 p-2 rounded-lg`}>
                  <SafeIcon icon={rec.icon} className={`w-5 h-5 text-${rec.color}-600`} />
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getConfidenceColor(rec.confidence)}`}>
                  {rec.confidence}% confidence
                </span>
              </div>
              
              <div className="text-xs text-gray-500 mb-1">{rec.type}</div>
              <h4 className="font-semibold text-gray-900 mb-2">{rec.title}</h4>
              <p className="text-sm text-gray-600">{rec.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Smart Suggestions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimized Schedule</h3>
        
        <div className="space-y-4">
          {smartSuggestions.map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                      <SafeIcon icon={FiCalendar} className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{suggestion.type}</h4>
                      <p className="text-sm text-gray-600">with {suggestion.doctor}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <div className="text-xs text-gray-500">Date & Time</div>
                      <div className="text-sm font-medium">{suggestion.date}</div>
                      <div className="text-sm text-gray-600">{suggestion.time}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Duration</div>
                      <div className="text-sm font-medium">{suggestion.duration}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Optimization Score</div>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${getScoreColor(suggestion.optimizationScore)}`}
                            style={{ width: `${suggestion.optimizationScore}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{suggestion.optimizationScore}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-xs text-gray-500 mb-1">Optimization Benefits:</div>
                    <div className="flex flex-wrap gap-1">
                      {suggestion.benefits.map((benefit, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center space-x-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
                        >
                          <SafeIcon icon={FiCheckCircle} className="w-3 h-3" />
                          <span>{benefit}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm">
                    Accept
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                    Modify
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scheduling Preferences */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Scheduling Preferences</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Time of Day
            </label>
            <select
              value={preferences.timeOfDay}
              onChange={(e) => setPreferences({...preferences, timeOfDay: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            >
              <option value="morning">Morning (8:00 AM - 12:00 PM)</option>
              <option value="afternoon">Afternoon (12:00 PM - 5:00 PM)</option>
              <option value="evening">Evening (5:00 PM - 8:00 PM)</option>
              <option value="any">Any time</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Doctor Gender Preference
            </label>
            <select
              value={preferences.doctorGender}
              onChange={(e) => setPreferences({...preferences, doctorGender: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            >
              <option value="any">No preference</option>
              <option value="male">Male doctor</option>
              <option value="female">Female doctor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language Preference
            </label>
            <select
              value={preferences.language}
              onChange={(e) => setPreferences({...preferences, language: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            >
              <option value="english">English</option>
              <option value="arabic">Arabic</option>
              <option value="french">French</option>
              <option value="any">Any language (with interpreter)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Urgency Level
            </label>
            <select
              value={preferences.urgency}
              onChange={(e) => setPreferences({...preferences, urgency: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            >
              <option value="normal">Normal (within 2 weeks)</option>
              <option value="urgent">Urgent (within 1 week)</option>
              <option value="emergency">Emergency (within 48 hours)</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors">
            Update Preferences & Re-optimize
          </button>
        </div>
      </div>

      {/* Conflict Resolution */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule Conflicts</h3>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <SafeIcon icon={FiAlertTriangle} className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-yellow-800">Potential Scheduling Conflict</h4>
              <p className="text-sm text-yellow-700 mt-1">
                Your preferred appointment time conflicts with Ramadan fasting hours. 
                AI suggests alternative times that respect your religious practices.
              </p>
              <div className="mt-3 flex space-x-3">
                <button className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded hover:bg-yellow-200 transition-colors">
                  View Alternatives
                </button>
                <button className="text-sm text-yellow-600 hover:text-yellow-700">
                  Ignore Conflict
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartScheduling;