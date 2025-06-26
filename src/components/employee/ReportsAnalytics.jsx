import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiTrendingUp, FiUsers, FiCalendar, FiDollarSign, FiBarChart, FiPieChart } = FiIcons;

const ReportsAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const metrics = [
    {
      title: 'Total Patients',
      value: '127',
      change: '+12%',
      trend: 'up',
      icon: FiUsers,
      color: 'text-blue-600'
    },
    {
      title: 'Revenue',
      value: '$2.4M',
      change: '+18%',
      trend: 'up',
      icon: FiDollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Completion Rate',
      value: '94%',
      change: '+3%',
      trend: 'up',
      icon: FiTrendingUp,
      color: 'text-purple-600'
    },
    {
      title: 'Avg. Treatment Time',
      value: '12 days',
      change: '-2 days',
      trend: 'down',
      icon: FiCalendar,
      color: 'text-orange-600'
    }
  ];

  const topTreatments = [
    { name: 'Cardiac Procedures', count: 45, percentage: 35 },
    { name: 'Orthopedic Surgery', count: 32, percentage: 25 },
    { name: 'Cosmetic Surgery', count: 28, percentage: 22 },
    { name: 'Eye Surgery', count: 15, percentage: 12 },
    { name: 'Other', count: 7, percentage: 6 }
  ];

  const patientsByCountry = [
    { country: 'UAE', count: 38, flag: '🇦🇪' },
    { country: 'Morocco', count: 25, flag: '🇲🇦' },
    { country: 'Egypt', count: 22, flag: '🇪🇬' },
    { country: 'Senegal', count: 18, flag: '🇸🇳' },
    { country: 'Algeria', count: 12, flag: '🇩🇿' },
    { country: 'Tunisia', count: 8, flag: '🇹🇳' },
    { country: 'Others', count: 4, flag: '🌍' }
  ];

  const monthlyData = [
    { month: 'Jan', patients: 85, revenue: 180000 },
    { month: 'Feb', patients: 92, revenue: 195000 },
    { month: 'Mar', patients: 78, revenue: 165000 },
    { month: 'Apr', patients: 105, revenue: 220000 },
    { month: 'May', patients: 127, revenue: 275000 },
    { month: 'Jun', patients: 134, revenue: 285000 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
            <p className="text-gray-600">Performance metrics and insights</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">vs last {selectedPeriod}</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg bg-gray-50`}>
                <SafeIcon icon={metric.icon} className={`w-6 h-6 ${metric.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Treatments */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Treatments</h3>
            <SafeIcon icon={FiPieChart} className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {topTreatments.map((treatment, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{treatment.name}</span>
                    <span className="text-sm text-gray-600">{treatment.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${treatment.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Patients by Country */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Patients by Country</h3>
            <SafeIcon icon={FiUsers} className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-3">
            {patientsByCountry.map((country, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{country.flag}</span>
                  <span className="text-sm font-medium text-gray-900">{country.country}</span>
                </div>
                <span className="text-sm text-gray-600 font-medium">{country.count}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Monthly Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Trends</h3>
          <SafeIcon icon={FiBarChart} className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="grid grid-cols-6 gap-4">
          {monthlyData.map((data, index) => (
            <div key={index} className="text-center">
              <div className="mb-2">
                <div 
                  className="bg-emerald-600 rounded-t mx-auto"
                  style={{ 
                    height: `${(data.patients / 150) * 100}px`,
                    width: '20px'
                  }}
                ></div>
                <div 
                  className="bg-blue-600 rounded-b mx-auto"
                  style={{ 
                    height: `${(data.revenue / 300000) * 100}px`,
                    width: '20px'
                  }}
                ></div>
              </div>
              <div className="text-xs text-gray-600">{data.month}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex items-center justify-center space-x-6 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emerald-600 rounded"></div>
            <span>Patients</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-600 rounded"></div>
            <span>Revenue</span>
          </div>
        </div>
      </motion.div>

      {/* Export Options */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <h4 className="font-medium text-gray-900">Patient Report</h4>
            <p className="text-sm text-gray-600 mt-1">Detailed patient statistics and demographics</p>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <h4 className="font-medium text-gray-900">Financial Report</h4>
            <p className="text-sm text-gray-600 mt-1">Revenue analysis and payment tracking</p>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <h4 className="font-medium text-gray-900">Performance Report</h4>
            <p className="text-sm text-gray-600 mt-1">Operational metrics and KPI analysis</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;