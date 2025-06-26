import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import PatientLogin from '../components/patient/PatientLogin';
import PatientDashboard from '../components/patient/PatientDashboard';
import PatientRegistration from '../components/patient/PatientRegistration';
import MedicalAssessment from '../components/patient/MedicalAssessment';
import TreatmentPlanning from '../components/patient/TreatmentPlanning';
import DocumentUpload from '../components/patient/DocumentUpload';
import PaymentPortal from '../components/patient/PaymentPortal';
import TravelPlanning from '../components/patient/TravelPlanning';
import ApplicationStatus from '../components/patient/ApplicationStatus';
import LoyaltyDashboard from '../components/loyalty/LoyaltyDashboard';

const { FiUser, FiFileText, FiCalendar, FiCreditCard, FiPlane, FiActivity, FiGift } = FiIcons;

const PatientPortal = () => {
  const { user, isPatient } = useUser();
  const location = useLocation();

  if (!user || !isPatient) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<PatientLogin />} />
            <Route path="/register" element={<PatientRegistration />} />
          </Routes>
        </div>
      </div>
    );
  }

  const navigation = [
    { name: 'Dashboard', href: '/patient-portal', icon: FiUser },
    { name: 'Medical Assessment', href: '/patient-portal/assessment', icon: FiActivity },
    { name: 'Treatment Planning', href: '/patient-portal/treatment', icon: FiCalendar },
    { name: 'Documents', href: '/patient-portal/documents', icon: FiFileText },
    { name: 'Payment', href: '/patient-portal/payment', icon: FiCreditCard },
    { name: 'Travel Planning', href: '/patient-portal/travel', icon: FiPlane },
    { name: 'Application Status', href: '/patient-portal/status', icon: FiActivity },
    { name: 'Loyalty & Rewards', href: '/patient-portal/loyalty', icon: FiGift },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Portal</h3>
              <nav className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.href
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <SafeIcon icon={item.icon} className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <Routes>
              <Route path="/" element={<PatientDashboard />} />
              <Route path="/assessment" element={<MedicalAssessment />} />
              <Route path="/treatment" element={<TreatmentPlanning />} />
              <Route path="/documents" element={<DocumentUpload />} />
              <Route path="/payment" element={<PaymentPortal />} />
              <Route path="/travel" element={<TravelPlanning />} />
              <Route path="/status" element={<ApplicationStatus />} />
              <Route path="/loyalty" element={<LoyaltyDashboard />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientPortal;