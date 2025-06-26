import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { Card, Button, ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

import { useAuth } from '../../context/AuthContext';
import { useOffline } from '../../context/OfflineContext';
import { PatientService } from '../../services/PatientService';
import { NotificationService } from '../../services/NotificationService';

const { width } = Dimensions.get('window');

interface DashboardData {
  applicationProgress: number;
  currentStep: number;
  totalSteps: number;
  upcomingAppointments: any[];
  recentActivity: any[];
  quickActions: any[];
}

const DashboardScreen: React.FC = () => {
  const { user } = useAuth();
  const { isOffline, syncData } = useOffline();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
    
    // Set up real-time updates
    const interval = setInterval(() => {
      if (!isOffline) {
        syncData();
      }
    }, 30000); // Sync every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const data = await PatientService.getDashboardData();
      setDashboardData(data);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      if (!isOffline) {
        Alert.alert('Error', 'Failed to load dashboard data');
      }
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const quickActions = [
    {
      id: 'schedule',
      title: 'Schedule Appointment',
      icon: 'event',
      color: '#3B82F6',
      onPress: () => console.log('Schedule appointment'),
    },
    {
      id: 'documents',
      title: 'Upload Documents',
      icon: 'cloud-upload',
      color: '#10B981',
      onPress: () => console.log('Upload documents'),
    },
    {
      id: 'payment',
      title: 'Make Payment',
      icon: 'payment',
      color: '#F59E0B',
      onPress: () => console.log('Make payment'),
    },
    {
      id: 'support',
      title: 'Contact Support',
      icon: 'support-agent',
      color: '#EF4444',
      onPress: () => console.log('Contact support'),
    },
  ];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require('../../assets/animations/loading.json')}
          autoPlay
          loop
          style={styles.loadingAnimation}
        />
        <Text style={styles.loadingText}>Loading your dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Offline Indicator */}
      {isOffline && (
        <View style={styles.offlineIndicator}>
          <Icon name="cloud-off" size={16} color="#FFF" />
          <Text style={styles.offlineText}>Offline Mode</Text>
        </View>
      )}

      {/* Welcome Header */}
      <LinearGradient
        colors={['#059669', '#10B981']}
        style={styles.welcomeHeader}
      >
        <View style={styles.welcomeContent}>
          <Text style={styles.welcomeTitle}>Welcome back, {user?.name}!</Text>
          <Text style={styles.welcomeSubtitle}>
            Your medical journey is in progress
          </Text>
        </View>
        <LottieView
          source={require('../../assets/animations/medical-care.json')}
          autoPlay
          loop
          style={styles.headerAnimation}
        />
      </LinearGradient>

      {/* Application Progress */}
      <Card style={styles.progressCard}>
        <Card.Content>
          <Text style={styles.progressTitle}>Application Progress</Text>
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>
              Step {dashboardData?.currentStep || 0} of {dashboardData?.totalSteps || 20}
            </Text>
            <Text style={styles.progressPercentage}>
              {Math.round((dashboardData?.applicationProgress || 0) * 100)}%
            </Text>
          </View>
          <ProgressBar
            progress={dashboardData?.applicationProgress || 0}
            color="#059669"
            style={styles.progressBar}
          />
          <Text style={styles.progressDescription}>
            You're making great progress on your medical tourism journey!
          </Text>
        </Card.Content>
      </Card>

      {/* Quick Actions */}
      <View style={styles.quickActionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.quickActionCard, { borderLeftColor: action.color }]}
              onPress={action.onPress}
            >
              <Icon name={action.icon} size={24} color={action.color} />
              <Text style={styles.quickActionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Upcoming Appointments */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Upcoming Appointments</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {dashboardData?.upcomingAppointments?.map((appointment, index) => (
            <View key={index} style={styles.appointmentItem}>
              <View style={styles.appointmentIcon}>
                <Icon name="event" size={20} color="#059669" />
              </View>
              <View style={styles.appointmentDetails}>
                <Text style={styles.appointmentTitle}>{appointment.title}</Text>
                <Text style={styles.appointmentDate}>
                  {appointment.date} at {appointment.time}
                </Text>
                <Text style={styles.appointmentDoctor}>{appointment.doctor}</Text>
              </View>
              <TouchableOpacity style={styles.joinButton}>
                <Text style={styles.joinButtonText}>Join</Text>
              </TouchableOpacity>
            </View>
          )) || (
            <View style={styles.emptyState}>
              <Icon name="event-available" size={48} color="#D1D5DB" />
              <Text style={styles.emptyStateText}>No upcoming appointments</Text>
            </View>
          )}
        </Card.Content>
      </Card>

      {/* Recent Activity */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Recent Activity</Text>
          {dashboardData?.recentActivity?.map((activity, index) => (
            <View key={index} style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: activity.color }]} />
              <View style={styles.activityDetails}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityDate}>{activity.date}</Text>
              </View>
            </View>
          )) || (
            <View style={styles.emptyState}>
              <Icon name="history" size={48} color="#D1D5DB" />
              <Text style={styles.emptyStateText}>No recent activity</Text>
            </View>
          )}
        </Card.Content>
      </Card>

      {/* Emergency Contact */}
      <Card style={styles.emergencyCard}>
        <Card.Content>
          <View style={styles.emergencyHeader}>
            <Icon name="emergency" size={24} color="#EF4444" />
            <Text style={styles.emergencyTitle}>24/7 Emergency Support</Text>
          </View>
          <Text style={styles.emergencyText}>
            Need immediate medical assistance? Our emergency team is available 24/7.
          </Text>
          <Button
            mode="contained"
            style={styles.emergencyButton}
            buttonColor="#EF4444"
            onPress={() => console.log('Emergency call')}
          >
            Call Emergency Hotline
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
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
    backgroundColor: '#F9FAFB',
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
  offlineIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F59E0B',
    padding: 8,
  },
  offlineText: {
    color: '#FFF',
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  welcomeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    margin: 16,
    borderRadius: 16,
  },
  welcomeContent: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#FFF',
    opacity: 0.9,
  },
  headerAnimation: {
    width: 80,
    height: 80,
  },
  progressCard: {
    margin: 16,
    marginTop: 0,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressDescription: {
    fontSize: 12,
    color: '#6B7280',
  },
  quickActionsContainer: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 48) / 2,
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginTop: 8,
    textAlign: 'center',
  },
  card: {
    margin: 16,
    marginTop: 0,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  seeAllText: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '500',
  },
  appointmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  appointmentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  appointmentDetails: {
    flex: 1,
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  appointmentDate: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  appointmentDoctor: {
    fontSize: 12,
    color: '#059669',
    marginTop: 2,
  },
  joinButton: {
    backgroundColor: '#059669',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  joinButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  activityDate: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
  },
  emergencyCard: {
    margin: 16,
    marginTop: 0,
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    borderWidth: 1,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DC2626',
    marginLeft: 8,
  },
  emergencyText: {
    fontSize: 14,
    color: '#7F1D1D',
    marginBottom: 16,
  },
  emergencyButton: {
    borderRadius: 8,
  },
});

export default DashboardScreen;