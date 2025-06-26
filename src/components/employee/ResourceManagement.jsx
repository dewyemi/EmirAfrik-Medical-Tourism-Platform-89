import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiSettings, FiUsers, FiCalendar, FiMapPin, FiPlus, FiEdit, FiTrash2, FiSave } = FiIcons;

const ResourceManagement = () => {
  const [activeTab, setActiveTab] = useState('hospitals');
  const [showAddForm, setShowAddForm] = useState(false);

  const hospitals = [
    {
      id: 1,
      name: 'Dubai Heart Center',
      specialties: ['Cardiology', 'Cardiac Surgery'],
      location: 'Dubai Healthcare City',
      contact: '+971 4 XXX XXXX',
      rating: 5,
      status: 'active'
    },
    {
      id: 2,
      name: 'Emirates Hospital',
      specialties: ['Orthopedics', 'General Surgery'],
      location: 'Jumeirah',
      contact: '+971 4 XXX XXXX',
      rating: 4.8,
      status: 'active'
    },
    {
      id: 3,
      name: 'American Hospital Dubai',
      specialties: ['Plastic Surgery', 'Dermatology'],
      location: 'Oud Metha',
      contact: '+971 4 XXX XXXX',
      rating: 4.9,
      status: 'active'
    }
  ];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Ahmed Al-Rashid',
      specialty: 'Cardiology',
      hospital: 'Dubai Heart Center',
      experience: '15 years',
      languages: ['English', 'Arabic'],
      availability: 'Mon-Fri',
      status: 'available'
    },
    {
      id: 2,
      name: 'Dr. Sarah Al-Mahmoud',
      specialty: 'Orthopedics',
      hospital: 'Emirates Hospital',
      experience: '12 years',
      languages: ['English', 'Arabic', 'French'],
      availability: 'Mon-Sat',
      status: 'busy'
    },
    {
      id: 3,
      name: 'Dr. Hassan Al-Zahra',
      specialty: 'Plastic Surgery',
      hospital: 'American Hospital Dubai',
      experience: '18 years',
      languages: ['English', 'Arabic'],
      availability: 'Tue-Sat',
      status: 'available'
    }
  ];

  const accommodations = [
    {
      id: 1,
      name: 'Burj Al Arab',
      type: 'Luxury Hotel',
      location: 'Jumeirah Beach',
      rating: 5,
      priceRange: '$800-1200/night',
      amenities: ['Spa', 'Butler Service', 'Private Beach'],
      status: 'partnered'
    },
    {
      id: 2,
      name: 'Four Seasons Dubai',
      type: 'Luxury Hotel',
      location: 'DIFC',
      rating: 5,
      priceRange: '$400-800/night',
      amenities: ['Spa', 'Fine Dining', 'Business Center'],
      status: 'partnered'
    },
    {
      id: 3,
      name: 'Medical Recovery Suites',
      type: 'Medical Facility',
      location: 'Dubai Healthcare City',
      rating: 4.7,
      priceRange: '$200-400/night',
      amenities: ['Medical Care', 'Nursing Service', 'Therapy'],
      status: 'partnered'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
      case 'available':
      case 'partnered':
        return 'bg-green-100 text-green-800';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
      case 'unavailable':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'hospitals':
        return (
          <div className="space-y-4">
            {hospitals.map((hospital, index) => (
              <motion.div
                key={hospital.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{hospital.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(hospital.status)}`}>
                        {hospital.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <p><strong>Specialties:</strong> {hospital.specialties.join(', ')}</p>
                        <p><strong>Location:</strong> {hospital.location}</p>
                      </div>
                      <div>
                        <p><strong>Contact:</strong> {hospital.contact}</p>
                        <p><strong>Rating:</strong> {'★'.repeat(hospital.rating)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <SafeIcon icon={FiEdit} className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'doctors':
        return (
          <div className="space-y-4">
            {doctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(doctor.status)}`}>
                        {doctor.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <p><strong>Specialty:</strong> {doctor.specialty}</p>
                        <p><strong>Hospital:</strong> {doctor.hospital}</p>
                        <p><strong>Experience:</strong> {doctor.experience}</p>
                      </div>
                      <div>
                        <p><strong>Languages:</strong> {doctor.languages.join(', ')}</p>
                        <p><strong>Availability:</strong> {doctor.availability}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <SafeIcon icon={FiEdit} className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'accommodations':
        return (
          <div className="space-y-4">
            {accommodations.map((accommodation, index) => (
              <motion.div
                key={accommodation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{accommodation.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(accommodation.status)}`}>
                        {accommodation.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <p><strong>Type:</strong> {accommodation.type}</p>
                        <p><strong>Location:</strong> {accommodation.location}</p>
                        <p><strong>Price Range:</strong> {accommodation.priceRange}</p>
                      </div>
                      <div>
                        <p><strong>Rating:</strong> {'★'.repeat(accommodation.rating)}</p>
                        <p><strong>Amenities:</strong> {accommodation.amenities.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <SafeIcon icon={FiEdit} className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const tabs = [
    { id: 'hospitals', label: 'Hospitals', icon: FiMapPin },
    { id: 'doctors', label: 'Doctors', icon: FiUsers },
    { id: 'accommodations', label: 'Accommodations', icon: FiCalendar }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Resource Management</h1>
            <p className="text-gray-600">Manage hospitals, doctors, and accommodations</p>
          </div>
          
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <SafeIcon icon={FiPlus} className="w-4 h-4" />
            <span>Add New</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <SafeIcon icon={tab.icon} className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Add New {activeTab.slice(0, -1)}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center space-x-2"
              >
                <SafeIcon icon={FiSave} className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ResourceManagement;