import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCheckCircle, FiClock, FiArrowRight, FiUser, FiFileText, FiCalendar, FiCreditCard, FiPlane, FiHeart, FiShield, FiPhone } = FiIcons;

const ApplicationProcess = () => {
  const processSteps = [
    {
      step: 1,
      title: "Initial Inquiry & Registration",
      description: "Submit your medical tourism inquiry through our AI-powered platform",
      duration: "1 day",
      icon: FiUser,
      details: [
        "Complete online registration form",
        "AI-powered initial assessment",
        "Medical history questionnaire",
        "Upload basic identification documents"
      ]
    },
    {
      step: 2,
      title: "Medical Assessment",
      description: "Comprehensive evaluation of your medical condition and needs",
      duration: "2-3 days",
      icon: FiHeart,
      details: [
        "Virtual consultation with specialist",
        "Medical records review",
        "Diagnostic requirements assessment",
        "Treatment feasibility evaluation"
      ]
    },
    {
      step: 3,
      title: "Treatment Plan Development",
      description: "Customized treatment plan created by medical experts",
      duration: "3-5 days",
      icon: FiFileText,
      details: [
        "Specialist consultation and recommendation",
        "Treatment timeline creation",
        "Hospital and doctor selection",
        "Pre-treatment requirements"
      ]
    },
    {
      step: 4,
      title: "Cost Estimation & Package Selection",
      description: "Detailed cost breakdown and tourism package options",
      duration: "1-2 days",
      icon: FiCreditCard,
      details: [
        "Medical treatment cost estimation",
        "Tourism package options",
        "Accommodation selection",
        "Transportation arrangements"
      ]
    },
    {
      step: 5,
      title: "Documentation & Approval",
      description: "Complete medical and travel documentation process",
      duration: "5-7 days",
      icon: FiShield,
      details: [
        "Medical clearance documentation",
        "Insurance verification",
        "Legal consent forms",
        "Treatment approval confirmation"
      ]
    },
    {
      step: 6,
      title: "Travel Coordination",
      description: "Complete travel arrangements and logistics planning",
      duration: "7-14 days",
      icon: FiPlane,
      details: [
        "Visa assistance and processing",
        "Flight booking and coordination",
        "Airport transfer arrangements",
        "Accommodation confirmation"
      ]
    },
    {
      step: 7,
      title: "Pre-Arrival Preparation",
      description: "Final preparations before your medical journey",
      duration: "3-5 days",
      icon: FiCalendar,
      details: [
        "Pre-travel medical instructions",
        "Appointment scheduling",
        "Emergency contact setup",
        "Cultural orientation materials"
      ]
    },
    {
      step: 8,
      title: "Arrival & Welcome",
      description: "Warm welcome and orientation in the UAE",
      duration: "1 day",
      icon: FiCheckCircle,
      details: [
        "Airport reception and transfer",
        "Hotel check-in assistance",
        "Welcome orientation session",
        "Initial medical consultation"
      ]
    },
    {
      step: 9,
      title: "Pre-Treatment Assessment",
      description: "Final medical evaluations before treatment",
      duration: "1-2 days",
      icon: FiHeart,
      details: [
        "Comprehensive medical examination",
        "Laboratory tests and diagnostics",
        "Anesthesia consultation",
        "Final treatment confirmation"
      ]
    },
    {
      step: 10,
      title: "Medical Treatment",
      description: "Your medical procedure with expert care",
      duration: "Varies",
      icon: FiShield,
      details: [
        "Medical procedure execution",
        "Continuous monitoring",
        "Family communication updates",
        "Post-procedure care"
      ]
    },
    {
      step: 11,
      title: "Recovery & Monitoring",
      description: "Supervised recovery in luxury accommodations",
      duration: "3-14 days",
      icon: FiClock,
      details: [
        "Medical monitoring and care",
        "Pain management",
        "Physical therapy if needed",
        "Recovery progress assessment"
      ]
    },
    {
      step: 12,
      title: "Tourism Activities",
      description: "Enjoy UAE attractions during recovery period",
      duration: "Flexible",
      icon: FiPlane,
      details: [
        "Cultural site visits",
        "Shopping experiences",
        "Desert safari (if medically cleared)",
        "City tours and entertainment"
      ]
    },
    {
      step: 13,
      title: "Follow-up Consultations",
      description: "Regular check-ups to ensure proper healing",
      duration: "Ongoing",
      icon: FiCalendar,
      details: [
        "Post-treatment examinations",
        "Wound care and monitoring",
        "Medication adjustments",
        "Recovery milestone assessments"
      ]
    },
    {
      step: 14,
      title: "Discharge Planning",
      description: "Preparation for safe return home",
      duration: "1-2 days",
      icon: FiFileText,
      details: [
        "Medical clearance for travel",
        "Discharge summary preparation",
        "Home care instructions",
        "Medication prescriptions"
      ]
    },
    {
      step: 15,
      title: "Travel Arrangements Home",
      description: "Coordinated return journey to your home country",
      duration: "1 day",
      icon: FiPlane,
      details: [
        "Flight confirmation and assistance",
        "Medical escort if required",
        "Airport transfer coordination",
        "Travel insurance coordination"
      ]
    },
    {
      step: 16,
      title: "Immediate Post-Return Care",
      description: "Continued care coordination in your home country",
      duration: "1-2 weeks",
      icon: FiHeart,
      details: [
        "Local doctor coordination",
        "Medical records transfer",
        "Emergency contact availability",
        "Initial follow-up scheduling"
      ]
    },
    {
      step: 17,
      title: "Short-term Follow-up",
      description: "Regular monitoring of recovery progress",
      duration: "1-3 months",
      icon: FiClock,
      details: [
        "Telemedicine consultations",
        "Recovery progress monitoring",
        "Complication prevention",
        "Medication management"
      ]
    },
    {
      step: 18,
      title: "Long-term Care Coordination",
      description: "Extended care and support as needed",
      duration: "3-12 months",
      icon: FiShield,
      details: [
        "Quarterly health assessments",
        "Specialist consultations",
        "Lifestyle recommendations",
        "Preventive care guidance"
      ]
    },
    {
      step: 19,
      title: "Annual Health Review",
      description: "Comprehensive annual health evaluation",
      duration: "Annually",
      icon: FiCheckCircle,
      details: [
        "Complete health assessment",
        "Treatment outcome evaluation",
        "Future care planning",
        "Health maintenance strategies"
      ]
    },
    {
      step: 20,
      title: "Lifetime Support Network",
      description: "Ongoing access to EMIRAFRIK support services",
      duration: "Lifetime",
      icon: FiHeart,
      details: [
        "Alumni patient network access",
        "Future treatment discounts",
        "Health advisory services",
        "Emergency support availability"
      ]
    }
  ];

  const getStepColor = (stepNumber) => {
    if (stepNumber <= 8) return 'bg-blue-500';
    if (stepNumber <= 15) return 'bg-green-500';
    return 'bg-purple-500';
  };

  const getPhaseTitle = (stepNumber) => {
    if (stepNumber <= 8) return 'Pre-Treatment Phase';
    if (stepNumber <= 15) return 'Treatment & Recovery Phase';
    return 'Post-Treatment Care Phase';
  };

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
              20-Step Medical Tourism Process
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              A comprehensive, AI-powered journey from initial inquiry to lifetime support
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Complete Medical Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each step is carefully designed to ensure your safety, comfort, and successful treatment outcome
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="space-y-12">
            {[
              { title: 'Pre-Treatment Phase', steps: processSteps.slice(0, 8), color: 'blue' },
              { title: 'Treatment & Recovery Phase', steps: processSteps.slice(8, 15), color: 'green' },
              { title: 'Post-Treatment Care Phase', steps: processSteps.slice(15), color: 'purple' }
            ].map((phase, phaseIndex) => (
              <div key={phaseIndex} className="mb-16">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mb-8"
                >
                  <h3 className={`text-2xl font-bold mb-4 text-${phase.color}-600`}>
                    {phase.title}
                  </h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {phase.steps.map((step, index) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                    >
                      {/* Step Number */}
                      <div className={`absolute -top-2 -right-2 ${getStepColor(step.step)} text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold`}>
                        {step.step}
                      </div>

                      {/* Icon */}
                      <div className={`${getStepColor(step.step)} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                        <SafeIcon icon={step.icon} className="w-6 h-6 text-white" />
                      </div>

                      {/* Content */}
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h4>
                      <p className="text-gray-600 text-sm mb-3">{step.description}</p>
                      
                      {/* Duration */}
                      <div className="flex items-center mb-3">
                        <SafeIcon icon={FiClock} className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">{step.duration}</span>
                      </div>

                      {/* Details */}
                      <ul className="space-y-1">
                        {step.details.slice(0, 3).map((detail, idx) => (
                          <li key={idx} className="text-xs text-gray-500 flex items-start">
                            <div className="w-1 h-1 bg-gray-400 rounded-full mr-2 mt-1.5"></div>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Our 20-Step Process?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive care that ensures the best possible outcomes for your medical tourism journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-primary-600 to-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiShield} className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Safety First</h3>
              <p className="text-gray-600">Every step is designed with patient safety and medical excellence as the top priority</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-primary-600 to-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiHeart} className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Care</h3>
              <p className="text-gray-600">AI-powered customization ensures each journey is tailored to individual needs</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-primary-600 to-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiPhone} className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lifetime Support</h3>
              <p className="text-gray-600">Continuous support from initial inquiry through lifetime health maintenance</p>
            </motion.div>
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
              Ready to Begin Your 20-Step Journey?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Start your comprehensive medical tourism experience with EMIRAFRIK today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/patient-portal"
                className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>Start Your Application</span>
                <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-colors"
              >
                Contact Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ApplicationProcess;