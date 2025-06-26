import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHeart, FiGlobe, FiUsers, FiAward, FiShield, FiTrendingUp, FiMapPin, FiPhone, FiMail } = FiIcons;

const AboutPage = () => {
  const stats = [
    { number: '500+', label: 'Successful Treatments', icon: FiHeart },
    { number: '50+', label: 'Partner Hospitals', icon: FiShield },
    { number: '25+', label: 'Countries Served', icon: FiGlobe },
    { number: '98%', label: 'Patient Satisfaction', icon: FiAward }
  ];

  const team = [
    {
      name: 'Dr. Ahmed Al-Rashid',
      role: 'Chief Medical Officer',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
      description: 'Over 20 years of experience in international healthcare coordination'
    },
    {
      name: 'Sarah Al-Mahmoud',
      role: 'Director of Patient Services',
      image: 'https://images.unsplash.com/photo-1594824388060-c4ad8e2a6c24?w=400&h=400&fit=crop&crop=face',
      description: 'Expert in medical tourism operations and patient care coordination'
    },
    {
      name: 'Dr. Hassan Al-Zahra',
      role: 'Medical Coordinator',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face',
      description: 'Specialized in treatment planning and medical assessment'
    },
    {
      name: 'Fatima Diallo',
      role: 'Patient Relations Manager',
      image: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face',
      description: 'Multilingual support specialist for French-speaking African patients'
    }
  ];

  const values = [
    {
      icon: FiHeart,
      title: 'Compassionate Care',
      description: 'We treat every patient with empathy, respect, and personalized attention throughout their medical journey.'
    },
    {
      icon: FiShield,
      title: 'Quality Assurance',
      description: 'We partner only with JCI-accredited hospitals and internationally recognized medical professionals.'
    },
    {
      icon: FiGlobe,
      title: 'Cultural Sensitivity',
      description: 'We understand and respect the diverse cultural backgrounds of our patients from the Middle East and Africa.'
    },
    {
      icon: FiUsers,
      title: 'Comprehensive Support',
      description: 'From initial consultation to post-treatment follow-up, we provide end-to-end support and coordination.'
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
              About EMIRAFRIK
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Bridging healthcare excellence between the UAE and our valued patients from the Middle East and French-speaking Africa
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 mb-6">
                EMIRAFRIK was founded with a vision to make world-class healthcare accessible to patients from the Middle East and French-speaking African countries. Based in Dubai, we recognized the unique opportunity to combine the UAE's advanced medical infrastructure with luxury tourism experiences.
              </p>
              <p className="text-gray-600 mb-6">
                Our team of medical professionals, patient coordinators, and tourism experts work together to create seamless medical tourism experiences. We understand the cultural nuances, language preferences, and specific needs of our target communities.
              </p>
              <p className="text-gray-600">
                With AI-powered support systems and comprehensive care coordination, we ensure that every patient receives personalized attention from their first inquiry through their complete recovery and follow-up care at home.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop"
                alt="Dubai Healthcare"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <SafeIcon icon={FiMapPin} className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Based in Dubai</p>
                    <p className="text-sm text-gray-600">UAE Medical Hub</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by hundreds of patients across multiple countries
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-gradient-to-r from-primary-600 to-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={stat.icon} className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at EMIRAFRIK
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-primary-600 to-emerald-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <SafeIcon icon={value.icon} className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dedicated professionals committed to your medical tourism success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-primary-600 to-emerald-600 w-8 h-8 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiAward} className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-gray-600">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto opacity-90">
              Contact us today for a personalized consultation and let us help you access world-class healthcare in the UAE
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-white bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={FiMapPin} className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Location</h3>
                <p className="opacity-90">Dubai, United Arab Emirates</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={FiPhone} className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <p className="opacity-90">+971 4 XXX XXXX</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={FiMail} className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="opacity-90">info@emirafrik.com</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;