import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiFileText, FiUser, FiCalendar, FiCheckCircle, FiX, FiEye, FiDownload, FiAlertTriangle } = FiIcons;

const ApplicationReview = () => {
  const [selectedApplication, setSelectedApplication] = useState(null);

  const applications = [
    {
      id: 'APP-001',
      patientName: 'Ahmed Al-Mansouri',
      nationality: 'UAE',
      age: 45,
      condition: 'Cardiac Issues',
      submittedDate: '2024-01-18',
      priority: 'high',
      status: 'pending-review',
      completeness: 85,
      missingDocs: ['Lab Results', 'Insurance Verification'],
      medicalHistory: 'Previous heart surgery in 2018, diabetes type 2',
      requestedTreatment: 'Cardiac Catheterization'
    },
    {
      id: 'APP-002',
      patientName: 'Fatima Hassan',
      nationality: 'Morocco',
      age: 38,
      condition: 'Orthopedic',
      submittedDate: '2024-01-19',
      priority: 'medium',
      status: 'pending-review',
      completeness: 95,
      missingDocs: ['Emergency Contact'],
      medicalHistory: 'Sports injury, recurring knee pain',
      requestedTreatment: 'Knee Replacement Surgery'
    },
    {
      id: 'APP-003',
      patientName: 'Sarah Diallo',
      nationality: 'Senegal',
      age: 29,
      condition: 'Cosmetic Surgery',
      submittedDate: '2024-01-20',
      priority: 'low',
      status: 'under-review',
      completeness: 100,
      missingDocs: [],
      medicalHistory: 'No significant medical history',
      requestedTreatment: 'Rhinoplasty'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending-review':
        return 'bg-yellow-100 text-yellow-800';
      case 'under-review':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApprove = (appId) => {
    alert(`Application ${appId} approved!`);
  };

  const handleReject = (appId) => {
    alert(`Application ${appId} rejected!`);
  };

  const handleRequestInfo = (appId) => {
    alert(`Requesting additional information for ${appId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Application Review</h1>
        <p className="text-gray-600">Review and process patient applications</p>
        
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">8</div>
            <div className="text-sm text-yellow-700">Pending Review</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">5</div>
            <div className="text-sm text-blue-700">Under Review</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">12</div>
            <div className="text-sm text-green-700">Approved Today</div>
          </div>
        </div>
      </div>

      {/* Application List */}
      <div className="space-y-4">
        {applications.map((app, index) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            {/* Application Header */}
            <div className="p-6 border-b">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <SafeIcon icon={FiUser} className="w-6 h-6 text-emerald-600" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{app.patientName}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>ID: {app.id}</span>
                      <span>{app.nationality}, Age {app.age}</span>
                      <span>{app.condition}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 mt-2">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getPriorityColor(app.priority)}`}>
                        {app.priority.charAt(0).toUpperCase() + app.priority.slice(1)} Priority
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(app.status)}`}>
                        {app.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">Submitted</div>
                  <div className="text-sm font-medium">{app.submittedDate}</div>
                </div>
              </div>
            </div>

            {/* Application Details */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Completeness */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Application Completeness</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Overall</span>
                    <span className="text-sm font-medium">{app.completeness}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        app.completeness >= 90 ? 'bg-green-600' : 
                        app.completeness >= 70 ? 'bg-yellow-600' : 'bg-red-600'
                      }`}
                      style={{ width: `${app.completeness}%` }}
                    ></div>
                  </div>
                  
                  {app.missingDocs.length > 0 && (
                    <div>
                      <div className="text-sm text-red-600 font-medium mb-1">Missing Documents:</div>
                      <ul className="text-xs text-red-600 space-y-1">
                        {app.missingDocs.map((doc, idx) => (
                          <li key={idx} className="flex items-center">
                            <SafeIcon icon={FiAlertTriangle} className="w-3 h-3 mr-1" />
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Medical Information */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Medical Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Requested Treatment:</span>
                      <div className="font-medium">{app.requestedTreatment}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Medical History:</span>
                      <div className="text-gray-700">{app.medicalHistory}</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Actions</h4>
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <button className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded hover:bg-blue-200 transition-colors">
                        <SafeIcon icon={FiEye} className="w-3 h-3" />
                        <span>View Details</span>
                      </button>
                      <button className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200 transition-colors">
                        <SafeIcon icon={FiDownload} className="w-3 h-3" />
                        <span>Download</span>
                      </button>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleApprove(app.id)}
                        className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 text-xs rounded hover:bg-green-200 transition-colors"
                      >
                        <SafeIcon icon={FiCheckCircle} className="w-3 h-3" />
                        <span>Approve</span>
                      </button>
                      <button 
                        onClick={() => handleReject(app.id)}
                        className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 text-xs rounded hover:bg-red-200 transition-colors"
                      >
                        <SafeIcon icon={FiX} className="w-3 h-3" />
                        <span>Reject</span>
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => handleRequestInfo(app.id)}
                      className="w-full px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded hover:bg-yellow-200 transition-colors"
                    >
                      Request More Info
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="px-6 pb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <SafeIcon icon={FiFileText} className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-800 font-medium">AI Recommendation</p>
                    <p className="text-sm text-blue-700">
                      {app.completeness >= 90 
                        ? 'Application is complete and meets all criteria. Recommend approval.'
                        : `Application is ${app.completeness}% complete. Consider requesting missing documents before approval.`
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationReview;