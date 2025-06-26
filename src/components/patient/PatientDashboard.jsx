import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiUser, FiActivity, FiCalendar, FiFileText, FiCreditCard, FiPlane, FiCheckCircle, FiClock, FiAlertCircle } = FiIcons;

const PatientDashboard = () => {
  const { user } = useUser();

  const currentStep = user?.currentStep || 3;
  const totalSteps = 20;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const quickActions = [
    {
      title: 'Complete Medical Assessment',
      description: 'Provide your medical history and current symptoms',
      icon: FiActivity,
      link: '/patient-portal/assessment',
      status: currentStep >= 2 ? 'completed' : 'pending'
    },
    {
      title: 'Review Treatment Plan',
      description: 'View your personalized treatment recommendations',
      icon: FiCalendar,
      link: '/patient-portal/treatment',
      status: currentStep >= 5 ? 'completed' : currentStep >= 3 ? 'active' : 'pending'
    },
    {
      title: 'Upload Documents',
      description: 'Submit required medical records and identification',
      icon: FiFileText,
      link: '/patient-portal/documents',
      status: currentStep >= 4 ? 'completed' : 'pending'
    },
    {
      title: 'Make Payment',
      description: 'Secure payment for your treatment package',
      icon: FiCreditCard,
      link: '/patient-portal/payment',
      status: currentStep >= 8 ? 'completed' : 'pending'
    }
  ];

  const upcomingAppointments = [
    {
      title: 'Virtual Consultation',
      date: '2024-01-15',
      time: '10:00 AM',
      doctor: 'Dr. Sarah Al-Mahmoud',
      type: 'Cardiology'
    },
    {
      title: 'Pre-treatment Assessment',
      date: '2024-01-20',
      time: '2:00 PM',
      doctor: 'Dr. Ahmed Hassan',
      type: 'General Medicine'
    }
  ];

  const recentActivity = [
    {
      title: 'Medical Assessment Completed',
      date: '2024-01-10',
      type: 'success'
    },
    {
      title: 'Treatment Plan Generated',
      date: '2024-01-12',
      type: 'info'
    },
    {
      title: 'Document Upload Required',
      date: '2024-01-13',
      type: 'warning'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return FiCheckCircle;
      case 'active':
        return FiClock;
      default:
        return FiAlertCircle;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'active':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-600 to-emerald-600 text-white rounded-lg p-6"
      >
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="opacity-90">Your medical tourism journey is in progress. Here's your current status:</p>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">Application Progress</span>
            <span className="text-sm">{currentStep}/{totalSteps} steps completed</span>
          </div>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={action.link}
                className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${getStatusColor(action.status)}`}>
                    <SafeIcon icon={getStatusIcon(action.status)} className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{action.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{action.description}</p>
                    <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                      action.status === 'completed' ? 'bg-green-100 text-green-800' :
                      action.status === 'active' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {action.status === 'completed' ? 'Completed' :
                       action.status === 'active' ? 'In Progress' : 'Pending'}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Appointments */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h3>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <SafeIcon icon={FiCalendar} className="w-4 h-4 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{appointment.title}</h4>
                  <p className="text-sm text-gray-600">{appointment.doctor} - {appointment.type}</p>
                  <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`p-1 rounded-full ${
                  activity.type === 'success' ? 'bg-green-100' :
                  activity.type === 'info' ? 'bg-blue-100' : 'bg-yellow-100'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-600' :
                    activity.type === 'info' ? 'bg-blue-600' : 'bg-yellow-600'
                  }`}></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Patient Information Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Patient ID</p>
            <p className="font-medium">EA-{user?.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Nationality</p>
            <p className="font-medium">{user?.nationality}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Application Status</p>
            <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
              {user?.applicationStatus}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PatientDashboard;