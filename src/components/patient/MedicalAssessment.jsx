import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiHeart, FiActivity, FiUser, FiCalendar, FiFileText, FiSave, FiCheckCircle } = FiIcons;

const MedicalAssessment = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({
    // Basic Information
    height: '',
    weight: '',
    bloodType: '',
    allergies: '',
    
    // Medical History
    chronicConditions: '',
    previousSurgeries: '',
    currentMedications: '',
    familyHistory: '',
    
    // Current Symptoms
    primarySymptoms: '',
    symptomDuration: '',
    painLevel: '',
    additionalSymptoms: '',
    
    // Lifestyle
    smoking: '',
    drinking: '',
    exercise: '',
    diet: ''
  });

  const sections = [
    {
      title: 'Basic Information',
      icon: FiUser,
      fields: [
        { name: 'height', label: 'Height (cm)', type: 'number', required: true },
        { name: 'weight', label: 'Weight (kg)', type: 'number', required: true },
        { name: 'bloodType', label: 'Blood Type', type: 'select', options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'], required: true },
        { name: 'allergies', label: 'Known Allergies', type: 'textarea', placeholder: 'List any known allergies to medications, foods, or other substances' }
      ]
    },
    {
      title: 'Medical History',
      icon: FiFileText,
      fields: [
        { name: 'chronicConditions', label: 'Chronic Medical Conditions', type: 'textarea', placeholder: 'Diabetes, hypertension, heart disease, etc.' },
        { name: 'previousSurgeries', label: 'Previous Surgeries', type: 'textarea', placeholder: 'List all previous surgical procedures with dates' },
        { name: 'currentMedications', label: 'Current Medications', type: 'textarea', placeholder: 'List all medications including dosages' },
        { name: 'familyHistory', label: 'Family Medical History', type: 'textarea', placeholder: 'Relevant family medical history' }
      ]
    },
    {
      title: 'Current Symptoms',
      icon: FiActivity,
      fields: [
        { name: 'primarySymptoms', label: 'Primary Symptoms', type: 'textarea', placeholder: 'Describe your main symptoms in detail', required: true },
        { name: 'symptomDuration', label: 'How long have you had these symptoms?', type: 'select', options: ['Less than 1 week', '1-2 weeks', '1-3 months', '3-6 months', '6-12 months', 'More than 1 year'], required: true },
        { name: 'painLevel', label: 'Pain Level (1-10)', type: 'number', min: 1, max: 10 },
        { name: 'additionalSymptoms', label: 'Additional Symptoms', type: 'textarea', placeholder: 'Any other symptoms you are experiencing' }
      ]
    },
    {
      title: 'Lifestyle Information',
      icon: FiHeart,
      fields: [
        { name: 'smoking', label: 'Smoking Status', type: 'select', options: ['Never', 'Former smoker', 'Current smoker'], required: true },
        { name: 'drinking', label: 'Alcohol Consumption', type: 'select', options: ['Never', 'Rarely', 'Socially', 'Regularly'], required: true },
        { name: 'exercise', label: 'Exercise Frequency', type: 'select', options: ['Never', 'Rarely', '1-2 times per week', '3-4 times per week', 'Daily'], required: true },
        { name: 'diet', label: 'Dietary Restrictions', type: 'textarea', placeholder: 'Any dietary restrictions or special diets' }
      ]
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSubmit = () => {
    alert('Medical assessment submitted successfully!');
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'select':
        return (
          <select
            name={field.name}
            value={formData[field.name]}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required={field.required}
          >
            <option value="">Select {field.label}</option>
            {field.options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            name={field.name}
            value={formData[field.name]}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder={field.placeholder}
            required={field.required}
          />
        );
      default:
        return (
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleInputChange}
            min={field.min}
            max={field.max}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder={field.placeholder}
            required={field.required}
          />
        );
    }
  };

  const currentSectionData = sections[currentSection];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Medical Assessment</h1>
        <p className="text-gray-600">Complete your comprehensive medical evaluation</p>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Step {currentSection + 1} of {sections.length}</span>
            <span className="text-sm text-gray-600">{Math.round(((currentSection + 1) / sections.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="p-6 border-b">
        <div className="flex space-x-4 overflow-x-auto">
          {sections.map((section, index) => (
            <button
              key={index}
              onClick={() => setCurrentSection(index)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                index === currentSection
                  ? 'bg-primary-100 text-primary-600'
                  : index < currentSection
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <SafeIcon icon={section.icon} className="w-4 h-4" />
              <span className="text-sm font-medium">{section.title}</span>
              {index < currentSection && (
                <SafeIcon icon={FiCheckCircle} className="w-4 h-4" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <motion.div
        key={currentSection}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-primary-100 p-2 rounded-lg">
            <SafeIcon icon={currentSectionData.icon} className="w-6 h-6 text-primary-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">{currentSectionData.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentSectionData.fields.map((field, index) => (
            <div key={index} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {renderField(field)}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="p-6 border-t flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentSection === 0}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        <div className="flex space-x-3">
          <button
            onClick={() => alert('Progress saved!')}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
          >
            <SafeIcon icon={FiSave} className="w-4 h-4" />
            <span>Save Progress</span>
          </button>

          {currentSection === sections.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
            >
              <SafeIcon icon={FiCheckCircle} className="w-4 h-4" />
              <span>Submit Assessment</span>
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalAssessment;