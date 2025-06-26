import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { Card, Button, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

import { FamilyService } from '../../services/FamilyService';
import { NotificationService } from '../../services/NotificationService';
import { useAuth } from '../../context/AuthContext';

const { width } = Dimensions.get('window');

interface PatientInfo {
  id: string;
  name: string;
  status: string;
  location: string;
  lastUpdate: string;
  vitals?: {
    heartRate?: number;
    bloodPressure?: string;
    temperature?: number;
  };
}

const FamilyDashboard: React.FC = () => {
  const { user } = useAuth();
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);
  const [recentUpdates, setRecentUpdates] = useState<any[]>([]);
  const [emergencyContacts, setEmergencyContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFamilyDashboard();
    
    // Set up real-time updates
    const interval = setInterval(() => {
      loadPatientUpdates();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const loadFamilyDashboard = async () => {
    try {
      setLoading(true);
      const data = await FamilyService.getFamilyDashboard();
      setPatientInfo(data.patient);
      setRecentUpdates(data.recentUpdates);
      setEmergencyContacts(data.emergencyContacts);
    } catch (error) {
      console.error('Error loading family dashboard:', error);
      Alert.alert('Error', 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const loadPatientUpdates = async () => {
    try {
      const updates = await FamilyService.getPatientUpdates();
      setRecentUpdates(updates);
    } catch (error) {
      console.error('Error loading patient updates:', error);
    }
  };

  const initiateVideoCall = async () => {
    try {
      const callData = await FamilyService.initiateVideoCall();
      // Navigate to video call screen
      Alert.alert('Video Call', 'Connecting to patient and medical team...');
    } catch (error) {
      console.error('Error initiating video call:', error);
      Alert.alert('Error', 'Failed to start video call');
    }
  };

  const sendEmergencyAlert = () => {
    Alert.alert(
      'Emergency Alert',
      'This will immediately notify the medical team and emergency services. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Send Alert', 
          style: 'destructive',
          onPress: async () => {
            try {
              await FamilyService.sendEmergencyAlert();
              Alert.alert('Emergency Alert Sent', 'Medical team has been notified');
            } catch (error) {
              Alert.alert('Error', 'Failed to send emergency alert');
            }
          }
        },
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'stable': return '#10B981';
      case 'recovering': return '#3B82F6';
      case 'critical': return '#EF4444';
      case 'discharged': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require('../../assets/animations/family-care.json')}
          autoPlay
          loop
          style={styles.loadingAnimation}
        />
        <Text style={styles.loadingText}>Loading family dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Header */}
      <LinearGradient
        colors={['#3B82F6', '#1D4ED8']}
        style={styles.welcomeHeader}
      >
        <View style={styles.welcomeContent}>
          <Text style={styles.welcomeTitle}>Family Dashboard</Text>
          <Text style={styles.welcomeSubtitle}>
            Stay connected with {patientInfo?.name || 'your loved one'}
          </Text>
        </View>
        <LottieView
          source={require('../../assets/animations/family-support.json')}
          autoPlay
          loop
          style={styles.headerAnimation}
        />
      </LinearGradient>

      {/* Patient Status Card */}
      {patientInfo && (
        <Card style={styles.patientCard}>
          <Card.Content>
            <View style={styles.patientHeader}>
              <View style={styles.patientInfo}>
                <Text style={styles.patientName}>{patientInfo.name}</Text>
                <View style={styles.statusContainer}>
                  <View style={[styles.statusDot, { backgroundColor: getStatusColor(patientInfo.status) }]} />
                  <Text style={[styles.statusText, { color: getStatusColor(patientInfo.status) }]}>
                    {patientInfo.status}
                  </Text>
                </View>
                <Text style={styles.locationText}>📍 {patientInfo.location}</Text>
                <Text style={styles.lastUpdateText}>
                  Last update: {new Date(patientInfo.lastUpdate).toLocaleString()}
                </Text>
              </View>
            </View>

            {/* Vitals (if available) */}
            {patientInfo.vitals && (
              <View style={styles.vitalsContainer}>
                <Text style={styles.vitalsTitle}>Current Vitals</Text>
                <View style={styles.vitalsGrid}>
                  {patientInfo.vitals.heartRate && (
                    <View style={styles.vitalItem}>
                      <Icon name="favorite" size={20} color="#EF4444" />
                      <Text style={styles.vitalValue}>{patientInfo.vitals.heartRate}</Text>
                      <Text style={styles.vitalLabel}>BPM</Text>
                    </View>
                  )}
                  {patientInfo.vitals.bloodPressure && (
                    <View style={styles.vitalItem}>
                      <Icon name="compress" size={20} color="#3B82F6" />
                      <Text style={styles.vitalValue}>{patientInfo.vitals.bloodPressure}</Text>
                      <Text style={styles.vitalLabel}>BP</Text>
                    </View>
                  )}
                  {patientInfo.vitals.temperature && (
                    <View style={styles.vitalItem}>
                      <Icon name="thermostat" size={20} color="#F59E0B" />
                      <Text style={styles.vitalValue}>{patientInfo.vitals.temperature}°</Text>
                      <Text style={styles.vitalLabel}>Temp</Text>
                    </View>
                  )}
                </View>
              </View>
            )}

            {/* Quick Actions */}
            <View style={styles.quickActions}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: '#10B981' }]}
                onPress={initiateVideoCall}
              >
                <Icon name="video-call" size={20} color="#FFF" />
                <Text style={styles.actionButtonText}>Video Call</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: '#3B82F6' }]}
                onPress={() => Alert.alert('Feature', 'Send message functionality')}
              >
                <Icon name="message" size={20} color="#FFF" />
                <Text style={styles.actionButtonText}>Message</Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Recent Updates */}
      <Card style={styles.updatesCard}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Recent Updates</Text>
            <TouchableOpacity onPress={loadPatientUpdates}>
              <Icon name="refresh" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
          
          {recentUpdates.length > 0 ? (
            recentUpdates.map((update, index) => (
              <View key={index} style={styles.updateItem}>
                <View style={styles.updateIcon}>
                  <Icon name={update.icon || 'info'} size={16} color={update.color || '#6B7280'} />
                </View>
                <View style={styles.updateContent}>
                  <Text style={styles.updateTitle}>{update.title}</Text>
                  <Text style={styles.updateDescription}>{update.description}</Text>
                  <Text style={styles.updateTime}>{update.time}</Text>
                </View>
                {update.urgent && (
                  <Chip mode="outlined" textStyle={styles.urgentChipText} style={styles.urgentChip}>
                    Urgent
                  </Chip>
                )}
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Icon name="notifications-none" size={48} color="#D1D5DB" />
              <Text style={styles.emptyStateText}>No recent updates</Text>
            </View>
          )}
        </Card.Content>
      </Card>

      {/* Emergency Contacts */}
      <Card style={styles.emergencyCard}>
        <Card.Content>
          <Text style={styles.cardTitle}>Emergency Contacts</Text>
          
          {emergencyContacts.map((contact, index) => (
            <View key={index} style={styles.contactItem}>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactRole}>{contact.role}</Text>
                <Text style={styles.contactAvailability}>{contact.availability}</Text>
              </View>
              <TouchableOpacity
                style={styles.callButton}
                onPress={() => Alert.alert('Call', `Calling ${contact.name}...`)}
              >
                <Icon name="phone" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Emergency Alert Button */}
      <Card style={styles.emergencyAlertCard}>
        <Card.Content>
          <View style={styles.emergencyAlertContent}>
            <View style={styles.emergencyAlertInfo}>
              <Icon name="warning" size={24} color="#EF4444" />
              <Text style={styles.emergencyAlertTitle}>Emergency Alert</Text>
            </View>
            <Text style={styles.emergencyAlertText}>
              Immediately notify medical team and emergency services
            </Text>
            <Button
              mode="contained"
              buttonColor="#EF4444"
              style={styles.emergencyButton}
              onPress={sendEmergencyAlert}
            >
              Send Emergency Alert
            </Button>
          </View>
        </Card.Content>
      </Card>

      {/* Family Support Resources */}
      <Card style={styles.resourcesCard}>
        <Card.Content>
          <Text style={styles.cardTitle}>Family Support</Text>
          <View style={styles.resourcesGrid}>
            <TouchableOpacity style={styles.resourceItem}>
              <Icon name="psychology" size={24} color="#8B5CF6" />
              <Text style={styles.resourceText}>Counseling</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resourceItem}>
              <Icon name="groups" size={24} color="#10B981" />
              <Text style={styles.resourceText}>Support Groups</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resourceItem}>
              <Icon name="local_hotel" size={24} color="#3B82F6" />
              <Text style={styles.resourceText}>Accommodation</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resourceItem}>
              <Icon name="flight" size={24} color="#F59E0B" />
              <Text style={styles.resourceText}>Travel Help</Text>
            </TouchableOpacity>
          </View>
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
  patientCard: {
    margin: 16,
    marginTop: 0,
  },
  patientHeader: {
    marginBottom: 16,
  },
  patientInfo: {
    marginBottom: 12,
  },
  patientName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  lastUpdateText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  vitalsContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  vitalsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  vitalsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  vitalItem: {
    alignItems: 'center',
  },
  vitalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 4,
  },
  vitalLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 0.45,
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#FFF',
    fontWeight: '500',
    marginLeft: 8,
  },
  updatesCard: {
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
  updateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  updateIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  updateContent: {
    flex: 1,
  },
  updateTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  updateDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  updateTime: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  urgentChip: {
    backgroundColor: '#FEE2E2',
    borderColor: '#FECACA',
  },
  urgentChipText: {
    color: '#DC2626',
    fontSize: 10,
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
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  contactRole: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  contactAvailability: {
    fontSize: 12,
    color: '#10B981',
    marginTop: 2,
  },
  callButton: {
    backgroundColor: '#10B981',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emergencyAlertCard: {
    margin: 16,
    marginTop: 0,
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    borderWidth: 1,
  },
  emergencyAlertContent: {
    alignItems: 'center',
  },
  emergencyAlertInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  emergencyAlertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DC2626',
    marginLeft: 8,
  },
  emergencyAlertText: {
    fontSize: 14,
    color: '#7F1D1D',
    textAlign: 'center',
    marginBottom: 16,
  },
  emergencyButton: {
    borderRadius: 8,
    paddingHorizontal: 24,
  },
  resourcesCard: {
    margin: 16,
    marginTop: 0,
    marginBottom: 32,
  },
  resourcesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  resourceItem: {
    width: (width - 64) / 2,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginBottom: 12,
  },
  resourceText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default FamilyDashboard;