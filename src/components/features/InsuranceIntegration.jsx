import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiShield, FiCheckCircle, FiClock, FiAlertCircle, FiCreditCard, FiFileText, FiPhone, FiGlobe } = FiIcons;

const InsuranceIntegration = () => {
  const [selectedInsurer, setSelectedInsurer] = useState(null);
  const [claimStatus, setClaimStatus] = useState('not_submitted');
  const [eligibilityStatus, setEligibilityStatus] = useState('checking');

  const globalInsurers = [
    {
      id: 1,
      name: 'Allianz Care',
      logo: '🛡️',
      countries: ['Global Coverage'],
      coverage: 'International Health Insurance',
      status: 'partner',
      features: ['Direct billing', 'Pre-authorization', '24/7 support'],
      coverageLevel: 90
    },
    {
      id: 2,
      name: 'Cigna Global',
      logo: '🌐',
      countries: ['UAE', 'Saudi Arabia', 'Egypt', 'Morocco'],
      coverage: 'Expatriate Health Plans',
      status: 'partner',
      features: ['Telemedicine', 'Emergency evacuation', 'Wellness programs'],
      coverageLevel: 85
    },
    {
      id: 3,
      name: 'BUPA International',
      logo: '💙',
      countries: ['Middle East', 'Africa'],
      coverage: 'Private Medical Insurance',
      status: 'partner',
      features: ['Cancer coverage', 'Maternity care', 'Mental health'],
      coverageLevel: 92
    },
    {
      id: 4,
      name: 'AXA Global Healthcare',
      logo: '🔷',
      countries: ['Global'],
      coverage: 'Premium Health Insurance',
      status: 'partner',
      features: ['Preventive care', 'Specialist consultations', 'Surgery coverage'],
      coverageLevel: 88
    }
  ];

  const eligibilityCheck = {
    patientInfo: {
      name: 'Ahmed Al-Mansouri',
      policyNumber: 'ALC-123456789',
      insurer: 'Allianz Care',
      planType: 'International Premium'
    },
    coverage: {
      inpatient: { covered: true, percentage: 100, limit: '$500,000' },
      outpatient: { covered: true, percentage: 80, limit: '$50,000' },
      emergency: { covered: true, percentage: 100, limit: 'Unlimited' },
      preventive: { covered: true, percentage: 100, limit: '$5,000' }
    },
    preAuthorization: {
      required: true,
      status: 'approved',
      referenceNumber: 'PA-2024-001234',
      validUntil: '2024-03-15'
    }
  };

  const claimHistory = [
    {
      id: 'CLM-001',
      date: '2024-01-15',
      treatment: 'Cardiology Consultation',
      amount: '$450',
      status: 'approved',
      paidAmount: '$450'
    },
    {
      id: 'CLM-002',
      date: '2024-01-18',
      treatment: 'Diagnostic Tests',
      amount: '$1,250',
      status: 'processing',
      paidAmount: 'Pending'
    },
    {
      id: 'CLM-003',
      date: '2024-01-20',
      treatment: 'Surgical Procedure',
      amount: '$15,000',
      status: 'pre_authorized',
      paidAmount: 'Pre-approved'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pre_authorized': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const submitClaim = async () => {
    setClaimStatus('submitting');
    
    // Simulate claim submission
    setTimeout(() => {
      setClaimStatus('submitted');
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Insurance Integration</h1>
        <p className="text-gray-600">Seamless insurance processing for your medical tourism journey</p>
      </div>

      {/* Real-time Eligibility Check */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Insurance Eligibility Verification</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <SafeIcon icon={FiCheckCircle} className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-800">Eligibility Verified</span>
              </div>
              <p className="text-sm text-blue-700">
                Your insurance coverage has been verified in real-time with {eligibilityCheck.patientInfo.insurer}
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Patient Name</span>
                <div className="font-medium">{eligibilityCheck.patientInfo.name}</div>
              </div>
              <div>
                <span className="text-sm text-gray-500">Policy Number</span>
                <div className="font-medium">{eligibilityCheck.patientInfo.policyNumber}</div>
              </div>
              <div>
                <span className="text-sm text-gray-500">Plan Type</span>
                <div className="font-medium">{eligibilityCheck.patientInfo.planType}</div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Coverage Details</h4>
            <div className="space-y-3">
              {Object.entries(eligibilityCheck.coverage).map(([type, details]) => (
                <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium capitalize">{type.replace('_', ' ')}</div>
                    <div className="text-sm text-gray-600">Limit: {details.limit}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">{details.percentage}%</div>
                    <div className="text-xs text-gray-500">Coverage</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pre-authorization Status */}
        {eligibilityCheck.preAuthorization.required && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiCheckCircle} className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">Pre-authorization Approved</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Reference: {eligibilityCheck.preAuthorization.referenceNumber}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-green-600">Valid until</div>
                <div className="font-medium text-green-800">{eligibilityCheck.preAuthorization.validUntil}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Global Insurance Partners */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Global Insurance Partners</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {globalInsurers.map((insurer, index) => (
            <motion.div
              key={insurer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedInsurer(insurer)}
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{insurer.logo}</span>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{insurer.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{insurer.coverage}</p>
                  
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 mb-1">Coverage Level</div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${insurer.coverageLevel}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{insurer.coverageLevel}%</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {insurer.features.slice(0, 2).map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-gray-500">
                    Coverage: {insurer.countries.join(', ')}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Claims Management */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Claims Management</h3>
          <button
            onClick={submitClaim}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Submit New Claim
          </button>
        </div>

        <div className="space-y-4">
          {claimHistory.map((claim, index) => (
            <motion.div
              key={claim.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-gray-900">{claim.treatment}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(claim.status)}`}>
                      {claim.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Claim ID:</span>
                      <div className="font-medium">{claim.id}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Date:</span>
                      <div className="font-medium">{claim.date}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Amount:</span>
                      <div className="font-medium">{claim.amount}</div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-500">Paid Amount</div>
                  <div className="font-semibold text-green-600">{claim.paidAmount}</div>
                  
                  <div className="mt-2 flex space-x-2">
                    <button className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors">
                      View Details
                    </button>
                    <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors">
                      Track Status
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Direct Billing */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Direct Billing Service</h3>
        
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <SafeIcon icon={FiCreditCard} className="w-6 h-6 text-green-600" />
            </div>
            
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">Cashless Treatment Available</h4>
              <p className="text-gray-600 mb-4">
                Your insurance supports direct billing. You won't need to pay upfront for covered treatments.
                We'll bill your insurance directly.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h5 className="font-medium text-gray-900">Benefits:</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheckCircle} className="w-4 h-4 text-green-500" />
                      <span>No upfront payment required</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheckCircle} className="w-4 h-4 text-green-500" />
                      <span>Automatic claim processing</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheckCircle} className="w-4 h-4 text-green-500" />
                      <span>Real-time approval</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h5 className="font-medium text-gray-900">Process:</h5>
                  <ol className="text-sm text-gray-600 space-y-1">
                    <li>1. Insurance verification</li>
                    <li>2. Pre-authorization (if required)</li>
                    <li>3. Treatment delivery</li>
                    <li>4. Direct billing to insurer</li>
                  </ol>
                </div>
              </div>
              
              <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Activate Direct Billing
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Support & Assistance */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Insurance Support</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <SafeIcon icon={FiPhone} className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">24/7 Insurance Hotline</h4>
            <p className="text-sm text-gray-600 mb-3">Get immediate assistance with claims and coverage questions</p>
            <button className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Call Now
            </button>
          </div>

          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <SafeIcon icon={FiFileText} className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Claims Assistance</h4>
            <p className="text-sm text-gray-600 mb-3">Our experts help you file and track your insurance claims</p>
            <button className="text-sm bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
              Get Help
            </button>
          </div>

          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <SafeIcon icon={FiGlobe} className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Global Network</h4>
            <p className="text-sm text-gray-600 mb-3">Access to worldwide insurance partners and coverage</p>
            <button className="text-sm bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">
              Explore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceIntegration;