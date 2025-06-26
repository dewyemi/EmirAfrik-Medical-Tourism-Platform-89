import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiUsers, FiFileText, FiClock, FiCheckCircle, FiAlertTriangle, FiTrendingUp, FiMessageSquare, FiCalendar } = FiIcons;

const EmployeeDashboard = () => {
  const { user } = useUser();

  const stats = [
    {
      title: 'Active Patients',
      value: '127',
      change: '+12%',
      trend: 'up',
      icon: FiUsers,
      color: 'bg-blue-500'
    },
    {
      title: 'Pending Reviews',
      value: '23',
      change: '-5%',
      trend: 'down',
      icon: FiFileText,
      color: 'bg-yellow-500'
    },
    {
      title: 'Completed Today',
      value: '18',
      change: '+8%',
      trend: 'up',
      icon: FiCheckCircle,
      color: 'bg-green-500'
    },
    {
      title: 'Urgent Items',
      value: '7',
      change: '+3',
      trend: 'up',
      icon: FiAlertTriangle,
      color: 'bg-red-500'
    }
  ];

  const quickActions = [
    {
      title: 'Review Applications',
      description: 'Process new patient applications',
      icon: FiFileText,
      link: '/employee-portal/applications',
      count: 23
    },
    {
      title: 'Patient Management',
      description: 'Manage active patient cases',
      icon: FiUsers,
      link: '/employee-portal/patients',
      count: 127
    },
    {
      title: 'Communications',
      description: 'Handle patient inquiries',
      icon: FiMessageSquare,
      link: '/employee-portal/communication',
      count: 15
    },
    {
      title: 'Reports & Analytics',
      description: 'View performance metrics',
      icon: FiTrendingUp,
      link: '/employee-portal/reports',
      count: null
    }
  ];

  const recentActivity = [
    {
      title: 'New patient application submitted',
      patient: 'Ahmed Al-Mansouri',
      time: '10 minutes ago',
      type: 'application'
    },
    {
      title: 'Treatment plan approved',
      patient: 'Fatima Hassan',
      time: '1 hour ago',
      type: 'approval'
    },
    {
      title: 'Payment received',
      patient: 'Mohammed Al-Zahra',
      time: '2 hours ago',
      type: 'payment'
    },
    {
      title: 'Document uploaded',
      patient: 'Sarah Diallo',
      time: '3 hours ago',
      type: 'document'
    }
  ];

  const upcomingTasks = [
    {
      title: 'Review Medical Assessment',
      patient: 'Ahmed Al-Mansouri',
      dueTime: '2:00 PM',
      priority: 'high'
    },
    {
      title: 'Schedule Follow-up Call',
      patient: 'Fatima Hassan',
      dueTime: '3:30 PM',
      priority: 'medium'
    },
    {
      title: 'Process Payment Confirmation',
      patient: 'Mohammed Al-Zahra',
      dueTime: '4:00 PM',
      priority: 'low'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-emerald-600 to-primary-600 text-white rounded-lg p-6"
      >
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="opacity-90">Here's your dashboard overview for today</p>
        <div className="mt-4 flex items-center space-x-2">
          <span className="text-sm bg-white bg-opacity-20 px-2 py-1 rounded">{user?.role}</span>
          <span className="text-sm bg-white bg-opacity-20 px-2 py-1 rounded">{user?.department}</span>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-1">
                  <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">vs last week</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <SafeIcon icon={stat.icon} className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

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
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                      <SafeIcon icon={action.icon} className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{action.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{action.description}</p>
                    </div>
                  </div>
                  {action.count && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                      {action.count}
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`p-1 rounded-full ${
                  activity.type === 'application' ? 'bg-blue-100' :
                  activity.type === 'approval' ? 'bg-green-100' :
                  activity.type === 'payment' ? 'bg-yellow-100' : 'bg-gray-100'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'application' ? 'bg-blue-600' :
                    activity.type === 'approval' ? 'bg-green-600' :
                    activity.type === 'payment' ? 'bg-yellow-600' : 'bg-gray-600'
                  }`}></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-600">{activity.patient}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Tasks */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Tasks</h3>
          <div className="space-y-4">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <SafeIcon icon={FiClock} className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{task.patient}</p>
                  <p className="text-sm text-gray-500">Due: {task.dueTime}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;