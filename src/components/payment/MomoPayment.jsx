import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiSmartphone, FiCheckCircle, FiAlertCircle, FiLoader, FiShield, FiPhone } = FiIcons;

const MomoPayment = ({ amount, onSuccess, onError, currency = 'USD' }) => {
  const [selectedProvider, setSelectedProvider] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState('selection'); // selection, processing, confirmation
  const [transactionId, setTransactionId] = useState('');

  const momoProviders = [
    {
      id: 'mtn',
      name: 'MTN Mobile Money',
      countries: ['Ghana', 'Uganda', 'Rwanda', 'Zambia', 'Cameroon', 'Benin', 'Congo', 'Guinea-Bissau', 'Guinea-Conakry', 'Liberia', 'South Sudan'],
      logo: '📱',
      color: 'bg-yellow-500',
      prefixes: ['+233', '+256', '+250', '+260', '+237'],
      apiEndpoint: 'https://sandbox.momodeveloper.mtn.com',
      instructions: 'You will receive a USSD prompt on your phone to authorize the payment'
    },
    {
      id: 'orange',
      name: 'Orange Money',
      countries: ['Senegal', 'Mali', 'Burkina Faso', 'Niger', 'Guinea', 'Madagascar', 'Jordan'],
      logo: '🟠',
      color: 'bg-orange-500',
      prefixes: ['+221', '+223', '+226', '+227', '+224'],
      apiEndpoint: 'https://api.orange.com/orange-money-webpay',
      instructions: 'Enter your Orange Money PIN when prompted on your device'
    },
    {
      id: 'airtel',
      name: 'Airtel Money',
      countries: ['Kenya', 'Tanzania', 'Uganda', 'Rwanda', 'Zambia', 'Malawi', 'Madagascar', 'Niger', 'Chad', 'Gabon'],
      logo: '🔴',
      color: 'bg-red-500',
      prefixes: ['+254', '+255', '+256', '+250', '+260'],
      apiEndpoint: 'https://openapi.airtel.africa/merchant/v1',
      instructions: 'Confirm the payment using your Airtel Money PIN'
    },
    {
      id: 'wave',
      name: 'Wave Mobile Money',
      countries: ['Senegal', 'Mali', 'Burkina Faso', 'Ivory Coast'],
      logo: '🌊',
      color: 'bg-blue-500',
      prefixes: ['+221', '+223', '+226', '+225'],
      apiEndpoint: 'https://api.wave.com',
      instructions: 'Use your Wave app to confirm the payment'
    },
    {
      id: 'moov',
      name: 'Moov Money',
      countries: ['Benin', 'Burkina Faso', 'Ivory Coast', 'Mali', 'Niger', 'Senegal', 'Togo'],
      logo: '💙',
      color: 'bg-indigo-500',
      prefixes: ['+229', '+226', '+225', '+223', '+227', '+221', '+228'],
      apiEndpoint: 'https://api.moov-africa.com',
      instructions: 'Dial *555# and follow the prompts to complete payment'
    },
    {
      id: 'mpesa',
      name: 'M-Pesa',
      countries: ['Kenya', 'Tanzania', 'Mozambique', 'Lesotho', 'Ghana', 'Egypt'],
      logo: '💚',
      color: 'bg-green-600',
      prefixes: ['+254', '+255', '+258', '+266', '+233', '+20'],
      apiEndpoint: 'https://sandbox.safaricom.co.ke',
      instructions: 'Enter your M-Pesa PIN when prompted'
    }
  ];

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider);
    // Auto-detect country code if possible
    const userCountry = detectUserCountry();
    if (userCountry && provider.prefixes.length > 0) {
      const countryPrefix = provider.prefixes.find(prefix => 
        prefix === getCountryPrefix(userCountry)
      );
      if (countryPrefix) {
        setPhoneNumber(countryPrefix + ' ');
      }
    }
  };

  const detectUserCountry = () => {
    // This could be enhanced with actual geolocation
    return null;
  };

  const getCountryPrefix = (country) => {
    const prefixMap = {
      'Ghana': '+233',
      'Kenya': '+254',
      'Uganda': '+256',
      'Tanzania': '+255',
      'Senegal': '+221',
      'Mali': '+223',
      // Add more mappings as needed
    };
    return prefixMap[country] || '';
  };

  const validatePhoneNumber = (phone, provider) => {
    if (!phone || phone.length < 10) return false;
    
    // Check if phone number matches provider's supported prefixes
    const cleanPhone = phone.replace(/\s+/g, '');
    return provider.prefixes.some(prefix => 
      cleanPhone.startsWith(prefix) || cleanPhone.startsWith(prefix.substring(1))
    );
  };

  const initiatePayment = async () => {
    if (!selectedProvider || !phoneNumber) {
      onError?.('Please select a provider and enter your phone number');
      return;
    }

    const provider = momoProviders.find(p => p.id === selectedProvider);
    if (!validatePhoneNumber(phoneNumber, provider)) {
      onError?.('Please enter a valid phone number for the selected provider');
      return;
    }

    setIsProcessing(true);
    setPaymentStep('processing');

    try {
      // Generate a unique transaction ID
      const txnId = `EMIRAFRIK_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setTransactionId(txnId);

      // Simulate API call to mobile money provider
      const paymentRequest = await processMomoPayment({
        provider: provider,
        phoneNumber: phoneNumber.replace(/\s+/g, ''),
        amount: amount,
        currency: currency,
        transactionId: txnId,
        description: 'EMIRAFRIK Medical Tourism Payment'
      });

      if (paymentRequest.success) {
        setPaymentStep('confirmation');
        // Poll for payment status
        pollPaymentStatus(txnId, provider);
      } else {
        throw new Error(paymentRequest.error || 'Payment initiation failed');
      }
    } catch (error) {
      setIsProcessing(false);
      setPaymentStep('selection');
      onError?.(error.message);
    }
  };

  const processMomoPayment = async ({ provider, phoneNumber, amount, currency, transactionId, description }) => {
    // This is where you'd integrate with actual Mobile Money APIs
    // Each provider has different API specifications
    
    const paymentData = {
      amount: amount.toString(),
      currency: currency,
      externalId: transactionId,
      payer: {
        partyIdType: 'MSISDN',
        partyId: phoneNumber
      },
      payerMessage: description,
      payeeNote: `Payment for EMIRAFRIK medical services - ${transactionId}`
    };

    // Simulate different provider integrations
    switch (provider.id) {
      case 'mtn':
        return await processMTNPayment(paymentData);
      case 'orange':
        return await processOrangePayment(paymentData);
      case 'airtel':
        return await processAirtelPayment(paymentData);
      case 'mpesa':
        return await processMPesaPayment(paymentData);
      default:
        return await processGenericMomoPayment(paymentData, provider);
    }
  };

  const processMTNPayment = async (paymentData) => {
    // MTN Mobile Money API integration
    try {
      // In production, you'd make actual API calls here
      const response = await fetch('/api/momo/mtn/request-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.MTN_API_KEY}`,
          'X-Reference-Id': paymentData.externalId,
          'X-Target-Environment': 'sandbox', // Change to 'production' for live
          'Ocp-Apim-Subscription-Key': process.env.MTN_SUBSCRIPTION_KEY
        },
        body: JSON.stringify(paymentData)
      });

      if (response.ok) {
        return { success: true, referenceId: paymentData.externalId };
      } else {
        throw new Error('MTN payment request failed');
      }
    } catch (error) {
      // For demo purposes, simulate success
      console.log('MTN Payment simulation:', paymentData);
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ success: true, referenceId: paymentData.externalId });
        }, 1000);
      });
    }
  };

  const processOrangePayment = async (paymentData) => {
    // Orange Money API integration
    console.log('Orange Payment simulation:', paymentData);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ success: true, referenceId: paymentData.externalId });
      }, 1500);
    });
  };

  const processAirtelPayment = async (paymentData) => {
    // Airtel Money API integration
    console.log('Airtel Payment simulation:', paymentData);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ success: true, referenceId: paymentData.externalId });
      }, 1200);
    });
  };

  const processMPesaPayment = async (paymentData) => {
    // M-Pesa API integration (Safaricom)
    console.log('M-Pesa Payment simulation:', paymentData);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ success: true, referenceId: paymentData.externalId });
      }, 800);
    });
  };

  const processGenericMomoPayment = async (paymentData, provider) => {
    // Generic mobile money payment processing
    console.log(`${provider.name} Payment simulation:`, paymentData);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ success: true, referenceId: paymentData.externalId });
      }, 1000);
    });
  };

  const pollPaymentStatus = async (txnId, provider) => {
    const maxAttempts = 30; // 5 minutes with 10-second intervals
    let attempts = 0;

    const checkStatus = async () => {
      try {
        attempts++;
        
        // Simulate payment status check
        const status = await checkMomoPaymentStatus(txnId, provider);
        
        if (status.state === 'SUCCESSFUL') {
          setIsProcessing(false);
          onSuccess?.({
            transactionId: txnId,
            provider: provider.name,
            amount: amount,
            currency: currency,
            timestamp: new Date().toISOString()
          });
        } else if (status.state === 'FAILED') {
          setIsProcessing(false);
          setPaymentStep('selection');
          onError?.('Payment was declined or failed. Please try again.');
        } else if (attempts < maxAttempts) {
          // Continue polling
          setTimeout(checkStatus, 10000); // Check every 10 seconds
        } else {
          setIsProcessing(false);
          setPaymentStep('selection');
          onError?.('Payment timeout. Please check your phone and try again.');
        }
      } catch (error) {
        setIsProcessing(false);
        setPaymentStep('selection');
        onError?.('Error checking payment status. Please contact support.');
      }
    };

    checkStatus();
  };

  const checkMomoPaymentStatus = async (txnId, provider) => {
    // Simulate payment status check - in production, this would call the actual API
    return new Promise(resolve => {
      setTimeout(() => {
        // Simulate 80% success rate
        const isSuccess = Math.random() > 0.2;
        resolve({
          state: isSuccess ? 'SUCCESSFUL' : 'PENDING',
          transactionId: txnId
        });
      }, 2000);
    });
  };

  const formatAmount = (amount, currency) => {
    const formatters = {
      USD: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
      EUR: new Intl.NumberFormat('en-EU', { style: 'currency', currency: 'EUR' }),
      GHS: new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS' }),
      KES: new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }),
      UGX: new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX' }),
      XOF: new Intl.NumberFormat('fr-SN', { style: 'currency', currency: 'XOF' }),
    };
    
    return formatters[currency]?.format(amount) || `${currency} ${amount}`;
  };

  if (paymentStep === 'processing') {
    return (
      <div className="bg-white rounded-lg p-8 text-center">
        <div className="mb-6">
          <SafeIcon icon={FiLoader} className="w-16 h-16 text-blue-600 mx-auto animate-spin" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Processing Payment</h3>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800 mb-2">
            <strong>Transaction ID:</strong> {transactionId}
          </p>
          <p className="text-sm text-blue-800 mb-2">
            <strong>Amount:</strong> {formatAmount(amount, currency)}
          </p>
          <p className="text-sm text-blue-800">
            <strong>Phone:</strong> {phoneNumber}
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <SafeIcon icon={FiSmartphone} className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="text-left">
              <p className="text-sm text-yellow-800 font-medium">Check Your Phone</p>
              <p className="text-sm text-yellow-700">
                {momoProviders.find(p => p.id === selectedProvider)?.instructions}
              </p>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600">
          Please complete the payment on your mobile device. This page will update automatically.
        </p>
      </div>
    );
  }

  if (paymentStep === 'confirmation') {
    return (
      <div className="bg-white rounded-lg p-8 text-center">
        <div className="mb-6">
          <SafeIcon icon={FiCheckCircle} className="w-16 h-16 text-green-600 mx-auto" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment Successful!</h3>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-green-800 mb-2">
            <strong>Transaction ID:</strong> {transactionId}
          </p>
          <p className="text-sm text-green-800 mb-2">
            <strong>Amount Paid:</strong> {formatAmount(amount, currency)}
          </p>
          <p className="text-sm text-green-800">
            <strong>Provider:</strong> {momoProviders.find(p => p.id === selectedProvider)?.name}
          </p>
        </div>

        <p className="text-sm text-gray-600">
          You will receive an SMS confirmation shortly. Keep this transaction ID for your records.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile Money Payment</h3>
        <p className="text-2xl font-bold text-primary-600">{formatAmount(amount, currency)}</p>
      </div>

      {/* Provider Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Your Mobile Money Provider
        </label>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {momoProviders.map((provider) => (
            <motion.button
              key={provider.id}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleProviderSelect(provider)}
              className={`p-4 border-2 rounded-lg text-left transition-all ${
                selectedProvider === provider.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-primary-300'
              }`}
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{provider.logo}</span>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{provider.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Available in: {provider.countries.slice(0, 3).join(', ')}
                    {provider.countries.length > 3 && ` +${provider.countries.length - 3} more`}
                  </p>
                </div>
                {selectedProvider === provider.id && (
                  <SafeIcon icon={FiCheckCircle} className="w-5 h-5 text-primary-600" />
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Phone Number Input */}
      {selectedProvider && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Money Phone Number
          </label>
          
          <div className="relative">
            <SafeIcon icon={FiPhone} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="e.g. +233 24 123 4567"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <p className="text-sm text-gray-500 mt-2">
            Enter the phone number registered with your {momoProviders.find(p => p.id === selectedProvider)?.name} account
          </p>
        </motion.div>
      )}

      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <SafeIcon icon={FiShield} className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm text-blue-800 font-medium">Secure Payment</p>
            <p className="text-sm text-blue-700">
              Your payment is protected by bank-grade security. We never store your mobile money PIN or personal details.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <button
        onClick={initiatePayment}
        disabled={!selectedProvider || !phoneNumber || isProcessing}
        className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
      >
        {isProcessing ? (
          <>
            <SafeIcon icon={FiLoader} className="w-4 h-4 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <SafeIcon icon={FiSmartphone} className="w-4 h-4" />
            <span>Pay with Mobile Money</span>
          </>
        )}
      </button>

      {/* Help Text */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Need help? Contact our support team at{' '}
          <a href="tel:+971501234567" className="text-primary-600 hover:text-primary-700">
            +971 50 123 4567
          </a>
        </p>
      </div>
    </div>
  );
};

export default MomoPayment;