import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiCalendar, FiUser, FiMapPin, FiClock, FiDollarSign, FiCheckCircle, FiAlertCircle, FiDownload } = FiIcons;

const TreatmentPlanning = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const treatmentPlans = [
    {
      id: 1,
      title: 'Cardiac Catheterization Package',
      specialty: 'Cardiology',
      doctor: 'Dr. Ahmed Al-Rashid',
      hospital: 'Dubai Heart Center',
      duration: '3-5 days',
      cost: '$8,500',
      description: 'Comprehensive cardiac catheterization with recovery package',
      includes: [
        'Pre-procedure consultation',
        'Cardiac catheterization procedure',
        '2-day hospital stay',
        'Post-procedure monitoring',
        'Luxury recovery accommodation'
      ],
      timeline: [
        { day: 1, activity: 'Arrival and initial consultation' },
        { day: 2, activity: 'Pre-procedure tests and preparation' },
        { day: 3, activity: 'Cardiac catheterization procedure' },
        { day: 4, activity: 'Recovery and monitoring' },
        { day: 5, activity: 'Discharge and follow-up plan' }
      ],
      recommended: true
    },
    {
      id: 2,
      title: 'Alternative Treatment Option',
      specialty: 'Cardiology',
      doctor: 'Dr. Sarah Al-Mahmoud',
      hospital: 'Emirates Hospital',
      duration: '2-3 days',
      cost: '$6,200',
      description: 'Conservative treatment approach with advanced monitoring',
      includes: [
        'Comprehensive cardiac assessment',
        'Non-invasive treatment options',
        '1-day observation',
        'Medication adjustment',
        'Follow-up care plan'
      ],
      timeline: [
        { day: 1, activity: 'Arrival and comprehensive assessment' },
        { day: 2, activity: 'Treatment implementation' },
        { day: 3, activity: 'Monitoring and discharge' }
      ],
      recommended: false
    }
  ];

  const tourismAddOns = [
    {
      title: 'Dubai City Tour',
      duration: '1 day',
      cost: '$150',
      description: 'Explore Dubai\'s iconic landmarks and attractions'
    },
    {
      title: 'Desert Safari Experience',
      duration: '1 evening',
      cost: '$200',
      description: 'Traditional Emirati desert experience with dinner'
    },
    {
      title: 'Luxury Shopping Package',
      duration: 'Flexible',
      cost: '$100',
      description: 'Personal shopping assistant at Dubai Mall'
    }
  ];

  const handleApprovePlan = (planId) => {
    setSelectedPlan(planId);
    alert('Treatment plan approved! Proceeding to next step.');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Treatment Planning</h1>
        <p className="text-gray-600">Review and select your personalized treatment plan</p>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <SafeIcon icon={FiAlertCircle} className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm text-blue-800 font-medium">AI Recommendation</p>
              <p className="text-sm text-blue-700">Based on your medical assessment, our AI system has identified the most suitable treatment options for your condition.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Treatment Plans */}
      <div className="space-y-6">
        {treatmentPlans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-lg shadow-sm border-2 transition-all ${
              plan.recommended ? 'border-green-200 bg-green-50' : 'border-gray-200'
            } ${selectedPlan === plan.id ? 'ring-2 ring-primary-500' : ''}`}
          >
            {/* Plan Header */}
            <div className="p-6 border-b">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{plan.title}</h3>
                    {plan.recommended && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                        AI Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiUser} className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Doctor</p>
                        <p className="text-sm font-medium">{plan.doctor}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiMapPin} className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Hospital</p>
                        <p className="text-sm font-medium">{plan.hospital}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiClock} className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Duration</p>
                        <p className="text-sm font-medium">{plan.duration}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiDollarSign} className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Cost</p>
                        <p className="text-sm font-medium text-primary-600">{plan.cost}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => handleApprovePlan(plan.id)}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    selectedPlan === plan.id
                      ? 'bg-primary-600 text-white'
                      : plan.recommended
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-600 text-white hover:bg-gray-700'
                  }`}
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            </div>

            {/* Plan Details */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Includes */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Treatment Includes:</h4>
                  <ul className="space-y-2">
                    {plan.includes.map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                        <SafeIcon icon={FiCheckCircle} className="w-4 h-4 text-green-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Timeline */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Treatment Timeline:</h4>
                  <div className="space-y-3">
                    {plan.timeline.map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <div className="bg-primary-100 text-primary-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                          {item.day}
                        </div>
                        <p className="text-sm text-gray-600 pt-0.5">{item.activity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tourism Add-ons */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Optional Tourism Experiences</h3>
        <p className="text-gray-600 mb-6">Enhance your medical journey with these curated Dubai experiences</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tourismAddOns.map((addon, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">{addon.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{addon.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{addon.duration}</span>
                <span className="font-semibold text-primary-600">{addon.cost}</span>
              </div>
              <button className="w-full mt-3 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm">
                Add to Package
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          <SafeIcon icon={FiDownload} className="w-4 h-4" />
          <span>Download Plan Details</span>
        </button>
        
        <button className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          <SafeIcon icon={FiCalendar} className="w-4 h-4" />
          <span>Schedule Consultation</span>
        </button>
      </div>
    </div>
  );
};

export default TreatmentPlanning;