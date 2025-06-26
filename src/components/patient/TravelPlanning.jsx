import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiPlane, FiCalendar, FiMapPin, FiUsers, FiStar, FiCheckCircle, FiClock } = FiIcons;

const TravelPlanning = () => {
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [selectedTransport, setSelectedTransport] = useState(null);

  const accommodationOptions = [
    {
      id: 1,
      name: 'Burj Al Arab Jumeirah',
      type: '7-Star Luxury Hotel',
      rating: 5,
      distance: '15 min to hospital',
      price: '$800/night',
      features: ['Butler service', 'Private beach', 'Spa services', 'Fine dining'],
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Atlantis The Palm',
      type: 'Luxury Resort',
      rating: 5,
      distance: '20 min to hospital',
      price: '$600/night',
      features: ['Waterpark access', 'Aquarium', 'Multiple restaurants', 'Spa'],
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Four Seasons Dubai',
      type: 'Luxury Hotel',
      rating: 5,
      distance: '10 min to hospital',
      price: '$450/night',
      features: ['City views', 'Spa services', 'Fine dining', 'Business center'],
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop'
    }
  ];

  const transportationOptions = [
    {
      id: 1,
      type: 'Private Luxury Car',
      description: 'Mercedes S-Class with professional driver',
      price: '$100/day',
      features: ['24/7 availability', 'English-speaking driver', 'Airport transfers', 'Hospital visits']
    },
    {
      id: 2,
      type: 'Premium Taxi Service',
      description: 'On-demand premium taxi service',
      price: '$50/day',
      features: ['Professional drivers', 'Clean vehicles', 'GPS tracking', 'Cashless payment']
    },
    {
      id: 3,
      type: 'Medical Transport',
      description: 'Specialized medical transportation',
      price: '$150/day',
      features: ['Medical equipment', 'Trained staff', 'Emergency support', 'Wheelchair accessible']
    }
  ];

  const itinerary = [
    {
      date: '2024-02-15',
      day: 'Day 1',
      title: 'Arrival in Dubai',
      activities: [
        { time: '10:00 AM', activity: 'Flight arrival at DXB Airport' },
        { time: '11:00 AM', activity: 'Airport pickup and transfer to hotel' },
        { time: '2:00 PM', activity: 'Hotel check-in and rest' },
        { time: '6:00 PM', activity: 'Welcome dinner and orientation' }
      ]
    },
    {
      date: '2024-02-16',
      day: 'Day 2',
      title: 'Medical Consultation',
      activities: [
        { time: '9:00 AM', activity: 'Initial medical consultation' },
        { time: '11:00 AM', activity: 'Pre-treatment assessments' },
        { time: '2:00 PM', activity: 'Treatment planning session' },
        { time: '4:00 PM', activity: 'Free time for rest' }
      ]
    },
    {
      date: '2024-02-17',
      day: 'Day 3',
      title: 'Treatment Day',
      activities: [
        { time: '7:00 AM', activity: 'Hospital admission' },
        { time: '9:00 AM', activity: 'Medical procedure' },
        { time: '2:00 PM', activity: 'Recovery and monitoring' },
        { time: '6:00 PM', activity: 'Return to accommodation' }
      ]
    },
    {
      date: '2024-02-18',
      day: 'Day 4',
      title: 'Recovery & Light Tourism',
      activities: [
        { time: '10:00 AM', activity: 'Follow-up consultation' },
        { time: '2:00 PM', activity: 'Dubai Mall visit (light activity)' },
        { time: '5:00 PM', activity: 'Burj Khalifa observation deck' },
        { time: '7:00 PM', activity: 'Dinner at hotel' }
      ]
    },
    {
      date: '2024-02-19',
      day: 'Day 5',
      title: 'Departure',
      activities: [
        { time: '10:00 AM', activity: 'Final medical check-up' },
        { time: '12:00 PM', activity: 'Hotel checkout' },
        { time: '2:00 PM', activity: 'Airport transfer' },
        { time: '6:00 PM', activity: 'Flight departure' }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Travel Planning</h1>
        <p className="text-gray-600">Plan your accommodation, transportation, and itinerary</p>
      </div>

      {/* Accommodation Selection */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Accommodation</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {accommodationOptions.map((option) => (
            <motion.div
              key={option.id}
              whileHover={{ scale: 1.02 }}
              className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                selectedAccommodation === option.id
                  ? 'border-primary-500 ring-2 ring-primary-200'
                  : 'border-gray-200 hover:border-primary-300'
              }`}
              onClick={() => setSelectedAccommodation(option.id)}
            >
              <img
                src={option.image}
                alt={option.name}
                className="w-full h-48 object-cover"
              />
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{option.name}</h4>
                  <div className="flex items-center">
                    {[...Array(option.rating)].map((_, i) => (
                      <SafeIcon key={i} icon={FiStar} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{option.type}</p>
                
                <div className="flex items-center space-x-2 mb-3">
                  <SafeIcon icon={FiMapPin} className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{option.distance}</span>
                </div>
                
                <ul className="text-xs text-gray-600 space-y-1 mb-3">
                  {option.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <SafeIcon icon={FiCheckCircle} className="w-3 h-3 text-green-500 mr-1" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="text-lg font-semibold text-primary-600">{option.price}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Transportation Selection */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Transportation Options</h3>
        
        <div className="space-y-4">
          {transportationOptions.map((option) => (
            <div
              key={option.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedTransport === option.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-primary-300'
              }`}
              onClick={() => setSelectedTransport(option.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedTransport === option.id ? 'bg-primary-500 border-primary-500' : 'border-gray-300'
                    }`}></div>
                    <h4 className="font-medium text-gray-900">{option.type}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 ml-7">{option.description}</p>
                  
                  <div className="ml-7 grid grid-cols-2 gap-2">
                    {option.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-xs text-gray-600">
                        <SafeIcon icon={FiCheckCircle} className="w-3 h-3 text-green-500 mr-1" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="text-lg font-semibold text-primary-600">{option.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Itinerary */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Itinerary</h3>
        
        <div className="space-y-6">
          {itinerary.map((day, dayIndex) => (
            <motion.div
              key={dayIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: dayIndex * 0.1 }}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-primary-100 text-primary-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  {dayIndex + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{day.day} - {day.title}</h4>
                  <p className="text-sm text-gray-600">{day.date}</p>
                </div>
              </div>
              
              <div className="ml-11 space-y-2">
                {day.activities.map((activity, actIndex) => (
                  <div key={actIndex} className="flex items-start space-x-3 py-1">
                    <div className="flex items-center space-x-2 min-w-[80px]">
                      <SafeIcon icon={FiClock} className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500 font-medium">{activity.time}</span>
                    </div>
                    <span className="text-sm text-gray-700">{activity.activity}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Travel Documents Checklist */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Travel Documents Checklist</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Valid passport (6+ months)',
            'UAE visa (if required)',
            'Travel insurance',
            'Medical records',
            'Emergency contacts',
            'Flight tickets',
            'Hotel confirmations',
            'Transportation vouchers'
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input type="checkbox" className="w-4 h-4 text-primary-600 rounded" />
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          Save as Draft
        </button>
        
        <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
          <SafeIcon icon={FiPlane} className="w-4 h-4" />
          <span>Confirm Travel Plans</span>
        </button>
      </div>
    </div>
  );
};

export default TravelPlanning;