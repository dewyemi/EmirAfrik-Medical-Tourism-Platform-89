// Payment utility functions and helpers

export const CURRENCY_CONVERSION_RATES = {
  // Base currency is USD
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  // West African CFA Franc
  XOF: 590,
  // East African currencies
  KES: 150, // Kenya Shilling
  UGX: 3700, // Uganda Shilling
  TZS: 2300, // Tanzania Shilling
  RWF: 1100, // Rwanda Franc
  // Southern African currencies
  ZAR: 18, // South African Rand
  ZMW: 25, // Zambian Kwacha
  // North African currencies
  EGP: 31, // Egyptian Pound
  MAD: 10, // Moroccan Dirham
  // Other African currencies
  GHS: 12, // Ghana Cedi
  NGN: 750, // Nigerian Naira
  ETB: 55, // Ethiopian Birr
};

export const COUNTRY_CURRENCY_MAP = {
  'Ghana': 'GHS',
  'Kenya': 'KES',
  'Uganda': 'UGX',
  'Tanzania': 'TZS',
  'Rwanda': 'RWF',
  'Zambia': 'ZMW',
  'Senegal': 'XOF',
  'Mali': 'XOF',
  'Burkina Faso': 'XOF',
  'Niger': 'XOF',
  'Ivory Coast': 'XOF',
  'Guinea': 'XOF',
  'Benin': 'XOF',
  'Togo': 'XOF',
  'Morocco': 'MAD',
  'Egypt': 'EGP',
  'South Africa': 'ZAR',
  'Nigeria': 'NGN',
  'Ethiopia': 'ETB',
  'UAE': 'USD', // Dubai-based, typically USD for medical tourism
};

export const MOMO_PROVIDER_COUNTRIES = {
  'mtn': [
    'Ghana', 'Uganda', 'Rwanda', 'Zambia', 'Cameroon', 
    'Benin', 'Congo', 'Guinea-Bissau', 'Guinea-Conakry', 
    'Liberia', 'South Sudan'
  ],
  'orange': [
    'Senegal', 'Mali', 'Burkina Faso', 'Niger', 
    'Guinea', 'Madagascar', 'Jordan'
  ],
  'airtel': [
    'Kenya', 'Tanzania', 'Uganda', 'Rwanda', 'Zambia', 
    'Malawi', 'Madagascar', 'Niger', 'Chad', 'Gabon'
  ],
  'wave': [
    'Senegal', 'Mali', 'Burkina Faso', 'Ivory Coast'
  ],
  'moov': [
    'Benin', 'Burkina Faso', 'Ivory Coast', 'Mali', 
    'Niger', 'Senegal', 'Togo'
  ],
  'mpesa': [
    'Kenya', 'Tanzania', 'Mozambique', 'Lesotho', 
    'Ghana', 'Egypt'
  ]
};

export const convertCurrency = (amount, fromCurrency, toCurrency) => {
  if (fromCurrency === toCurrency) return amount;
  
  const fromRate = CURRENCY_CONVERSION_RATES[fromCurrency] || 1;
  const toRate = CURRENCY_CONVERSION_RATES[toCurrency] || 1;
  
  // Convert to USD first, then to target currency
  const usdAmount = amount / fromRate;
  return usdAmount * toRate;
};

export const formatCurrency = (amount, currency, locale = 'en-US') => {
  const formatters = {
    USD: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
    EUR: new Intl.NumberFormat('en-EU', { style: 'currency', currency: 'EUR' }),
    GBP: new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }),
    GHS: new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS' }),
    KES: new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }),
    UGX: new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX' }),
    TZS: new Intl.NumberFormat('en-TZ', { style: 'currency', currency: 'TZS' }),
    RWF: new Intl.NumberFormat('en-RW', { style: 'currency', currency: 'RWF' }),
    ZMW: new Intl.NumberFormat('en-ZM', { style: 'currency', currency: 'ZMW' }),
    XOF: new Intl.NumberFormat('fr-SN', { style: 'currency', currency: 'XOF' }),
    MAD: new Intl.NumberFormat('ar-MA', { style: 'currency', currency: 'MAD' }),
    EGP: new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' }),
    ZAR: new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }),
    NGN: new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }),
    ETB: new Intl.NumberFormat('en-ET', { style: 'currency', currency: 'ETB' }),
  };
  
  const formatter = formatters[currency];
  if (formatter) {
    return formatter.format(amount);
  }
  
  // Fallback formatting
  return `${currency} ${amount.toLocaleString(locale, { minimumFractionDigits: 2 })}`;
};

export const detectUserCountry = async () => {
  try {
    // Try to get country from geolocation API
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country_name;
  } catch (error) {
    console.warn('Could not detect user country:', error);
    return null;
  }
};

export const getRecommendedProviders = (country) => {
  const providers = [];
  
  for (const [providerId, countries] of Object.entries(MOMO_PROVIDER_COUNTRIES)) {
    if (countries.includes(country)) {
      providers.push(providerId);
    }
  }
  
  return providers;
};

export const validatePaymentAmount = (amount, currency, minAmount = 1) => {
  const errors = [];
  
  if (!amount || amount <= 0) {
    errors.push('Amount must be greater than 0');
  }
  
  if (amount < minAmount) {
    errors.push(`Minimum payment amount is ${formatCurrency(minAmount, currency)}`);
  }
  
  // Currency-specific validations
  const maxAmounts = {
    USD: 50000,
    EUR: 45000,
    GHS: 600000,
    KES: 15000000,
    UGX: 370000000,
    XOF: 59000000,
    // Add more limits as needed
  };
  
  const maxAmount = maxAmounts[currency];
  if (maxAmount && amount > maxAmount) {
    errors.push(`Maximum payment amount is ${formatCurrency(maxAmount, currency)}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const generateTransactionId = (prefix = 'EMIRAFRIK') => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 11);
  return `${prefix}_${timestamp}_${randomString}`.toUpperCase();
};

export const getPaymentMethodIcon = (method) => {
  const icons = {
    'mtn': '📱',
    'orange': '🟠',
    'airtel': '🔴',
    'wave': '🌊',
    'moov': '💙',
    'mpesa': '💚',
    'card': '💳',
    'bank': '🏦'
  };
  
  return icons[method] || '💰';
};

export const getPaymentStatusColor = (status) => {
  const colors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'processing': 'bg-blue-100 text-blue-800',
    'successful': 'bg-green-100 text-green-800',
    'failed': 'bg-red-100 text-red-800',
    'cancelled': 'bg-gray-100 text-gray-800'
  };
  
  return colors[status] || colors['pending'];
};

export const formatPhoneForProvider = (phoneNumber, provider) => {
  // Remove all non-digit characters except +
  let cleaned = phoneNumber.replace(/[^\d+]/g, '');
  
  // Provider-specific formatting
  switch (provider) {
    case 'mtn':
    case 'airtel':
    case 'mpesa':
      // These providers typically expect international format
      if (!cleaned.startsWith('+')) {
        // Try to detect and add country code
        if (cleaned.length === 9 && provider === 'mtn') {
          cleaned = '+233' + cleaned; // Ghana default for MTN
        } else if (cleaned.length === 9 && provider === 'airtel') {
          cleaned = '+254' + cleaned; // Kenya default for Airtel
        } else if (cleaned.length === 9 && provider === 'mpesa') {
          cleaned = '+254' + cleaned; // Kenya for M-Pesa
        }
      }
      break;
      
    case 'orange':
    case 'wave':
    case 'moov':
      // These might accept local format
      if (cleaned.startsWith('+')) {
        // Keep international format
      } else if (cleaned.length >= 8) {
        // Add default country code (Senegal for these providers)
        cleaned = '+221' + cleaned;
      }
      break;
  }
  
  return cleaned;
};

export const getMomoProviderByCountry = (country) => {
  const recommendations = {
    'Ghana': ['mtn', 'airtel'],
    'Kenya': ['mpesa', 'airtel'],
    'Uganda': ['mtn', 'airtel'],
    'Tanzania': ['airtel', 'mpesa'],
    'Rwanda': ['mtn', 'airtel'],
    'Senegal': ['orange', 'wave', 'moov'],
    'Mali': ['orange', 'wave', 'moov'],
    'Burkina Faso': ['orange', 'wave', 'moov'],
    'Niger': ['orange', 'airtel', 'moov'],
    'Ivory Coast': ['orange', 'wave', 'moov'],
    'Zambia': ['mtn', 'airtel'],
    'Cameroon': ['mtn', 'orange'],
    'Benin': ['mtn', 'moov'],
    'Togo': ['moov'],
    'Guinea': ['orange'],
    'Madagascar': ['orange', 'airtel']
  };
  
  return recommendations[country] || [];
};

export const createPaymentSummary = (paymentData) => {
  return {
    transactionId: paymentData.transactionId,
    amount: paymentData.amount,
    currency: paymentData.currency,
    provider: paymentData.provider,
    phoneNumber: paymentData.phoneNumber,
    timestamp: new Date().toISOString(),
    status: 'pending',
    description: paymentData.description || 'EMIRAFRIK Medical Tourism Payment'
  };
};

export default {
  convertCurrency,
  formatCurrency,
  detectUserCountry,
  getRecommendedProviders,
  validatePaymentAmount,
  generateTransactionId,
  getPaymentMethodIcon,
  getPaymentStatusColor,
  formatPhoneForProvider,
  getMomoProviderByCountry,
  createPaymentSummary,
  CURRENCY_CONVERSION_RATES,
  COUNTRY_CURRENCY_MAP,
  MOMO_PROVIDER_COUNTRIES
};