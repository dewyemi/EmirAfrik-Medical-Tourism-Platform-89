import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiService } from './ApiService';

export interface LoyaltyPoints {
  total: number;
  available: number;
  pending: number;
  lifetime: number;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  type: 'discount' | 'service' | 'upgrade' | 'gift';
  category: string;
  validUntil?: string;
  image?: string;
  terms?: string[];
  isAvailable: boolean;
}

export interface LoyaltyTransaction {
  id: string;
  type: 'earned' | 'redeemed' | 'expired';
  points: number;
  description: string;
  date: string;
  relatedService?: string;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface LoyaltyTier {
  id: string;
  name: string;
  minPoints: number;
  maxPoints?: number;
  benefits: string[];
  color: string;
  icon: string;
  multiplier: number;
}

export class LoyaltyService {
  private static readonly CACHE_KEY = 'loyalty_data';
  private static readonly CACHE_DURATION = 300000; // 5 minutes

  static async getLoyaltyPoints(): Promise<LoyaltyPoints> {
    try {
      // Try cache first
      const cached = await this.getCachedData('points');
      if (cached) return cached;

      const response = await ApiService.get('/loyalty/points');
      const points = response.data;

      // Cache the result
      await this.cacheData('points', points);
      return points;
    } catch (error) {
      console.error('Error fetching loyalty points:', error);
      // Return cached data if available
      const cached = await this.getCachedData('points');
      return cached || { total: 0, available: 0, pending: 0, lifetime: 0 };
    }
  }

  static async getAvailableRewards(): Promise<Reward[]> {
    try {
      const cached = await this.getCachedData('rewards');
      if (cached) return cached;

      const response = await ApiService.get('/loyalty/rewards');
      const rewards = response.data;

      await this.cacheData('rewards', rewards);
      return rewards;
    } catch (error) {
      console.error('Error fetching rewards:', error);
      return [];
    }
  }

  static async getLoyaltyHistory(): Promise<LoyaltyTransaction[]> {
    try {
      const response = await ApiService.get('/loyalty/history');
      return response.data;
    } catch (error) {
      console.error('Error fetching loyalty history:', error);
      return [];
    }
  }

  static async getCurrentTier(): Promise<LoyaltyTier | null> {
    try {
      const cached = await this.getCachedData('tier');
      if (cached) return cached;

      const response = await ApiService.get('/loyalty/tier');
      const tier = response.data;

      await this.cacheData('tier', tier);
      return tier;
    } catch (error) {
      console.error('Error fetching loyalty tier:', error);
      return null;
    }
  }

  static async getAllTiers(): Promise<LoyaltyTier[]> {
    try {
      const response = await ApiService.get('/loyalty/tiers');
      return response.data;
    } catch (error) {
      console.error('Error fetching loyalty tiers:', error);
      return [];
    }
  }

  static async redeemReward(rewardId: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await ApiService.post('/loyalty/redeem', { rewardId });
      
      // Clear cache to force refresh
      await this.clearCache();
      
      return {
        success: true,
        message: 'Reward redeemed successfully!'
      };
    } catch (error) {
      console.error('Error redeeming reward:', error);
      return {
        success: false,
        message: 'Failed to redeem reward. Please try again.'
      };
    }
  }

  static async earnPoints(activityType: string, points: number, description: string): Promise<void> {
    try {
      await ApiService.post('/loyalty/earn', {
        activityType,
        points,
        description
      });

      // Clear cache to force refresh
      await this.clearCache();
    } catch (error) {
      console.error('Error earning points:', error);
    }
  }

  static async getReferralCode(): Promise<string> {
    try {
      const response = await ApiService.get('/loyalty/referral-code');
      return response.data.code;
    } catch (error) {
      console.error('Error getting referral code:', error);
      return '';
    }
  }

  static async submitReferral(referralCode: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await ApiService.post('/loyalty/referral', { code: referralCode });
      return {
        success: true,
        message: 'Referral submitted successfully!'
      };
    } catch (error) {
      console.error('Error submitting referral:', error);
      return {
        success: false,
        message: 'Invalid referral code or already used.'
      };
    }
  }

  static async getPointsBreakdown(): Promise<any> {
    try {
      const response = await ApiService.get('/loyalty/points-breakdown');
      return response.data;
    } catch (error) {
      console.error('Error getting points breakdown:', error);
      return {};
    }
  }

  private static async getCachedData(key: string): Promise<any> {
    try {
      const cached = await AsyncStorage.getItem(`${this.CACHE_KEY}_${key}`);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < this.CACHE_DURATION) {
          return data;
        }
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  private static async cacheData(key: string, data: any): Promise<void> {
    try {
      const cacheItem = {
        data,
        timestamp: Date.now()
      };
      await AsyncStorage.setItem(`${this.CACHE_KEY}_${key}`, JSON.stringify(cacheItem));
    } catch (error) {
      console.error('Error caching loyalty data:', error);
    }
  }

  private static async clearCache(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const loyaltyKeys = keys.filter(key => key.startsWith(this.CACHE_KEY));
      await AsyncStorage.multiRemove(loyaltyKeys);
    } catch (error) {
      console.error('Error clearing loyalty cache:', error);
    }
  }
}