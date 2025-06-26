import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHeart, FiEye, FiBrain, FiActivity, FiUser, FiStar, FiShield, FiGlobe, FiClock, FiAward, FiArrowRight, FiPhone, FiCalendar, FiCheckCircle } = FiIcons;

const ServicesPage = () => {
  const medicalSpecialties = [
    {
      icon: FiHeart,
      title: 'Cardiology',
      description: 'World-class cardiac care and surgical procedures',
      treatments: ['Heart Surgery', 'Angioplasty', 'Cardiac Catheterization', 'Pacemaker Implantation']
    },
    {
      icon: FiEye,
      title: 'Ophthalmology',
      description: 'Advanced eye care and vision correction',
      treatments: ['LASIK Surgery', 'Cataract Surgery', 'Retinal Surgery', 'Glaucoma Treatment']
    },
    {
      icon: FiBrain,
      title: 'Neurology',
      description: 'Comprehensive neurological care and brain surgery',
      treatments: ['Brain Surgery', 'Spine Surgery', 'Stroke Treatment', 'Epilepsy Management']
    },
    {
      icon: FiActivity,
      title: 'Orthopedics',
      description: 'Joint replacement and bone surgery specialists',
      treatments: ['Joint Replacement', 'Sports Medicine', 'Spine Surgery', 'Arthroscopy']
    },
    {
      icon: FiUser,
      title: 'Plastic Surgery',
      description: 'Cosmetic and reconstructive surgery',
      treatments: ['Cosmetic Surgery', 'Reconstructive Surgery', 'Breast Surgery', 'Facial Surgery']
    },
    {
      icon: FiStar,
      title: 'Oncology',
      description: 'Comprehensive cancer treatment and care',
      treatments: ['Chemotherapy', 'Radiation Therapy', 'Surgical Oncology', 'Immunotherapy']
    }
  ];

  const tourismPackages = [
    {
      title: 'Luxury Recovery Package',
      description: 'Premium accommodation with dedicated medical support',
      features: ['5-star hotel accommodation', 'Private nursing care', 'Luxury transportation', 'Concierge services'],
      duration: '7-14 days',
      price: 'From $2,500'
    },
    {
      title: 'Cultural Experience Package',
      description: 'Combine treatment with UAE cultural exploration',
      features: ['Desert safari', 'City tours', 'Cultural sites', 'Shopping experiences'],
      duration: '10-21 days',
      price: 'From $3,200'
    },
    {
      title: 'Family Support Package',
      description: 'Accommodation and activities for accompanying family',
      features: ['Family accommodation', 'Children activities', 'Family tours', 'Support services'],
      duration: '7-30 days',
      price: 'From $1,800'
    }
  ];

  const whyChooseUs = [
    {
      icon: FiShield,
      title: 'JCI Accredited Hospitals',
      description: 'All partner hospitals meet international quality standards'
    },
    {
      icon: FiGlobe,
      title: 'Multilingual Support',
      description: 'Staff fluent in Arabic, French, English, and local languages'
    },
    {
      icon: FiClock,
      title: '24/7 Support',
      description: 'Round-the-clock assistance throughout your journey'
    },
    {
      icon: FiAward,
      title: 'Expert Medical Teams',
      description: 'World-renowned specialists and medical professionals'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Initial Consultation',
      description: 'AI-powered assessment and medical history review',
      icon: FiPhone
    },
    {
      step: '02',
      title: 'Treatment Planning',
      description: 'Customized medical and tourism package creation',
      icon: FiCalendar
    },
    {
      step: '03',
      title: 'Coordination & Travel',
      description: 'Complete travel and accommodation arrangements',
      icon: FiGlobe
    },
    {
      step: '04',
      title: 'Medical Care',
      description: 'World-class treatment with continuous support',
      icon: FiHeart
    },
    {
      step: '05',
      title: 'Recovery & Tourism',
      description: 'Guided recovery with optional tourism activities',
      icon: FiStar
    },
    {
      step: '06',
      title: 'Follow-up Care',
      description: 'Continued support after returning home',
      icon: FiCheckCircle
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-emerald-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Comprehensive Medical Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              World-class healthcare combined with luxury tourism experiences in the heart of the UAE
            </p>
          </motion.div>
        </div>
      </section>

      {/* Medical Specialties */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Medical Specialties
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access to leading specialists across all major medical fields
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {medicalSpecialties.map((specialty, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="bg-gradient-to-r from-primary-600 to-emerald-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <SafeIcon icon={specialty.icon} className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{specialty.title}</h3>
                <p className="text-gray-600 mb-4">{specialty.description}</p>
                <ul className="space-y-1">
                  {specialty.treatments.map((treatment, idx) => (
                    <li key={idx} className="text-sm text-gray-500 flex items-center">
                      <div className="w-1 h-1 bg-primary-600 rounded-full mr-2"></div>
                      {treatment}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tourism Packages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tourism & Recovery Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enhance your medical journey with carefully curated tourism experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tourismPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{pkg.title}</h3>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-center">
                      <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium">{pkg.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Starting</p>
                    <p className="font-semibold text-primary-600">{pkg.price}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose EMIRAFRIK?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to excellence ensures the highest quality care and experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-gradient-to-r from-primary-600 to-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={reason.icon} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our 6-Step Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A streamlined approach to your medical tourism journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative bg-gray-50 rounded-xl p-6"
              >
                <div className="absolute -top-4 -left-4 bg-gradient-to-r from-primary-600 to-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
                <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <SafeIcon icon={step.icon} className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/application-process"
              className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors inline-flex items-center space-x-2"
            >
              <span>View Detailed Process</span>
              <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Medical Journey?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Contact our expert team today for a personalized consultation and treatment plan
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/patient-portal"
                className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>Start Application</span>
                <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;