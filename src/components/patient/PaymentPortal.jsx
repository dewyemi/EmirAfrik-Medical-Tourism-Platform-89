import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import MomoPayment from '../payment/MomoPayment';

const { FiCreditCard, FiShield, FiCheckCircle, FiDollarSign, FiCalendar, FiLock, FiSmartphone, FiGlobe } = FiIcons;

const PaymentPortal = () => {
  const [selectedPlan, setSelectedPlan] = useState('full');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, processing, success, error
  const [paymentResult, setPaymentResult] = useState(null);

  const packageDetails = {
    medical: {
      title: 'Medical Treatment Package',
      amount: 8500,
      items: [
        'Cardiac catheterization procedure',
        'Hospital stay (2 days)',
        'Doctor consultations',
        'Post-procedure monitoring',
        'Medical reports and documentation'
      ]
    },
    accommodation: {
      title: 'Luxury Recovery Package',
      amount: 2500,
      items: [
        '5-star hotel accommodation (5 nights)',
        'Private nursing care',
        'Luxury transportation',
        'Concierge services',
        'Meal arrangements'
      ]
    },
    tourism: {
      title: 'Tourism Add-ons',
      amount: 450,
      items: [
        'Dubai city tour',
        'Desert safari experience',
        'Shopping assistance',
        'Cultural experiences'
      ]
    }
  };

  const paymentPlans = [
    {
      id: 'full',
      title: 'Full Payment',
      discount: '5% discount',
      amount: 10927.50,
      description: 'Pay the complete amount now and save 5%'
    },
    {
      id: 'installment',
      title: 'Installment Plan',
      discount: 'No additional fees',
      amount: 11450,
      description: '50% now, 50% before treatment',
      installments: [
        { amount: 5725, due: 'Today' },
        { amount: 5725, due: 'Before treatment (within 30 days)' }
      ]
    }
  ];

  const totalAmount = Object.values(packageDetails).reduce((sum, pkg) => sum + pkg.amount, 0);
  const currentPaymentAmount = selectedPlan === 'full' 
    ? paymentPlans.find(p => p.id === 'full')?.amount 
    : paymentPlans.find(p => p.id === 'installment')?.installments[0].amount;

  const handleMomoSuccess = (result) => {
    setPaymentResult(result);
    setPaymentStatus('success');
  };

  const handleMomoError = (error) => {
    setPaymentResult({ error });
    setPaymentStatus('error');
  };

  const handleCardPayment = () => {
    setPaymentStatus('processing');
    // Simulate card payment processing
    setTimeout(() => {
      setPaymentResult({
        transactionId: `CARD_${Date.now()}`,
        provider: 'Credit Card',
        amount: currentPaymentAmount,
        currency: 'USD',
        timestamp: new Date().toISOString()
      });
      setPaymentStatus('success');
    }, 3000);
  };

  const handleBankTransfer = () => {
    setPaymentStatus('processing');
    // Simulate bank transfer initiation
    setTimeout(() => {
      setPaymentResult({
        transactionId: `BANK_${Date.now()}`,
        provider: 'Bank Transfer',
        amount: currentPaymentAmount,
        currency: 'USD',
        timestamp: new Date().toISOString(),
        instructions: 'Bank transfer instructions have been sent to your email'
      });
      setPaymentStatus('success');
    }, 2000);
  };

  if (paymentStatus === 'success') {
    return (
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SafeIcon icon={FiCheckCircle} className="w-20 h-20 text-green-500 mx-auto mb-6" />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
          <p className="text-gray-600 mb-8">Your payment has been processed successfully.</p>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-green-800 mb-4">Payment Details</h3>
            <div className="space-y-2 text-sm text-green-700">
              <div className="flex justify-between">
                <span>Transaction ID:</span>
                <span className="font-mono">{paymentResult?.transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span>{paymentResult?.provider}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount Paid:</span>
                <span className="font-semibold">${paymentResult?.amount?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Date & Time:</span>
                <span>{new Date(paymentResult?.timestamp).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {paymentResult?.instructions && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">{paymentResult.instructions}</p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              Download Receipt
            </button>
            <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Continue to Travel Planning
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'error') {
    return (
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <SafeIcon icon={FiCheckCircle} className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Failed</h1>
          <p className="text-gray-600 mb-8">{paymentResult?.error || 'There was an issue processing your payment.'}</p>
          
          <button 
            onClick={() => {
              setPaymentStatus('pending');
              setPaymentResult(null);
            }}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Portal</h1>
        <p className="text-gray-600">Secure payment for your medical tourism package</p>
        <div className="mt-4 flex items-center space-x-2 text-green-600">
          <SafeIcon icon={FiShield} className="w-5 h-5" />
          <span className="text-sm font-medium">256-bit SSL encrypted secure payment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Package Breakdown */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Breakdown</h3>
            <div className="space-y-4">
              {Object.entries(packageDetails).map(([key, pkg]) => (
                <div key={key} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{pkg.title}</h4>
                    <span className="font-semibold text-primary-600">${pkg.amount.toLocaleString()}</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {pkg.items.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <SafeIcon icon={FiCheckCircle} className="w-3 h-3 text-green-500 mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total Package Value</span>
                <span className="text-xl font-bold text-gray-900">${totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Payment Plans */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Plans</h3>
            <div className="space-y-4">
              {paymentPlans.map((plan) => (
                <motion.div
                  key={plan.id}
                  whileHover={{ scale: 1.02 }}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPlan === plan.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedPlan === plan.id
                            ? 'bg-primary-500 border-primary-500'
                            : 'border-gray-300'
                        }`}></div>
                        <h4 className="font-medium text-gray-900">{plan.title}</h4>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {plan.discount}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 ml-7">{plan.description}</p>
                      
                      {plan.installments && selectedPlan === plan.id && (
                        <div className="mt-3 ml-7 space-y-2">
                          {plan.installments.map((installment, index) => (
                            <div key={index} className="flex justify-between items-center py-2 px-3 bg-white rounded border">
                              <span className="text-sm text-gray-600">{installment.due}</span>
                              <span className="font-medium">${installment.amount.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-gray-900">${plan.amount.toLocaleString()}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
            
            {/* Payment Method Selection */}
            <div className="space-y-3 mb-6">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-primary-600"
                />
                <SafeIcon icon={FiCreditCard} className="w-5 h-5 text-gray-400" />
                <span className="font-medium">Credit/Debit Card</span>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="momo"
                  checked={paymentMethod === 'momo'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-primary-600"
                />
                <SafeIcon icon={FiSmartphone} className="w-5 h-5 text-gray-400" />
                <span className="font-medium">Mobile Money</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  Popular in Africa
                </span>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank"
                  checked={paymentMethod === 'bank'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-primary-600"
                />
                <SafeIcon icon={FiDollarSign} className="w-5 h-5 text-gray-400" />
                <span className="font-medium">Bank Transfer</span>
              </label>
            </div>

            {/* Payment Forms */}
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <button
                  onClick={handleCardPayment}
                  disabled={paymentStatus === 'processing'}
                  className="w-full mt-6 bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiLock} className="w-4 h-4" />
                  <span>Pay with Card</span>
                </button>
              </div>
            )}

            {paymentMethod === 'momo' && (
              <MomoPayment
                amount={currentPaymentAmount}
                currency="USD"
                onSuccess={handleMomoSuccess}
                onError={handleMomoError}
              />
            )}

            {paymentMethod === 'bank' && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800 mb-2">
                    Bank transfer instructions will be provided after confirming your payment plan.
                  </p>
                  <p className="text-xs text-blue-600">
                    Processing time: 1-3 business days
                  </p>
                </div>
                
                <button
                  onClick={handleBankTransfer}
                  disabled={paymentStatus === 'processing'}
                  className="w-full mt-6 bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiGlobe} className="w-4 h-4" />
                  <span>Get Transfer Instructions</span>
                </button>
              </div>
            )}
          </div>

          {/* Payment Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Package Total</span>
                <span>${totalAmount.toLocaleString()}</span>
              </div>
              {selectedPlan === 'full' && (
                <div className="flex justify-between text-green-600">
                  <span>Discount (5%)</span>
                  <span>-${(totalAmount * 0.05).toLocaleString()}</span>
                </div>
              )}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span>
                    {selectedPlan === 'installment' ? 'First Payment' : 'Total Amount'}
                  </span>
                  <span className="text-primary-600">
                    ${currentPaymentAmount?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                By proceeding, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPortal;