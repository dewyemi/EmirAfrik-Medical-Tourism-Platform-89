// Mobile Money API Integration Services
// This file contains the actual API integration logic for different Mobile Money providers

export class MomoApiService {
  constructor() {
    this.baseUrls = {
      mtn: process.env.REACT_APP_MTN_API_URL || 'https://sandbox.momodeveloper.mtn.com',
      orange: process.env.REACT_APP_ORANGE_API_URL || 'https://api.orange.com/orange-money-webpay',
      airtel: process.env.REACT_APP_AIRTEL_API_URL || 'https://openapi.airtel.africa/merchant/v1',
      mpesa: process.env.REACT_APP_MPESA_API_URL || 'https://sandbox.safaricom.co.ke',
      wave: process.env.REACT_APP_WAVE_API_URL || 'https://api.wave.com'
    };
    
    this.apiKeys = {
      mtn: {
        subscriptionKey: process.env.REACT_APP_MTN_SUBSCRIPTION_KEY,
        userId: process.env.REACT_APP_MTN_USER_ID,
        apiKey: process.env.REACT_APP_MTN_API_KEY
      },
      orange: {
        clientId: process.env.REACT_APP_ORANGE_CLIENT_ID,
        clientSecret: process.env.REACT_APP_ORANGE_CLIENT_SECRET
      },
      airtel: {
        clientId: process.env.REACT_APP_AIRTEL_CLIENT_ID,
        clientSecret: process.env.REACT_APP_AIRTEL_CLIENT_SECRET
      },
      mpesa: {
        consumerKey: process.env.REACT_APP_MPESA_CONSUMER_KEY,
        consumerSecret: process.env.REACT_APP_MPESA_CONSUMER_SECRET,
        shortcode: process.env.REACT_APP_MPESA_SHORTCODE,
        passkey: process.env.REACT_APP_MPESA_PASSKEY
      }
    };
  }

  // MTN Mobile Money Integration
  async processMTNPayment(paymentData) {
    try {
      // Step 1: Get access token
      const accessToken = await this.getMTNAccessToken();
      
      // Step 2: Create payment request
      const response = await fetch(`${this.baseUrls.mtn}/collection/v1_0/requesttopay`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'X-Reference-Id': paymentData.externalId,
          'X-Target-Environment': process.env.NODE_ENV === 'production' ? 'mtncameroon' : 'sandbox',
          'Ocp-Apim-Subscription-Key': this.apiKeys.mtn.subscriptionKey
        },
        body: JSON.stringify({
          amount: paymentData.amount,
          currency: paymentData.currency,
          externalId: paymentData.externalId,
          payer: {
            partyIdType: 'MSISDN',
            partyId: paymentData.payer.partyId
          },
          payerMessage: paymentData.payerMessage,
          payeeNote: paymentData.payeeNote
        })
      });

      if (response.ok) {
        return { success: true, referenceId: paymentData.externalId };
      } else {
        const error = await response.json();
        throw new Error(error.message || 'MTN payment request failed');
      }
    } catch (error) {
      console.error('MTN Payment Error:', error);
      throw error;
    }
  }

  async getMTNAccessToken() {
    const response = await fetch(`${this.baseUrls.mtn}/collection/token/`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`${this.apiKeys.mtn.userId}:${this.apiKeys.mtn.apiKey}`)}`,
        'Ocp-Apim-Subscription-Key': this.apiKeys.mtn.subscriptionKey
      }
    });

    const data = await response.json();
    return data.access_token;
  }

  async checkMTNPaymentStatus(referenceId) {
    try {
      const accessToken = await this.getMTNAccessToken();
      
      const response = await fetch(`${this.baseUrls.mtn}/collection/v1_0/requesttopay/${referenceId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'X-Target-Environment': process.env.NODE_ENV === 'production' ? 'mtncameroon' : 'sandbox',
          'Ocp-Apim-Subscription-Key': this.apiKeys.mtn.subscriptionKey
        }
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('MTN Status Check Error:', error);
      throw error;
    }
  }

  // Orange Money Integration
  async processOrangePayment(paymentData) {
    try {
      // Step 1: Get access token
      const accessToken = await this.getOrangeAccessToken();
      
      // Step 2: Create payment request
      const response = await fetch(`${this.baseUrls.orange}/v1/webpayment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          merchant_key: this.apiKeys.orange.clientId,
          currency: paymentData.currency,
          order_id: paymentData.externalId,
          amount: paymentData.amount,
          return_url: `${window.location.origin}/payment/success`,
          cancel_url: `${window.location.origin}/payment/cancel`,
          notif_url: `${window.location.origin}/api/payment/webhook/orange`,
          lang: 'en',
          reference: paymentData.externalId
        })
      });

      const data = await response.json();
      
      if (data.status === 'success') {
        return { success: true, referenceId: paymentData.externalId, paymentUrl: data.payment_url };
      } else {
        throw new Error(data.message || 'Orange payment request failed');
      }
    } catch (error) {
      console.error('Orange Payment Error:', error);
      throw error;
    }
  }

  async getOrangeAccessToken() {
    const response = await fetch(`${this.baseUrls.orange}/oauth/v2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${this.apiKeys.orange.clientId}:${this.apiKeys.orange.clientSecret}`)}`
      },
      body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    return data.access_token;
  }

  // Airtel Money Integration
  async processAirtelPayment(paymentData) {
    try {
      // Step 1: Get access token
      const accessToken = await this.getAirtelAccessToken();
      
      // Step 2: Create payment request
      const response = await fetch(`${this.baseUrls.airtel}/standard/v1/payments/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'X-Country': this.getCountryFromPhone(paymentData.payer.partyId),
          'X-Currency': paymentData.currency
        },
        body: JSON.stringify({
          reference: paymentData.externalId,
          subscriber: {
            country: this.getCountryFromPhone(paymentData.payer.partyId),
            currency: paymentData.currency,
            msisdn: paymentData.payer.partyId
          },
          transaction: {
            amount: paymentData.amount,
            country: this.getCountryFromPhone(paymentData.payer.partyId),
            currency: paymentData.currency,
            id: paymentData.externalId
          }
        })
      });

      const data = await response.json();
      
      if (data.status && data.status.success) {
        return { success: true, referenceId: paymentData.externalId };
      } else {
        throw new Error(data.status?.message || 'Airtel payment request failed');
      }
    } catch (error) {
      console.error('Airtel Payment Error:', error);
      throw error;
    }
  }

  async getAirtelAccessToken() {
    const response = await fetch(`${this.baseUrls.airtel}/auth/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: this.apiKeys.airtel.clientId,
        client_secret: this.apiKeys.airtel.clientSecret,
        grant_type: 'client_credentials'
      })
    });

    const data = await response.json();
    return data.access_token;
  }

  // M-Pesa Integration (Safaricom)
  async processMPesaPayment(paymentData) {
    try {
      // Step 1: Get access token
      const accessToken = await this.getMPesaAccessToken();
      
      // Step 2: Create STK Push request
      const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
      const password = btoa(`${this.apiKeys.mpesa.shortcode}${this.apiKeys.mpesa.passkey}${timestamp}`);
      
      const response = await fetch(`${this.baseUrls.mpesa}/mpesa/stkpush/v1/processrequest`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          BusinessShortCode: this.apiKeys.mpesa.shortcode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: paymentData.amount,
          PartyA: paymentData.payer.partyId,
          PartyB: this.apiKeys.mpesa.shortcode,
          PhoneNumber: paymentData.payer.partyId,
          CallBackURL: `${window.location.origin}/api/payment/webhook/mpesa`,
          AccountReference: paymentData.externalId,
          TransactionDesc: paymentData.payerMessage
        })
      });

      const data = await response.json();
      
      if (data.ResponseCode === '0') {
        return { success: true, referenceId: data.CheckoutRequestID };
      } else {
        throw new Error(data.ResponseDescription || 'M-Pesa payment request failed');
      }
    } catch (error) {
      console.error('M-Pesa Payment Error:', error);
      throw error;
    }
  }

  async getMPesaAccessToken() {
    const auth = btoa(`${this.apiKeys.mpesa.consumerKey}:${this.apiKeys.mpesa.consumerSecret}`);
    
    const response = await fetch(`${this.baseUrls.mpesa}/oauth/v1/generate?grant_type=client_credentials`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`
      }
    });

    const data = await response.json();
    return data.access_token;
  }

  // Utility methods
  getCountryFromPhone(phoneNumber) {
    const countryMap = {
      '+233': 'GH', // Ghana
      '+254': 'KE', // Kenya
      '+255': 'TZ', // Tanzania
      '+256': 'UG', // Uganda
      '+250': 'RW', // Rwanda
      '+260': 'ZM', // Zambia
      '+221': 'SN', // Senegal
      '+223': 'ML', // Mali
      '+226': 'BF', // Burkina Faso
      '+225': 'CI', // Ivory Coast
      '+227': 'NE', // Niger
      '+229': 'BJ', // Benin
      '+228': 'TG', // Togo
      '+237': 'CM', // Cameroon
    };

    for (const [prefix, country] of Object.entries(countryMap)) {
      if (phoneNumber.startsWith(prefix)) {
        return country;
      }
    }
    
    return 'GH'; // Default to Ghana
  }

  formatPhoneNumber(phoneNumber, countryCode) {
    // Remove all non-digit characters except +
    let cleaned = phoneNumber.replace(/[^\d+]/g, '');
    
    // Add country code if not present
    if (!cleaned.startsWith('+')) {
      cleaned = countryCode + cleaned;
    }
    
    return cleaned;
  }

  validatePhoneNumber(phoneNumber, provider) {
    const cleaned = phoneNumber.replace(/\s+/g, '');
    
    // Check minimum length
    if (cleaned.length < 10) return false;
    
    // Check if it matches provider's supported countries
    return provider.prefixes.some(prefix => 
      cleaned.startsWith(prefix) || cleaned.startsWith(prefix.substring(1))
    );
  }
}

// Export singleton instance
export const momoApi = new MomoApiService();

// Export individual provider methods for direct use
export const mtnApi = {
  processPayment: (data) => momoApi.processMTNPayment(data),
  checkStatus: (id) => momoApi.checkMTNPaymentStatus(id)
};

export const orangeApi = {
  processPayment: (data) => momoApi.processOrangePayment(data)
};

export const airtelApi = {
  processPayment: (data) => momoApi.processAirtelPayment(data)
};

export const mpesaApi = {
  processPayment: (data) => momoApi.processMPesaPayment(data)
};