import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiGift, FiStar, FiTrendingUp, FiCrown, FiCheck, FiClock, FiMapPin, FiUsers } = FiIcons;

const LoyaltyDashboard = () => {
  const [userPoints, setUserPoints] = useState(2450);
  const [userTier, setUserTier] = useState('Gold');
  const [selectedReward, setSelectedReward] = useState(null);

  const loyaltyTiers = [
    { name: 'Bronze', minPoints: 0, maxPoints: 999, color: 'bg-amber-600', benefits: ['5% discount on treatments', 'Priority support'] },
    { name: 'Silver', minPoints: 1000, maxPoints: 2499, color: 'bg-gray-400', benefits: ['10% discount', 'Free consultation', 'Express check-in'] },
    { name: 'Gold', minPoints: 2500, maxPoints: 4999, color: 'bg-yellow-500', benefits: ['15% discount', 'VIP lounge access', 'Dedicated coordinator'] },
    { name: 'Platinum', minPoints: 5000, maxPoints: 9999, color: 'bg-purple-600', benefits: ['20% discount', 'Premium accommodation', 'Personal concierge'] },
    { name: 'Diamond', minPoints: 10000, maxPoints: Infinity, color: 'bg-blue-600', benefits: ['25% discount', 'Private jet transfers', 'Luxury suite'] }
  ];

  const availableRewards = [
    {
      id: 1,
      title: '10% Off Next Treatment',
      description: 'Discount on your next medical procedure',
      points: 500,
      category: 'Medical',
      validUntil: '2024-06-30',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Free Airport Transfer',
      description: 'Complimentary luxury airport pickup and drop-off',
      points: 800,
      category: 'Travel',
      validUntil: '2024-12-31',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Spa Day Package',
      description: 'Full day spa treatment at 5-star resort',
      points: 1200,
      category: 'Wellness',
      validUntil: '2024-09-30',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=300&h=200&fit=crop'
    },
    {
      id: 4,
      title: 'Dubai Desert Safari',
      description: 'Premium desert safari experience with dinner',
      points: 1500,
      category: 'Tourism',
      validUntil: '2024-08-31',
      image: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=300&h=200&fit=crop'
    },
    {
      id: 5,
      title: 'VIP Hospital Suite Upgrade',
      description: 'Upgrade to premium hospital suite',
      points: 2000,
      category: 'Medical',
      validUntil: '2024-12-31',
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8eaae?w=300&h=200&fit=crop'
    },
    {
      id: 6,
      title: 'Family Accommodation Package',
      description: '3-night stay for family members',
      points: 2500,
      category: 'Accommodation',
      validUntil: '2024-10-31',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop'
    }
  ];

  const recentActivity = [
    { date: '2024-01-20', action: 'Treatment Completion', points: 500, type: 'earned' },
    { date: '2024-01-18', action: 'Referral Bonus', points: 200, type: 'earned' },
    { date: '2024-01-15', action: 'Spa Package Redeemed', points: -1200, type: 'redeemed' },
    { date: '2024-01-10', action: 'Document Upload', points: 50, type: 'earned' },
    { date: '2024-01-08', action: 'Review Bonus', points: 100, type: 'earned' }
  ];

  const getCurrentTier = (points) => {
    return loyaltyTiers.find(tier => points >= tier.minPoints && points <= tier.maxPoints);
  };

  const getNextTier = (points) => {
    return loyaltyTiers.find(tier => points < tier.minPoints);
  };

  const getProgressToNextTier = (points) => {
    const nextTier = getNextTier(points);
    if (!nextTier) return 100;
    
    const currentTier = getCurrentTier(points);
    const progress = ((points - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100;
    return Math.min(progress, 100);
  };

  const redeemReward = (reward) => {
    if (userPoints >= reward.points) {
      setUserPoints(userPoints - reward.points);
      alert(`Successfully redeemed: ${reward.title}`);
    } else {
      alert('Insufficient points for this reward');
    }
  };

  const currentTier = getCurrentTier(userPoints);
  const nextTier = getNextTier(userPoints);
  const progressPercent = getProgressToNextTier(userPoints);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Loyalty & Rewards</h1>
        <p className="text-gray-600">Earn points and unlock exclusive benefits with every interaction</p>
      </div>

      {/* Points Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm">Available Points</p>
              <p className="text-3xl font-bold">{userPoints.toLocaleString()}</p>
            </div>
            <SafeIcon icon={FiStar} className="w-12 h-12 text-emerald-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`${currentTier.color} text-white rounded-lg p-6`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-opacity-80 text-sm">Current Tier</p>
              <p className="text-2xl font-bold">{currentTier.name}</p>
            </div>
            <SafeIcon icon={FiCrown} className="w-12 h-12 text-white text-opacity-80" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-gray-200 rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-600 text-sm">Next Tier</p>
              <p className="text-xl font-bold text-gray-900">
                {nextTier ? nextTier.name : 'Max Level'}
              </p>
            </div>
            <SafeIcon icon={FiTrendingUp} className="w-8 h-8 text-emerald-500" />
          </div>
          {nextTier && (
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{userPoints} points</span>
                <span>{nextTier.minPoints} points</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {nextTier.minPoints - userPoints} points to {nextTier.name}
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Tier Benefits */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your {currentTier.name} Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentTier.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-2">
              <SafeIcon icon={FiCheck} className="w-5 h-5 text-emerald-500" />
              <span className="text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Available Rewards */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Available Rewards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableRewards.map((reward, index) => (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <img
                src={reward.image}
                alt={reward.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{reward.title}</h4>
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                    {reward.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{reward.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-500" />
                    <span className="font-bold text-emerald-600">{reward.points} points</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <SafeIcon icon={FiClock} className="w-3 h-3" />
                    <span>Valid until {reward.validUntil}</span>
                  </div>
                </div>

                <button
                  onClick={() => redeemReward(reward)}
                  disabled={userPoints < reward.points}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    userPoints >= reward.points
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {userPoints >= reward.points ? 'Redeem Now' : 'Insufficient Points'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Points History */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  activity.type === 'earned' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <SafeIcon 
                    icon={activity.type === 'earned' ? FiTrendingUp : FiGift} 
                    className={`w-4 h-4 ${
                      activity.type === 'earned' ? 'text-green-600' : 'text-red-600'
                    }`} 
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
              </div>
              <span className={`font-semibold ${
                activity.type === 'earned' ? 'text-green-600' : 'text-red-600'
              }`}>
                {activity.type === 'earned' ? '+' : ''}{activity.points} points
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Referral Program */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">Refer Friends & Earn</h3>
            <p className="text-blue-100 mb-4">
              Get 500 points for each successful referral. Your friend gets 200 bonus points too!
            </p>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Share Referral Link
            </button>
          </div>
          <SafeIcon icon={FiUsers} className="w-16 h-16 text-blue-200" />
        </div>
      </div>
    </div>
  );
};

export default LoyaltyDashboard;