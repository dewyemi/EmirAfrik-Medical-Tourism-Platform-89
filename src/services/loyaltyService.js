// Loyalty and Rewards Service

export class LoyaltyService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'https://api.emirafrik.com';
  }

  // Get user's loyalty profile
  async getLoyaltyProfile(userId) {
    try {
      const response = await fetch(`${this.baseURL}/loyalty/profile/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching loyalty profile:', error);
      throw error;
    }
  }

  // Award points for various actions
  async awardPoints(userId, action, points, description = '') {
    try {
      const response = await fetch(`${this.baseURL}/loyalty/award-points`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          action,
          points,
          description,
          timestamp: new Date().toISOString()
        })
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error awarding points:', error);
      throw error;
    }
  }

  // Redeem reward
  async redeemReward(userId, rewardId, pointsCost) {
    try {
      const response = await fetch(`${this.baseURL}/loyalty/redeem-reward`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          rewardId,
          pointsCost,
          timestamp: new Date().toISOString()
        })
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error redeeming reward:', error);
      throw error;
    }
  }

  // Get points history
  async getPointsHistory(userId, limit = 50) {
    try {
      const response = await fetch(`${this.baseURL}/loyalty/points-history/${userId}?limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching points history:', error);
      throw error;
    }
  }

  // Get available rewards
  async getAvailableRewards(userTier = null) {
    try {
      const url = userTier 
        ? `${this.baseURL}/loyalty/rewards?tier=${userTier}`
        : `${this.baseURL}/loyalty/rewards`;
        
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching rewards:', error);
      throw error;
    }
  }

  // Get tier information
  async getTierInfo() {
    try {
      const response = await fetch(`${this.baseURL}/loyalty/tiers`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching tier info:', error);
      throw error;
    }
  }

  // Generate referral link
  async generateReferralLink(userId) {
    try {
      const response = await fetch(`${this.baseURL}/loyalty/generate-referral`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error generating referral link:', error);
      throw error;
    }
  }

  // Process referral
  async processReferral(referralCode, newUserId) {
    try {
      const response = await fetch(`${this.baseURL}/loyalty/process-referral`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          referralCode,
          newUserId,
          timestamp: new Date().toISOString()
        })
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error processing referral:', error);
      throw error;
    }
  }

  // Point earning actions and their values
  static POINT_ACTIONS = {
    REGISTRATION: { points: 100, description: 'Welcome bonus for registration' },
    DOCUMENT_UPLOAD: { points: 50, description: 'Document uploaded successfully' },
    APPOINTMENT_ATTENDED: { points: 200, description: 'Attended scheduled appointment' },
    TREATMENT_COMPLETED: { points: 500, description: 'Completed medical treatment' },
    REVIEW_SUBMITTED: { points: 100, description: 'Submitted treatment review' },
    REFERRAL_SUCCESS: { points: 500, description: 'Successful patient referral' },
    SURVEY_COMPLETED: { points: 75, description: 'Completed satisfaction survey' },
    SOCIAL_SHARE: { points: 25, description: 'Shared EMIRAFRIK on social media' },
    NEWSLETTER_SIGNUP: { points: 50, description: 'Subscribed to newsletter' },
    PROFILE_COMPLETION: { points: 100, description: 'Completed profile information' },
    PAYMENT_ON_TIME: { points: 150, description: 'Payment made on time' },
    LOYALTY_MILESTONE: { points: 250, description: 'Reached loyalty milestone' }
  };

  // Award points for specific actions
  async awardPointsForAction(userId, actionType, additionalData = {}) {
    const action = this.constructor.POINT_ACTIONS[actionType];
    if (!action) {
      throw new Error(`Unknown point action: ${actionType}`);
    }

    return await this.awardPoints(
      userId,
      actionType,
      action.points,
      action.description
    );
  }

  // Calculate tier based on points
  static calculateTier(points) {
    const tiers = [
      { name: 'Bronze', minPoints: 0, maxPoints: 999 },
      { name: 'Silver', minPoints: 1000, maxPoints: 2499 },
      { name: 'Gold', minPoints: 2500, maxPoints: 4999 },
      { name: 'Platinum', minPoints: 5000, maxPoints: 9999 },
      { name: 'Diamond', minPoints: 10000, maxPoints: Infinity }
    ];

    return tiers.find(tier => points >= tier.minPoints && points <= tier.maxPoints);
  }

  // Get points needed for next tier
  static getPointsToNextTier(currentPoints) {
    const currentTier = this.calculateTier(currentPoints);
    const tiers = [
      { name: 'Bronze', minPoints: 0, maxPoints: 999 },
      { name: 'Silver', minPoints: 1000, maxPoints: 2499 },
      { name: 'Gold', minPoints: 2500, maxPoints: 4999 },
      { name: 'Platinum', minPoints: 5000, maxPoints: 9999 },
      { name: 'Diamond', minPoints: 10000, maxPoints: Infinity }
    ];

    const currentTierIndex = tiers.findIndex(tier => tier.name === currentTier.name);
    const nextTier = tiers[currentTierIndex + 1];

    if (!nextTier) {
      return 0; // Already at highest tier
    }

    return nextTier.minPoints - currentPoints;
  }

  // Get tier benefits
  static getTierBenefits(tierName) {
    const benefits = {
      'Bronze': [
        '5% discount on treatments',
        'Priority customer support',
        'Welcome bonus points'
      ],
      'Silver': [
        '10% discount on treatments',
        'Free one-time consultation',
        'Express check-in process',
        'Birthday bonus points'
      ],
      'Gold': [
        '15% discount on treatments',
        'VIP lounge access',
        'Dedicated patient coordinator',
        'Free airport transfer (one-way)',
        'Priority appointment booking'
      ],
      'Platinum': [
        '20% discount on treatments',
        'Premium accommodation upgrade',
        'Personal concierge service',
        'Free airport transfers (round-trip)',
        'Exclusive wellness packages',
        'Fast-track medical clearance'
      ],
      'Diamond': [
        '25% discount on treatments',
        'Private jet transfer options',
        'Luxury suite accommodation',
        'Personal medical assistant',
        'Exclusive access to new treatments',
        'VIP family accommodation',
        'Complimentary spa services'
      ]
    };

    return benefits[tierName] || [];
  }

  // Validate reward eligibility
  async validateRewardEligibility(userId, rewardId) {
    try {
      const response = await fetch(`${this.baseURL}/loyalty/validate-reward/${userId}/${rewardId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error validating reward eligibility:', error);
      throw error;
    }
  }

  // Get loyalty statistics
  async getLoyaltyStats(userId) {
    try {
      const response = await fetch(`${this.baseURL}/loyalty/stats/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching loyalty stats:', error);
      throw error;
    }
  }
}

// Loyalty event tracking
export class LoyaltyEventTracker {
  static async trackEvent(eventType, userId, metadata = {}) {
    try {
      // Track the event in analytics
      if (window.gtag) {
        window.gtag('event', eventType, {
          user_id: userId,
          ...metadata
        });
      }

      // Award points if applicable
      const loyaltyService = new LoyaltyService();
      if (LoyaltyService.POINT_ACTIONS[eventType]) {
        await loyaltyService.awardPointsForAction(userId, eventType, metadata);
      }
    } catch (error) {
      console.error('Error tracking loyalty event:', error);
    }
  }
}

// Export singleton instance
export const loyaltyService = new LoyaltyService();