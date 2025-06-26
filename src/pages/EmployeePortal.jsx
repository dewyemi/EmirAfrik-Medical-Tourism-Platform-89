import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import EmployeeLogin from '../components/employee/EmployeeLogin';
import EmployeeDashboard from '../components/employee/EmployeeDashboard';
import PatientManagement from '../components/employee/PatientManagement';
import ApplicationReview from '../components/employee/ApplicationReview';
import CommunicationCenter from '../components/employee/CommunicationCenter';
import ReportsAnalytics from '../components/employee/ReportsAnalytics';
import ResourceManagement from '../components/employee/ResourceManagement';

const { FiGrid, FiUsers, FiFileText, FiMessageSquare, FiBarChart, FiSettings } = FiIcons;

const EmployeePortal = () => {
  const { user, isEmployee } = useUser();
  const location = useLocation();

  if (!user || !isEmployee) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<EmployeeLogin />} />
          </Routes>
        </div>
      </div>
    );
  }

  const navigation = [
    { name: 'Dashboard', href: '/employee-portal', icon: FiGrid },
    { name: 'Patient Management', href: '/employee-portal/patients', icon: FiUsers },
    { name: 'Application Review', href: '/employee-portal/applications', icon: FiFileText },
    { name: 'Communication', href: '/employee-portal/communication', icon: FiMessageSquare },
    { name: 'Reports & Analytics', href: '/employee-portal/reports', icon: FiBarChart },
    { name: 'Resource Management', href: '/employee-portal/resources', icon: FiSettings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee Portal</h3>
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
              <Route path="/" element={<EmployeeDashboard />} />
              <Route path="/patients" element={<PatientManagement />} />
              <Route path="/applications" element={<ApplicationReview />} />
              <Route path="/communication" element={<CommunicationCenter />} />
              <Route path="/reports" element={<ReportsAnalytics />} />
              <Route path="/resources" element={<ResourceManagement />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePortal;