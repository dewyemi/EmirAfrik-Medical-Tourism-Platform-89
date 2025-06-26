import React from 'react';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiHeart, FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } = FiIcons;

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-primary-600 to-emerald-600 p-2 rounded-lg">
                <SafeIcon icon={FiHeart} className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">EMIRAFRIK</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Your trusted partner for medical tourism excellence in the UAE. 
              Connecting patients from the Middle East and French-speaking Africa 
              with world-class healthcare and luxury experiences.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-300">
                <SafeIcon icon={FiMapPin} className="w-4 h-4" />
                <span>Dubai, United Arab Emirates</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <SafeIcon icon={FiPhone} className="w-4 h-4" />
                <span>+971 4 XXX XXXX</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <SafeIcon icon={FiMail} className="w-4 h-4" />
                <span>info@emirafrik.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/application-process" className="text-gray-300 hover:text-white transition-colors">Application Process</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Portals */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Portals</h3>
            <ul className="space-y-2">
              <li><Link to="/patient-portal" className="text-gray-300 hover:text-white transition-colors">Patient Portal</Link></li>
              <li><Link to="/employee-portal" className="text-gray-300 hover:text-white transition-colors">Employee Portal</Link></li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-md font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <SafeIcon icon={FiFacebook} className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <SafeIcon icon={FiTwitter} className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <SafeIcon icon={FiInstagram} className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <SafeIcon icon={FiLinkedin} className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 EMIRAFRIK. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;