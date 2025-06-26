import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiCheckCircle, FiClock, FiAlertCircle, FiCalendar, FiMapPin, FiPhone, FiMail, FiDownload } = FiIcons;

const ApplicationStatus = () => {
  const applicationSteps = [
    {
      step: 1,
      title: 'Application Submitted',
      status: 'completed',
      date: '2024-01-10',
      description: 'Your medical tourism application has been received and is being processed.'
    },
    {
      step: 2,
      title: 'Medical Assessment',
      status: 'completed',
      date: '2024-01-12',
      description: 'Medical evaluation completed by our specialists.'
    },
    {
      step: 3,
      title: 'Treatment Plan Approved',
      status: 'completed',
      date: '2024-01-15',
      description: 'Your personalized treatment plan has been approved.'
    },
    {
      step: 4,
      title: 'Documents Verification',
      status: 'in-progress',
      date: '2024-01-18',
      description: 'Currently reviewing and verifying your submitted documents.'
    },
    {
      step: 5,
      title: 'Payment Processing',
      status: 'pending',
      date: 'Pending',
      description: 'Awaiting payment confirmation to proceed.'
    },
    {
      step: 6,
      title: 'Travel Arrangements',
      status: 'pending',
      date: 'Pending',
      description: 'Flight and accommodation booking will begin after payment.'
    },
    {
      step: 7,
      title: 'Final Confirmation',
      status: 'pending',
      date: 'Pending',
      description: 'Final confirmation and travel documents preparation.'
    }
  ];

  const upcomingAppointments = [
    {
      title: 'Document Review Call',
      date: '2024-01-20',
      time: '10:00 AM',
      type: 'Virtual',
      coordinator: 'Sarah Al-Mahmoud'
    },
    {
      title: 'Pre-Treatment Consultation',
      date: '2024-02-15',
      time: '2:00 PM',
      type: 'In-person',
      coordinator: 'Dr. Ahmed Hassan'
    }
  ];

  const importantContacts = [
    {
      name: 'Sarah Al-Mahmoud',
      role: 'Patient Coordinator',
      phone: '+971 50 123 4567',
      email: 'sarah@emirafrik.com',
      available: '24/7'
    },
    {
      name: 'Dr. Ahmed Hassan',
      role: 'Medical Specialist',
      phone: '+971 4 XXX XXXX',
      email: 'ahmed@emirafrik.com',
      available: 'Mon-Fri 9AM-6PM'
    },
    {
      name: 'Emergency Support',
      role: 'Emergency Hotline',
      phone: '+971 50 XXX XXXX',
      email: 'emergency@emirafrik.com',
      available: '24/7'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return FiCheckCircle;
      case 'in-progress':
        return FiClock;
      default:
        return FiAlertCircle;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'in-progress':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      default:
        return 'Pending';
    }
  };

  const currentStep = applicationSteps.findIndex(step => step.status !== 'completed') + 1;
  const progressPercentage = ((currentStep - 1) / applicationSteps.length) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Application Status</h1>
        <p className="text-gray-600 mb-4">Track your medical tourism application progress</p>
        
        <div className="bg-gradient-to-r from-primary-600 to-emerald-600 text-white rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm opacity-90">Overall Progress</span>
            <span className="text-sm font-medium">{Math.round(progressPercentage)}% Complete</span>
          </div>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Application Timeline */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Application Timeline</h3>
        
        <div className="space-y-6">
          {applicationSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-4"
            >
              {/* Status Icon */}
              <div className={`p-2 rounded-full ${getStatusColor(step.status)}`}>
                <SafeIcon icon={getStatusIcon(step.status)} className="w-5 h-5" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-gray-900">{step.title}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(step.status)}`}>
                    {getStatusText(step.status)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <SafeIcon icon={FiCalendar} className="w-3 h-3" />
                  <span>{step.date}</span>
                </div>
              </div>

              {/* Connecting Line */}
              {index < applicationSteps.length - 1 && (
                <div className="absolute left-[34px] mt-12 w-0.5 h-8 bg-gray-200"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h3>
        
        <div className="space-y-4">
          {upcomingAppointments.map((appointment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{appointment.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiClock} className="w-4 h-4" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiMapPin} className="w-4 h-4" />
                      <span>{appointment.type}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">With: {appointment.coordinator}</p>
                </div>
                
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm">
                  Join Meeting
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Important Contacts */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Contacts</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {importantContacts.map((contact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4"
            >
              <h4 className="font-medium text-gray-900 mb-1">{contact.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{contact.role}</p>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <SafeIcon icon={FiPhone} className="w-4 h-4 text-gray-400" />
                  <a href={`tel:${contact.phone}`} className="text-primary-600 hover:text-primary-700">
                    {contact.phone}
                  </a>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <SafeIcon icon={FiMail} className="w-4 h-4 text-gray-400" />
                  <a href={`mailto:${contact.email}`} className="text-primary-600 hover:text-primary-700">
                    {contact.email}
                  </a>
                </div>
                
                <p className="text-xs text-gray-500">{contact.available}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          <SafeIcon icon={FiDownload} className="w-4 h-4" />
          <span>Download Status Report</span>
        </button>
        
        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          <SafeIcon icon={FiMail} className="w-4 h-4" />
          <span>Contact Support</span>
        </button>
        
        <button className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
          <SafeIcon icon={FiPhone} className="w-4 h-4" />
          <span>Emergency Call</span>
        </button>
      </div>
    </div>
  );
};

export default ApplicationStatus;