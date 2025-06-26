import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiUpload, FiFileText, FiCheckCircle, FiX, FiEye, FiDownload } = FiIcons;

const DocumentUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState({});

  const documentCategories = [
    {
      title: 'Identity Documents',
      required: true,
      documents: [
        { name: 'passport', label: 'Passport Copy', required: true },
        { name: 'visa', label: 'UAE Visa', required: false },
        { name: 'emirates_id', label: 'Emirates ID (if applicable)', required: false }
      ]
    },
    {
      title: 'Medical Records',
      required: true,
      documents: [
        { name: 'medical_history', label: 'Complete Medical History', required: true },
        { name: 'current_medications', label: 'Current Medications List', required: true },
        { name: 'lab_results', label: 'Recent Lab Results', required: false },
        { name: 'imaging_reports', label: 'Imaging Reports (X-ray, MRI, CT)', required: false }
      ]
    },
    {
      title: 'Insurance & Financial',
      required: true,
      documents: [
        { name: 'insurance_card', label: 'Insurance Card/Policy', required: true },
        { name: 'financial_guarantee', label: 'Financial Guarantee Letter', required: false }
      ]
    },
    {
      title: 'Additional Documents',
      required: false,
      documents: [
        { name: 'referral_letter', label: 'Doctor Referral Letter', required: false },
        { name: 'emergency_contact', label: 'Emergency Contact Information', required: true },
        { name: 'consent_forms', label: 'Signed Consent Forms', required: false }
      ]
    }
  ];

  const handleFileUpload = (categoryName, docName, files) => {
    if (files && files[0]) {
      setUploadedFiles(prev => ({
        ...prev,
        [`${categoryName}_${docName}`]: {
          file: files[0],
          uploadedAt: new Date(),
          status: 'uploaded'
        }
      }));
    }
  };

  const handleFileRemove = (categoryName, docName) => {
    setUploadedFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[`${categoryName}_${docName}`];
      return newFiles;
    });
  };

  const getFileKey = (categoryIndex, docName) => `${categoryIndex}_${docName}`;

  const isFileUploaded = (categoryIndex, docName) => {
    return !!uploadedFiles[getFileKey(categoryIndex, docName)];
  };

  const getUploadProgress = () => {
    const totalRequired = documentCategories.reduce((acc, category) => 
      acc + category.documents.filter(doc => doc.required).length, 0
    );
    
    const uploadedRequired = documentCategories.reduce((acc, category, categoryIndex) => {
      return acc + category.documents.filter(doc => 
        doc.required && isFileUploaded(categoryIndex, doc.name)
      ).length;
    }, 0);

    return Math.round((uploadedRequired / totalRequired) * 100);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Document Upload</h1>
        <p className="text-gray-600 mb-4">Upload all required documents for your medical tourism application</p>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Upload Progress</span>
            <span className="text-sm text-gray-600">{getUploadProgress()}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getUploadProgress()}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Document Categories */}
      <div className="space-y-6">
        {documentCategories.map((category, categoryIndex) => (
          <motion.div
            key={categoryIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="bg-white rounded-lg shadow-sm"
          >
            {/* Category Header */}
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                {category.required && (
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    Required
                  </span>
                )}
              </div>
            </div>

            {/* Documents List */}
            <div className="p-6">
              <div className="space-y-4">
                {category.documents.map((doc, docIndex) => {
                  const fileKey = getFileKey(categoryIndex, doc.name);
                  const isUploaded = isFileUploaded(categoryIndex, doc.name);
                  const uploadedFile = uploadedFiles[fileKey];

                  return (
                    <div key={docIndex} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <SafeIcon icon={FiFileText} className="w-5 h-5 text-gray-400" />
                          <div>
                            <h4 className="font-medium text-gray-900">{doc.label}</h4>
                            {doc.required && (
                              <span className="text-xs text-red-600">Required</span>
                            )}
                          </div>
                        </div>
                        
                        {isUploaded && (
                          <div className="flex items-center space-x-2">
                            <SafeIcon icon={FiCheckCircle} className="w-5 h-5 text-green-500" />
                            <span className="text-sm text-green-600">Uploaded</span>
                          </div>
                        )}
                      </div>

                      {isUploaded ? (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <SafeIcon icon={FiFileText} className="w-4 h-4 text-green-600" />
                              <span className="text-sm text-green-800">{uploadedFile.file.name}</span>
                              <span className="text-xs text-green-600">
                                ({Math.round(uploadedFile.file.size / 1024)} KB)
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <button className="text-green-600 hover:text-green-700 p-1">
                                <SafeIcon icon={FiEye} className="w-4 h-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-700 p-1">
                                <SafeIcon icon={FiDownload} className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleFileRemove(categoryIndex, doc.name)}
                                className="text-red-600 hover:text-red-700 p-1"
                              >
                                <SafeIcon icon={FiX} className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                          <SafeIcon icon={FiUpload} className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">
                            Drag and drop your file here, or click to browse
                          </p>
                          <p className="text-xs text-gray-500 mb-3">
                            Supported formats: PDF, JPG, PNG (Max 10MB)
                          </p>
                          <label className="cursor-pointer">
                            <span className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
                              Choose File
                            </span>
                            <input
                              type="file"
                              className="hidden"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => handleFileUpload(categoryIndex, doc.name, e.target.files)}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          Save as Draft
        </button>
        
        <button 
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            getUploadProgress() === 100
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={getUploadProgress() !== 100}
        >
          Submit Documents
        </button>
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 mb-2">Need Help?</h4>
        <p className="text-sm text-blue-800 mb-3">
          If you have questions about document requirements or need assistance uploading files, our support team is here to help.
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default DocumentUpload;