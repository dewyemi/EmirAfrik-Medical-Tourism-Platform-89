import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiSearch, FiFilter, FiUser, FiCalendar, FiMapPin, FiPhone, FiMail, FiMoreVertical } = FiIcons;

const PatientManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const patients = [
    {
      id: 'EA-001',
      name: 'Ahmed Al-Mansouri',
      nationality: 'UAE',
      age: 45,
      condition: 'Cardiac Catheterization',
      status: 'in-treatment',
      arrivalDate: '2024-01-15',
      coordinator: 'Sarah Al-Mahmoud',
      hospital: 'Dubai Heart Center',
      progress: 75
    },
    {
      id: 'EA-002', 
      name: 'Fatima Hassan',
      nationality: 'Morocco',
      age: 38,
      condition: 'Orthopedic Surgery',
      status: 'pre-arrival',
      arrivalDate: '2024-01-25',
      coordinator: 'Ahmed Hassan',
      hospital: 'Emirates Hospital',
      progress: 45
    },
    {
      id: 'EA-003',
      name: 'Mohammed Al-Zahra',
      nationality: 'Egypt',
      age: 52,
      condition: 'Eye Surgery',
      status: 'recovered',
      arrivalDate: '2024-01-08',
      coordinator: 'Fatima Diallo',
      hospital: 'Dubai Eye Center',
      progress: 100
    },
    {
      id: 'EA-004',
      name: 'Sarah Diallo',
      nationality: 'Senegal',
      age: 29,
      condition: 'Plastic Surgery',
      status: 'application-review',
      arrivalDate: '2024-02-10',
      coordinator: 'Sarah Al-Mahmoud',
      hospital: 'American Hospital',
      progress: 25
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'application-review':
        return 'bg-yellow-100 text-yellow-800';
      case 'pre-arrival':
        return 'bg-blue-100 text-blue-800';
      case 'in-treatment':
        return 'bg-green-100 text-green-800';
      case 'recovered':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'application-review':
        return 'Application Review';
      case 'pre-arrival':
        return 'Pre-Arrival';
      case 'in-treatment':
        return 'In Treatment';
      case 'recovered':
        return 'Recovered';
      default:
        return 'Unknown';
    }
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Patient Management</h1>
        <p className="text-gray-600">Monitor and manage all patient cases</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiFilter} className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="application-review">Application Review</option>
              <option value="pre-arrival">Pre-Arrival</option>
              <option value="in-treatment">In Treatment</option>
              <option value="recovered">Recovered</option>
            </select>
          </div>
        </div>
      </div>

      {/* Patient List */}
      <div className="space-y-4">
        {filteredPatients.map((patient, index) => (
          <motion.div
            key={patient.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Patient Info */}
                <div className="md:col-span-2">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="bg-emerald-100 p-2 rounded-full">
                      <SafeIcon icon={FiUser} className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                      <p className="text-sm text-gray-600">ID: {patient.id}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div>Nationality: {patient.nationality}</div>
                    <div>Age: {patient.age}</div>
                    <div className="col-span-2">Condition: {patient.condition}</div>
                  </div>
                </div>

                {/* Treatment Details */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Treatment Details</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiCalendar} className="w-3 h-3" />
                      <span>{patient.arrivalDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiMapPin} className="w-3 h-3" />
                      <span>{patient.hospital}</span>
                    </div>
                    <div>Coordinator: {patient.coordinator}</div>
                  </div>
                </div>

                {/* Status & Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-600">{patient.progress}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div
                      className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${patient.progress}%` }}
                    ></div>
                  </div>
                  
                  <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(patient.status)}`}>
                    {getStatusText(patient.status)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                  <SafeIcon icon={FiPhone} className="w-4 h-4" />
                </button>
                <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                  <SafeIcon icon={FiMail} className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <SafeIcon icon={FiMoreVertical} className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full hover:bg-emerald-200 transition-colors">
                  Update Status
                </button>
                <button className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full hover:bg-blue-200 transition-colors">
                  Schedule Call
                </button>
                <button className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full hover:bg-purple-200 transition-colors">
                  View Details
                </button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors">
                  Send Message
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPatients.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <SafeIcon icon={FiUser} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
};

export default PatientManagement;