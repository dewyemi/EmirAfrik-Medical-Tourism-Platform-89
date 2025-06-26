import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Card, Button, Chip, FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';

import { WhatsAppService, WhatsAppMessage } from '../../services/WhatsAppService';
import { useAuth } from '../../context/AuthContext';

const WhatsAppScreen: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'messages' | 'quick' | 'support'>('quick');

  useEffect(() => {
    loadMessages();
    initializeWhatsApp();
  }, []);

  const initializeWhatsApp = async () => {
    try {
      await WhatsAppService.initializeWhatsAppIntegration();
    } catch (error) {
      console.error('Error initializing WhatsApp:', error);
    }
  };

  const loadMessages = async () => {
    try {
      setLoading(true);
      const messageHistory = await WhatsAppService.getMessageHistory();
      setMessages(messageHistory);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendQuickMessage = async (messageType: string) => {
    let success = false;

    switch (messageType) {
      case 'status':
        success = await WhatsAppService.sendMessage(
          'Hi! Can you please provide me with my current application status? 📋'
        );
        break;

      case 'appointment':
        success = await WhatsAppService.sendMessage(
          'Hello! I would like to schedule an appointment. Please let me know available times. 📅'
        );
        break;

      case 'documents':
        success = await WhatsAppService.sendMessage(
          'Hi! I have questions about document requirements. Can you help me? 📄'
        );
        break;

      case 'payment':
        success = await WhatsAppService.sendMessage(
          'Hello! I need assistance with payment options and processing. Can you help? 💳'
        );
        break;

      case 'emergency':
        success = await WhatsAppService.sendMessage(
          '🚨 URGENT: I need immediate assistance. Please connect me with emergency support.'
        );
        break;

      case 'human':
        success = await WhatsAppService.sendMessage(
          'Hi! I would like to speak with a human agent please. 👤'
        );
        break;
    }

    if (success) {
      Alert.alert('Message Sent', 'Your message has been sent via WhatsApp');
      await loadMessages();
    } else {
      Alert.alert('Error', 'Failed to send message. Please try again.');
    }
  };

  const sendCustomMessage = async () => {
    if (!newMessage.trim()) return;

    const success = await WhatsAppService.sendMessage(newMessage);
    
    if (success) {
      setNewMessage('');
      Alert.alert('Message Sent', 'Your message has been sent via WhatsApp');
      await loadMessages();
    } else {
      Alert.alert('Error', 'Failed to send message. Please try again.');
    }
  };

  const openWhatsAppDirect = async () => {
    try {
      const whatsappUrl = 'whatsapp://send?phone=+971501234567';
      const canOpen = await Linking.canOpenURL(whatsappUrl);
      
      if (canOpen) {
        await Linking.openURL(whatsappUrl);
      } else {
        Alert.alert(
          'WhatsApp Not Available',
          'Please install WhatsApp to use this feature',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Install', onPress: openAppStore }
          ]
        );
      }
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
    }
  };

  const openAppStore = async () => {
    const storeUrl = Platform.OS === 'ios' 
      ? 'https://apps.apple.com/app/whatsapp-messenger/id310633997'
      : 'https://play.google.com/store/apps/details?id=com.whatsapp';
    
    await Linking.openURL(storeUrl);
  };

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return 'check';
      case 'delivered': return 'done-all';
      case 'read': return 'done-all';
      default: return 'schedule';
    }
  };

  const getMessageStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return '#6B7280';
      case 'delivered': return '#6B7280';
      case 'read': return '#059669';
      default: return '#F59E0B';
    }
  };

  const renderQuickActions = () => (
    <ScrollView style={styles.tabContent}>
      <Card style={styles.welcomeCard}>
        <Card.Content>
          <View style={styles.welcomeHeader}>
            <LottieView
              source={require('../../assets/animations/whatsapp-chat.json')}
              autoPlay
              loop
              style={styles.welcomeAnimation}
            />
            <Text style={styles.welcomeTitle}>WhatsApp Support</Text>
            <Text style={styles.welcomeSubtitle}>
              Get instant support via WhatsApp. Our team is available 24/7 to assist you.
            </Text>
          </View>
        </Card.Content>
      </Card>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      
      <View style={styles.quickActionsGrid}>
        {[
          {
            id: 'status',
            title: 'Application Status',
            subtitle: 'Check your progress',
            icon: 'assignment',
            color: '#3B82F6',
          },
          {
            id: 'appointment',
            title: 'Schedule Appointment',
            subtitle: 'Book your consultation',
            icon: 'event',
            color: '#10B981',
          },
          {
            id: 'documents',
            title: 'Document Help',
            subtitle: 'Upload assistance',
            icon: 'description',
            color: '#F59E0B',
          },
          {
            id: 'payment',
            title: 'Payment Support',
            subtitle: 'Billing questions',
            icon: 'payment',
            color: '#8B5CF6',
          },
          {
            id: 'emergency',
            title: 'Emergency Support',
            subtitle: 'Urgent assistance',
            icon: 'emergency',
            color: '#EF4444',
          },
          {
            id: 'human',
            title: 'Human Agent',
            subtitle: 'Speak to our team',
            icon: 'support-agent',
            color: '#059669',
          },
        ].map((action) => (
          <TouchableOpacity
            key={action.id}
            style={[styles.quickActionCard, { borderLeftColor: action.color }]}
            onPress={() => sendQuickMessage(action.id)}
          >
            <Icon name={action.icon} size={28} color={action.color} />
            <Text style={styles.quickActionTitle}>{action.title}</Text>
            <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Custom Message */}
      <Card style={styles.customMessageCard}>
        <Card.Content>
          <Text style={styles.customMessageTitle}>Send Custom Message</Text>
          <TextInput
            style={styles.messageInput}
            placeholder="Type your message here..."
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            numberOfLines={3}
          />
          <Button
            mode="contained"
            style={styles.sendButton}
            onPress={sendCustomMessage}
            disabled={!newMessage.trim()}
          >
            Send via WhatsApp
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );

  const renderMessages = () => (
    <ScrollView style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Message History</Text>
      
      {messages.length === 0 ? (
        <Card style={styles.emptyCard}>
          <Card.Content>
            <View style={styles.emptyState}>
              <Icon name="chat-bubble-outline" size={48} color="#D1D5DB" />
              <Text style={styles.emptyTitle}>No Messages Yet</Text>
              <Text style={styles.emptySubtitle}>
                Start a conversation using the quick actions above
              </Text>
            </View>
          </Card.Content>
        </Card>
      ) : (
        messages.map((message) => (
          <Card key={message.id} style={styles.messageCard}>
            <Card.Content>
              <View style={styles.messageHeader}>
                <View style={styles.messageInfo}>
                  <Text style={styles.messageType}>
                    {message.fromUser ? 'You' : 'EMIRAFRIK Support'}
                  </Text>
                  <Text style={styles.messageTime}>
                    {new Date(message.timestamp).toLocaleString()}
                  </Text>
                </View>
                <View style={styles.messageStatus}>
                  <Icon
                    name={getMessageStatusIcon(message.status)}
                    size={16}
                    color={getMessageStatusColor(message.status)}
                  />
                  <Text style={[
                    styles.statusText,
                    { color: getMessageStatusColor(message.status) }
                  ]}>
                    {message.status}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.messageContent}>{message.content}</Text>
              
              {message.attachments && message.attachments.length > 0 && (
                <View style={styles.attachments}>
                  {message.attachments.map((attachment) => (
                    <Chip key={attachment.id} mode="outlined" style={styles.attachmentChip}>
                      {attachment.name}
                    </Chip>
                  ))}
                </View>
              )}
            </Card.Content>
          </Card>
        ))
      )}
    </ScrollView>
  );

  const renderSupport = () => (
    <ScrollView style={styles.tabContent}>
      <Card style={styles.supportCard}>
        <Card.Content>
          <View style={styles.supportHeader}>
            <Icon name="headset-mic" size={32} color="#059669" />
            <Text style={styles.supportTitle}>24/7 WhatsApp Support</Text>
            <Text style={styles.supportSubtitle}>
              Our dedicated support team is available around the clock via WhatsApp
            </Text>
          </View>

          <View style={styles.supportFeatures}>
            <Text style={styles.featuresTitle}>What we can help with:</Text>
            
            {[
              'Application status updates',
              'Appointment scheduling',
              'Document upload assistance',
              'Payment and billing questions',
              'Medical tourism guidance',
              'Emergency support',
              'Travel arrangements',
              'Insurance queries',
            ].map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Icon name="check-circle" size={16} color="#10B981" />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          <View style={styles.responseTime}>
            <Icon name="schedule" size={20} color="#F59E0B" />
            <Text style={styles.responseText}>
              Average response time: Less than 5 minutes
            </Text>
          </View>

          <Button
            mode="contained"
            style={styles.directChatButton}
            onPress={openWhatsAppDirect}
          >
            Open WhatsApp Chat
          </Button>
        </Card.Content>
      </Card>

      {/* Contact Information */}
      <Card style={styles.contactCard}>
        <Card.Content>
          <Text style={styles.contactTitle}>Alternative Contact Methods</Text>
          
          <View style={styles.contactMethods}>
            <TouchableOpacity style={styles.contactMethod}>
              <Icon name="phone" size={24} color="#3B82F6" />
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Phone Support</Text>
                <Text style={styles.contactValue}>+971 50 123 4567</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.contactMethod}>
              <Icon name="email" size={24} color="#10B981" />
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Email Support</Text>
                <Text style={styles.contactValue}>support@emirafrik.com</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.contactMethod}>
              <Icon name="chat" size={24} color="#8B5CF6" />
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Live Chat</Text>
                <Text style={styles.contactValue}>Available in mobile app</Text>
              </View>
            </TouchableOpacity>
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
        <Text style={styles.loadingText}>Loading WhatsApp support...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Icon name="whatsapp" size={28} color="#25D366" />
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>WhatsApp Support</Text>
            <Text style={styles.headerSubtitle}>Instant help via WhatsApp</Text>
          </View>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {[
          { key: 'quick', label: 'Quick Help', icon: 'flash-on' },
          { key: 'messages', label: 'Messages', icon: 'chat' },
          { key: 'support', label: 'Support Info', icon: 'info' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.activeTab]}
            onPress={() => setActiveTab(tab.key as any)}
          >
            <Icon 
              name={tab.icon} 
              size={20} 
              color={activeTab === tab.key ? '#25D366' : '#6B7280'} 
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
        {activeTab === 'quick' && renderQuickActions()}
        {activeTab === 'messages' && renderMessages()}
        {activeTab === 'support' && renderSupport()}
      </View>

      {/* Floating Action Button */}
      <FAB
        style={styles.fab}
        icon="whatsapp"
        color="#FFF"
        customSize={56}
        onPress={openWhatsAppDirect}
      />
    </KeyboardAvoidingView>
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
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
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
    backgroundColor: '#E8F5E8',
  },
  tabLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    fontWeight: '500',
  },
  activeTabLabel: {
    color: '#25D366',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
    padding: 16,
  },
  welcomeCard: {
    marginBottom: 16,
  },
  welcomeHeader: {
    alignItems: 'center',
  },
  welcomeAnimation: {
    width: 80,
    height: 80,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  quickActionsGrid: {
    marginBottom: 24,
  },
  quickActionCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  customMessageCard: {
    marginBottom: 16,
  },
  customMessageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  messageInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  sendButton: {
    borderRadius: 8,
    backgroundColor: '#25D366',
  },
  emptyCard: {
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
  },
  messageCard: {
    marginBottom: 12,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  messageInfo: {
    flex: 1,
  },
  messageType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  messageTime: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  messageStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  messageContent: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  attachments: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  attachmentChip: {
    marginRight: 8,
    marginBottom: 4,
  },
  supportCard: {
    marginBottom: 16,
  },
  supportHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  supportTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 12,
  },
  supportSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
  },
  supportFeatures: {
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  responseTime: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  responseText: {
    fontSize: 14,
    color: '#92400E',
    marginLeft: 8,
    fontWeight: '500',
  },
  directChatButton: {
    borderRadius: 8,
    backgroundColor: '#25D366',
  },
  contactCard: {
    marginBottom: 16,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  contactMethods: {
    gap: 12,
  },
  contactMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  contactInfo: {
    marginLeft: 12,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  contactValue: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#25D366',
  },
});

export default WhatsAppScreen;