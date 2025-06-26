import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiMenu, FiX, FiUser, FiLogOut, FiHome, FiGrid, FiInfo, FiPhone, FiMessageCircle, FiGift } = FiIcons;

const EmirafikNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, userType, logout } = useUser();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: FiHome },
    { name: 'Services', href: '/services', icon: FiGrid },
    { name: 'About', href: '/about', icon: FiInfo },
    { name: 'Contact', href: '/contact', icon: FiPhone },
  ];

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-emerald-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              {/* EmirAfrik Logo */}
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-2 rounded-lg shadow-md">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 22V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 7L12 12L22 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 9.5V14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M17 9.5V14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                    EMIRAFRIK
                  </span>
                  <span className="text-xs text-gray-500 font-medium -mt-1">Medical Tourism</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-700 hover:text-emerald-600 hover:bg-gray-50'
                }`}
              >
                <SafeIcon icon={item.icon} className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                {/* Loyalty Points (if patient) */}
                {userType === 'patient' && (
                  <Link
                    to="/patient-portal/loyalty"
                    className="flex items-center space-x-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium hover:bg-emerald-200 transition-colors"
                  >
                    <SafeIcon icon={FiGift} className="w-4 h-4" />
                    <span>2,450 pts</span>
                  </Link>
                )}

                {/* WhatsApp Quick Access */}
                <Link
                  to="/whatsapp"
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="WhatsApp Support"
                >
                  <SafeIcon icon={FiMessageCircle} className="w-5 h-5" />
                </Link>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user.name?.charAt(0)}
                      </span>
                    </div>
                    <span>{user.name}</span>
                  </button>

                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                    >
                      <Link
                        to={userType === 'patient' ? '/patient-portal' : '/employee-portal'}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Dashboard
                      </Link>
                      {userType === 'patient' && (
                        <Link
                          to="/patient-portal/loyalty"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Loyalty & Rewards
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <SafeIcon icon={FiLogOut} className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/patient-portal"
                  className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-emerald-700 transition-colors"
                >
                  Patient Portal
                </Link>
                <Link
                  to="/employee-portal"
                  className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  Employee Portal
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-emerald-600 p-2"
            >
              <SafeIcon icon={isOpen ? FiX : FiMenu} className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.href
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-700 hover:text-emerald-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <SafeIcon icon={item.icon} className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}

            {user ? (
              <>
                <Link
                  to={userType === 'patient' ? '/patient-portal' : '/employee-portal'}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  <SafeIcon icon={FiUser} className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                
                {userType === 'patient' && (
                  <Link
                    to="/patient-portal/loyalty"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    <SafeIcon icon={FiGift} className="w-5 h-5" />
                    <span>Loyalty & Rewards</span>
                  </Link>
                )}

                <Link
                  to="/whatsapp"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-green-600 hover:bg-green-50"
                  onClick={() => setIsOpen(false)}
                >
                  <SafeIcon icon={FiMessageCircle} className="w-5 h-5" />
                  <span>WhatsApp Support</span>
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  <SafeIcon icon={FiLogOut} className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="space-y-2 px-3 py-2">
                <Link
                  to="/patient-portal"
                  className="block w-full bg-emerald-600 text-white px-4 py-2 rounded-md text-center font-medium hover:bg-emerald-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Patient Portal
                </Link>
                <Link
                  to="/employee-portal"
                  className="block w-full bg-gray-600 text-white px-4 py-2 rounded-md text-center font-medium hover:bg-gray-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Employee Portal
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default EmirafikNavbar;