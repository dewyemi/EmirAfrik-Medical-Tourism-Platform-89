import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
  Share,
} from 'react-native';
import { Card, Button, ProgressBar, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

import { LoyaltyService, LoyaltyPoints, Reward, LoyaltyTier, LoyaltyTransaction } from '../../services/LoyaltyService';
import { useAuth } from '../../context/AuthContext';

const LoyaltyScreen: React.FC = () => {
  const { user } = useAuth();
  const [loyaltyPoints, setLoyaltyPoints] = useState<LoyaltyPoints | null>(null);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [currentTier, setCurrentTier] = useState<LoyaltyTier | null>(null);
  const [allTiers, setAllTiers] = useState<LoyaltyTier[]>([]);
  const [history, setHistory] = useState<LoyaltyTransaction[]>([]);
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'rewards' | 'history' | 'referral'>('overview');

  useEffect(() => {
    loadLoyaltyData();
  }, []);

  const loadLoyaltyData = async () => {
    try {
      setLoading(true);
      
      const [pointsData, rewardsData, tierData, allTiersData, historyData, refCode] = await Promise.all([
        LoyaltyService.getLoyaltyPoints(),
        LoyaltyService.getAvailableRewards(),
        LoyaltyService.getCurrentTier(),
        LoyaltyService.getAllTiers(),
        LoyaltyService.getLoyaltyHistory(),
        LoyaltyService.getReferralCode()
      ]);

      setLoyaltyPoints(pointsData);
      setRewards(rewardsData);
      setCurrentTier(tierData);
      setAllTiers(allTiersData);
      setHistory(historyData);
      setReferralCode(refCode);
    } catch (error) {
      console.error('Error loading loyalty data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadLoyaltyData();
    setRefreshing(false);
  };

  const handleRedeemReward = async (reward: Reward) => {
    if (!loyaltyPoints || loyaltyPoints.available < reward.pointsCost) {
      Alert.alert('Insufficient Points', 'You don\'t have enough points to redeem this reward.');
      return;
    }

    Alert.alert(
      'Redeem Reward',
      `Redeem "${reward.title}" for ${reward.pointsCost} points?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Redeem',
          onPress: async () => {
            const result = await LoyaltyService.redeemReward(reward.id);
            Alert.alert(
              result.success ? 'Success' : 'Error',
              result.message
            );
            if (result.success) {
              await loadLoyaltyData();
            }
          }
        }
      ]
    );
  };

  const shareReferralCode = async () => {
    try {
      const message = `Join EMIRAFRIK and get 500 bonus points! 🎉\n\nUse my referral code: ${referralCode}\n\nExperience world-class medical tourism in the UAE with premium rewards!\n\nDownload the app: https://emirafrik.com/app`;
      
      await Share.share({
        message,
        title: 'Join EMIRAFRIK - Get Bonus Points!',
      });
    } catch (error) {
      console.error('Error sharing referral code:', error);
    }
  };

  const getNextTier = (): LoyaltyTier | null => {
    if (!currentTier || !loyaltyPoints) return null;
    
    const currentIndex = allTiers.findIndex(tier => tier.id === currentTier.id);
    return currentIndex < allTiers.length - 1 ? allTiers[currentIndex + 1] : null;
  };

  const getProgressToNextTier = (): number => {
    const nextTier = getNextTier();
    if (!nextTier || !loyaltyPoints) return 100;
    
    const currentPoints = loyaltyPoints.total;
    const nextTierPoints = nextTier.minPoints;
    const currentTierPoints = currentTier?.minPoints || 0;
    
    return ((currentPoints - currentTierPoints) / (nextTierPoints - currentTierPoints)) * 100;
  };

  const renderOverview = () => (
    <ScrollView>
      {/* Points Card */}
      <LinearGradient
        colors={['#059669', '#10B981']}
        style={styles.pointsCard}
      >
        <View style={styles.pointsHeader}>
          <Text style={styles.pointsTitle}>Your Points</Text>
          <LottieView
            source={require('../../assets/animations/loyalty-stars.json')}
            autoPlay
            loop
            style={styles.pointsAnimation}
          />
        </View>
        
        <Text style={styles.pointsValue}>{loyaltyPoints?.available.toLocaleString() || 0}</Text>
        <Text style={styles.pointsSubtitle}>Available Points</Text>
        
        <View style={styles.pointsBreakdown}>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownValue}>{loyaltyPoints?.total.toLocaleString() || 0}</Text>
            <Text style={styles.breakdownLabel}>Total Earned</Text>
          </View>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownValue}>{loyaltyPoints?.pending.toLocaleString() || 0}</Text>
            <Text style={styles.breakdownLabel}>Pending</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Current Tier */}
      {currentTier && (
        <Card style={styles.tierCard}>
          <Card.Content>
            <View style={styles.tierHeader}>
              <View style={[styles.tierIcon, { backgroundColor: currentTier.color }]}>
                <Icon name={currentTier.icon} size={24} color="#FFF" />
              </View>
              <View style={styles.tierInfo}>
                <Text style={styles.tierName}>{currentTier.name}</Text>
                <Text style={styles.tierMultiplier}>
                  {currentTier.multiplier}x points multiplier
                </Text>
              </View>
            </View>

            {/* Progress to Next Tier */}
            {getNextTier() && (
              <View style={styles.tierProgress}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>Progress to {getNextTier()?.name}</Text>
                  <Text style={styles.progressText}>
                    {Math.round(getProgressToNextTier())}%
                  </Text>
                </View>
                <ProgressBar
                  progress={getProgressToNextTier() / 100}
                  color={currentTier.color}
                  style={styles.progressBar}
                />
              </View>
            )}

            {/* Tier Benefits */}
            <View style={styles.tierBenefits}>
              <Text style={styles.benefitsTitle}>Your Benefits:</Text>
              {currentTier.benefits.map((benefit, index) => (
                <View key={index} style={styles.benefitItem}>
                  <Icon name="check-circle" size={16} color="#10B981" />
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Quick Actions */}
      <Card style={styles.actionsCard}>
        <Card.Content>
          <Text style={styles.actionsTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => setActiveTab('rewards')}
            >
              <Icon name="redeem" size={24} color="#059669" />
              <Text style={styles.actionText}>Redeem Rewards</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => setActiveTab('referral')}
            >
              <Icon name="share" size={24} color="#3B82F6" />
              <Text style={styles.actionText}>Refer Friends</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => setActiveTab('history')}
            >
              <Icon name="history" size={24} color="#8B5CF6" />
              <Text style={styles.actionText}>View History</Text>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );

  const renderRewards = () => (
    <ScrollView>
      <Text style={styles.sectionTitle}>Available Rewards</Text>
      {rewards.map((reward) => (
        <Card key={reward.id} style={styles.rewardCard}>
          <Card.Content>
            <View style={styles.rewardHeader}>
              <View style={styles.rewardInfo}>
                <Text style={styles.rewardTitle}>{reward.title}</Text>
                <Text style={styles.rewardDescription}>{reward.description}</Text>
                <View style={styles.rewardMeta}>
                  <Chip mode="outlined" style={styles.categoryChip}>
                    {reward.category}
                  </Chip>
                  {reward.validUntil && (
                    <Text style={styles.validUntil}>
                      Valid until: {new Date(reward.validUntil).toLocaleDateString()}
                    </Text>
                  )}
                </View>
              </View>
              <View style={styles.rewardPoints}>
                <Text style={styles.pointsCost}>{reward.pointsCost}</Text>
                <Text style={styles.pointsLabel}>points</Text>
              </View>
            </View>
            
            <Button
              mode="contained"
              style={[
                styles.redeemButton,
                { backgroundColor: reward.isAvailable ? '#059669' : '#9CA3AF' }
              ]}
              disabled={!reward.isAvailable || !loyaltyPoints || loyaltyPoints.available < reward.pointsCost}
              onPress={() => handleRedeemReward(reward)}
            >
              {!reward.isAvailable ? 'Not Available' : 
               !loyaltyPoints || loyaltyPoints.available < reward.pointsCost ? 'Insufficient Points' : 'Redeem'}
            </Button>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );

  const renderHistory = () => (
    <ScrollView>
      <Text style={styles.sectionTitle}>Points History</Text>
      {history.map((transaction) => (
        <Card key={transaction.id} style={styles.historyCard}>
          <Card.Content>
            <View style={styles.historyItem}>
              <View style={styles.historyIcon}>
                <Icon 
                  name={transaction.type === 'earned' ? 'add-circle' : 
                        transaction.type === 'redeemed' ? 'remove-circle' : 'schedule'}
                  size={20}
                  color={transaction.type === 'earned' ? '#10B981' : 
                        transaction.type === 'redeemed' ? '#EF4444' : '#F59E0B'}
                />
              </View>
              <View style={styles.historyDetails}>
                <Text style={styles.historyDescription}>{transaction.description}</Text>
                <Text style={styles.historyDate}>
                  {new Date(transaction.date).toLocaleDateString()}
                </Text>
                {transaction.relatedService && (
                  <Text style={styles.historyService}>{transaction.relatedService}</Text>
                )}
              </View>
              <View style={styles.historyPoints}>
                <Text style={[
                  styles.pointsChange,
                  { color: transaction.type === 'earned' ? '#10B981' : '#EF4444' }
                ]}>
                  {transaction.type === 'earned' ? '+' : '-'}{transaction.points}
                </Text>
                <Chip mode="outlined" style={styles.statusChip}>
                  {transaction.status}
                </Chip>
              </View>
            </View>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );

  const renderReferral = () => (
    <ScrollView>
      <Card style={styles.referralCard}>
        <Card.Content>
          <View style={styles.referralHeader}>
            <LottieView
              source={require('../../assets/animations/referral-gift.json')}
              autoPlay
              loop
              style={styles.referralAnimation}
            />
            <Text style={styles.referralTitle}>Refer Friends & Earn</Text>
            <Text style={styles.referralSubtitle}>
              Get 500 points for each friend who joins EMIRAFRIK!
            </Text>
          </View>

          <View style={styles.referralCodeContainer}>
            <Text style={styles.referralCodeLabel}>Your Referral Code:</Text>
            <View style={styles.referralCodeBox}>
              <Text style={styles.referralCodeText}>{referralCode}</Text>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={() => {
                  // Copy to clipboard functionality
                  Alert.alert('Copied!', 'Referral code copied to clipboard');
                }}
              >
                <Icon name="content-copy" size={20} color="#059669" />
              </TouchableOpacity>
            </View>
          </View>

          <Button
            mode="contained"
            style={styles.shareButton}
            onPress={shareReferralCode}
          >
            Share Referral Code
          </Button>

          <View style={styles.referralBenefits}>
            <Text style={styles.benefitsTitle}>Referral Benefits:</Text>
            <View style={styles.benefitItem}>
              <Icon name="star" size={16} color="#F59E0B" />
              <Text style={styles.benefitText}>500 points for each successful referral</Text>
            </View>
            <View style={styles.benefitItem}>
              <Icon name="star" size={16} color="#F59E0B" />
              <Text style={styles.benefitText}>Your friend gets 500 bonus points too!</Text>
            </View>
            <View style={styles.benefitItem}>
              <Icon name="star" size={16} color="#F59E0B" />
              <Text style={styles.benefitText}>No limit on referrals</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require('../../assets/animations/loading.json')}
          autoPlay
          loop
          style={styles.loadingAnimation}
        />
        <Text style={styles.loadingText}>Loading your rewards...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Loyalty & Rewards</Text>
        <Text style={styles.headerSubtitle}>Earn points, unlock benefits</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {[
          { key: 'overview', label: 'Overview', icon: 'dashboard' },
          { key: 'rewards', label: 'Rewards', icon: 'redeem' },
          { key: 'history', label: 'History', icon: 'history' },
          { key: 'referral', label: 'Referral', icon: 'share' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.activeTab]}
            onPress={() => setActiveTab(tab.key as any)}
          >
            <Icon 
              name={tab.icon} 
              size={20} 
              color={activeTab === tab.key ? '#059669' : '#6B7280'} 
            />
            <Text style={[
              styles.tabLabel,
              activeTab === tab.key && styles.activeTabLabel
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          showsVerticalScrollIndicator={false}
        >
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'rewards' && renderRewards()}
          {activeTab === 'history' && renderHistory()}
          {activeTab === 'referral' && renderReferral()}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingAnimation: {
    width: 150,
    height: 150,
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 16,
  },
  header: {
    backgroundColor: '#FFF',
    padding: 20,
    paddingTop: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#EDF7F0',
  },
  tabLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    fontWeight: '500',
  },
  activeTabLabel: {
    color: '#059669',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  pointsCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
  },
  pointsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  pointsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  pointsAnimation: {
    width: 60,
    height: 60,
  },
  pointsValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  pointsSubtitle: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 20,
  },
  pointsBreakdown: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  breakdownItem: {
    alignItems: 'center',
  },
  breakdownValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  breakdownLabel: {
    fontSize: 12,
    color: '#FFF',
    opacity: 0.8,
    marginTop: 4,
  },
  tierCard: {
    marginBottom: 16,
  },
  tierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tierIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  tierInfo: {
    flex: 1,
  },
  tierName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  tierMultiplier: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  tierProgress: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#059669',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  tierBenefits: {
    marginTop: 16,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  actionsCard: {
    marginBottom: 16,
  },
  actionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    flex: 0.3,
  },
  actionText: {
    fontSize: 12,
    color: '#1F2937',
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  rewardCard: {
    marginBottom: 12,
  },
  rewardHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  rewardInfo: {
    flex: 1,
    marginRight: 16,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  rewardDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  rewardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  categoryChip: {
    marginRight: 8,
    marginBottom: 4,
  },
  validUntil: {
    fontSize: 12,
    color: '#F59E0B',
  },
  rewardPoints: {
    alignItems: 'center',
  },
  pointsCost: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#059669',
  },
  pointsLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  redeemButton: {
    borderRadius: 8,
  },
  historyCard: {
    marginBottom: 8,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  historyDetails: {
    flex: 1,
  },
  historyDescription: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  historyDate: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  historyService: {
    fontSize: 12,
    color: '#059669',
    marginTop: 2,
  },
  historyPoints: {
    alignItems: 'flex-end',
  },
  pointsChange: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusChip: {
    height: 24,
  },
  referralCard: {
    marginBottom: 16,
  },
  referralHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  referralAnimation: {
    width: 100,
    height: 100,
  },
  referralTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  referralSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  referralCodeContainer: {
    marginBottom: 24,
  },
  referralCodeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  referralCodeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 16,
  },
  referralCodeText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669',
    letterSpacing: 2,
  },
  copyButton: {
    padding: 8,
  },
  shareButton: {
    borderRadius: 8,
    marginBottom: 24,
  },
  referralBenefits: {
    marginTop: 16,
  },
});

export default LoyaltyScreen;