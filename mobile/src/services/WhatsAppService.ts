import { Linking, Alert } from 'react-native';
import { ApiService } from './ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface WhatsAppMessage {
  id: string;
  type: 'text' | 'document' | 'image' | 'template';
  content: string;
  timestamp: string;
  fromUser: boolean;
  status: 'sent' | 'delivered' | 'read';
  attachments?: WhatsAppAttachment[];
}

export interface WhatsAppAttachment {
  id: string;
  type: 'document' | 'image' | 'audio';
  url: string;
  name: string;
  size: number;
}

export interface WhatsAppContact {
  phoneNumber: string;
  name: string;
  isBusinessVerified: boolean;
  profilePhoto?: string;
}

export class WhatsAppService {
  private static readonly BUSINESS_PHONE = '+971501234567'; // EMIRAFRIK Business Number
  private static readonly API_BASE = 'https://api.whatsapp.com/send';
  private static readonly WEBHOOK_URL = '/api/whatsapp/webhook';

  static async initializeWhatsAppIntegration(): Promise<void> {
    try {
      // Register for WhatsApp Business API webhooks
      await ApiService.post('/whatsapp/register-webhook', {
        webhookUrl: this.WEBHOOK_URL,
        verifyToken: await this.getVerifyToken()
      });

      console.log('WhatsApp integration initialized');
    } catch (error) {
      console.error('Error initializing WhatsApp integration:', error);
    }
  }

  static async sendMessage(message: string, phoneNumber?: string): Promise<boolean> {
    try {
      const targetNumber = phoneNumber || this.BUSINESS_PHONE;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `${this.API_BASE}?phone=${targetNumber}&text=${encodedMessage}`;

      const canOpen = await Linking.canOpenURL(whatsappUrl);
      
      if (canOpen) {
        await Linking.openURL(whatsappUrl);
        return true;
      } else {
        Alert.alert(
          'WhatsApp Not Available',
          'Please install WhatsApp to use this feature',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Install', onPress: () => this.openAppStore() }
          ]
        );
        return false;
      }
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      return false;
    }
  }

  static async sendDocumentShare(documentUrl: string, documentName: string): Promise<boolean> {
    try {
      const message = `📄 *EMIRAFRIK Document*\n\n` +
                    `Document: ${documentName}\n` +
                    `Download: ${documentUrl}\n\n` +
                    `*Secure medical document from EMIRAFRIK*`;

      return await this.sendMessage(message);
    } catch (error) {
      console.error('Error sharing document via WhatsApp:', error);
      return false;
    }
  }

  static async sendAppointmentReminder(appointment: any): Promise<boolean> {
    try {
      const message = `🏥 *EMIRAFRIK Appointment Reminder*\n\n` +
                    `📅 Date: ${appointment.date}\n` +
                    `⏰ Time: ${appointment.time}\n` +
                    `👨‍⚕️ Doctor: ${appointment.doctor}\n` +
                    `🏢 Location: ${appointment.location}\n\n` +
                    `Please arrive 15 minutes early.\n` +
                    `*Safe travels and best wishes for your treatment!*`;

      return await this.sendMessage(message);
    } catch (error) {
      console.error('Error sending appointment reminder:', error);
      return false;
    }
  }

  static async sendEmergencyAlert(patientInfo: any, emergencyType: string): Promise<boolean> {
    try {
      const message = `🚨 *EMIRAFRIK EMERGENCY ALERT*\n\n` +
                    `Patient: ${patientInfo.name}\n` +
                    `ID: ${patientInfo.id}\n` +
                    `Emergency: ${emergencyType}\n` +
                    `Location: ${patientInfo.currentLocation}\n` +
                    `Time: ${new Date().toLocaleString()}\n\n` +
                    `*IMMEDIATE ASSISTANCE REQUIRED*\n` +
                    `Emergency Hotline: +971 50 XXX XXXX`;

      return await this.sendMessage(message);
    } catch (error) {
      console.error('Error sending emergency alert:', error);
      return false;
    }
  }

  static async getMessageHistory(): Promise<WhatsAppMessage[]> {
    try {
      const response = await ApiService.get('/whatsapp/messages');
      return response.data;
    } catch (error) {
      console.error('Error fetching WhatsApp message history:', error);
      return [];
    }
  }

  static async sendStatusUpdate(statusType: string, details: any): Promise<boolean> {
    try {
      let message = '';

      switch (statusType) {
        case 'application_approved':
          message = `✅ *Application Approved!*\n\n` +
                   `Congratulations! Your medical tourism application has been approved.\n` +
                   `Next steps will be shared with you shortly.\n\n` +
                   `*EMIRAFRIK Team*`;
          break;

        case 'payment_received':
          message = `💳 *Payment Received*\n\n` +
                   `Amount: ${details.amount}\n` +
                   `Transaction ID: ${details.transactionId}\n` +
                   `Date: ${details.date}\n\n` +
                   `Thank you for your payment!\n` +
                   `*EMIRAFRIK Finance Team*`;
          break;

        case 'travel_confirmed':
          message = `✈️ *Travel Arrangements Confirmed*\n\n` +
                   `Flight: ${details.flight}\n` +
                   `Departure: ${details.departure}\n` +
                   `Arrival: ${details.arrival}\n` +
                   `Hotel: ${details.hotel}\n\n` +
                   `*Bon voyage! We look forward to welcoming you.*`;
          break;

        case 'document_missing':
          message = `📄 *Document Required*\n\n` +
                   `We need the following document(s):\n` +
                   `• ${details.documents.join('\n• ')}\n\n` +
                   `Please upload via the mobile app.\n` +
                   `*EMIRAFRIK Document Team*`;
          break;

        default:
          message = `📢 *Status Update*\n\n${details.message}\n\n*EMIRAFRIK Team*`;
      }

      return await this.sendMessage(message);
    } catch (error) {
      console.error('Error sending status update:', error);
      return false;
    }
  }

  static async sendWelcomeMessage(patientName: string): Promise<boolean> {
    try {
      const message = `🌟 *Welcome to EMIRAFRIK!*\n\n` +
                    `Hello ${patientName}! 👋\n\n` +
                    `Thank you for choosing EMIRAFRIK for your medical tourism journey. ` +
                    `We're here to support you every step of the way.\n\n` +
                    `📱 Download our mobile app for:\n` +
                    `• Real-time updates\n` +
                    `• Document upload\n` +
                    `• Appointment scheduling\n` +
                    `• 24/7 support\n\n` +
                    `*Your dedicated care team is ready to assist you!*`;

      return await this.sendMessage(message);
    } catch (error) {
      console.error('Error sending welcome message:', error);
      return false;
    }
  }

  static async requestFeedback(serviceType: string): Promise<boolean> {
    try {
      const message = `⭐ *Your Feedback Matters*\n\n` +
                    `How was your ${serviceType} experience with EMIRAFRIK?\n\n` +
                    `Please rate us:\n` +
                    `⭐ ⭐ ⭐ ⭐ ⭐ Excellent\n` +
                    `⭐ ⭐ ⭐ ⭐ ☆ Good\n` +
                    `⭐ ⭐ ⭐ ☆ ☆ Average\n` +
                    `⭐ ⭐ ☆ ☆ ☆ Poor\n` +
                    `⭐ ☆ ☆ ☆ ☆ Very Poor\n\n` +
                    `Reply with your rating and comments.\n` +
                    `*Thank you for helping us improve!*`;

      return await this.sendMessage(message);
    } catch (error) {
      console.error('Error requesting feedback:', error);
      return false;
    }
  }

  static async sendQuickActions(): Promise<boolean> {
    try {
      const message = `🚀 *Quick Actions Menu*\n\n` +
                    `Choose an option:\n\n` +
                    `1️⃣ Check Application Status\n` +
                    `2️⃣ Schedule Appointment\n` +
                    `3️⃣ Upload Documents\n` +
                    `4️⃣ Payment Information\n` +
                    `5️⃣ Emergency Support\n` +
                    `6️⃣ Speak to Human Agent\n\n` +
                    `Reply with the number of your choice.\n` +
                    `*EMIRAFRIK Support Bot*`;

      return await this.sendMessage(message);
    } catch (error) {
      console.error('Error sending quick actions:', error);
      return false;
    }
  }

  static async handleIncomingMessage(message: WhatsAppMessage): Promise<void> {
    try {
      // Store incoming message
      await this.storeMessage(message);

      // Process automated responses
      await this.processAutomatedResponse(message);

      // Notify relevant staff if needed
      if (this.requiresHumanResponse(message)) {
        await this.notifyStaff(message);
      }
    } catch (error) {
      console.error('Error handling incoming WhatsApp message:', error);
    }
  }

  private static async processAutomatedResponse(message: WhatsAppMessage): Promise<void> {
    const content = message.content.toLowerCase();

    if (content.includes('hello') || content.includes('hi') || content.includes('start')) {
      await this.sendQuickActions();
    } else if (content === '1') {
      await this.sendApplicationStatus();
    } else if (content === '2') {
      await this.sendAppointmentOptions();
    } else if (content === '5') {
      await this.sendEmergencyContacts();
    } else if (content === '6') {
      await this.connectToHumanAgent();
    }
  }

  private static async sendApplicationStatus(): Promise<boolean> {
    try {
      const status = await ApiService.get('/patient/status');
      const message = `📊 *Application Status*\n\n` +
                    `Status: ${status.data.status}\n` +
                    `Progress: ${status.data.progress}%\n` +
                    `Current Step: ${status.data.currentStep}\n\n` +
                    `*Next steps will be communicated shortly.*`;

      return await this.sendMessage(message);
    } catch (error) {
      console.error('Error sending application status:', error);
      return false;
    }
  }

  private static async sendEmergencyContacts(): Promise<boolean> {
    try {
      const message = `🆘 *Emergency Contacts*\n\n` +
                    `🚨 Medical Emergency: +971 50 XXX XXXX\n` +
                    `🏥 Hospital Direct: +971 4 XXX XXXX\n` +
                    `📞 24/7 Support: +971 50 XXX XXXX\n` +
                    `✈️ Travel Emergency: +971 50 XXX XXXX\n\n` +
                    `*For immediate assistance, call the numbers above.*`;

      return await this.sendMessage(message);
    } catch (error) {
      return false;
    }
  }

  private static requiresHumanResponse(message: WhatsAppMessage): boolean {
    const humanRequiredKeywords = [
      'urgent', 'emergency', 'help', 'problem', 'issue', 'complaint',
      'speak to human', 'talk to agent', 'representative'
    ];

    return humanRequiredKeywords.some(keyword => 
      message.content.toLowerCase().includes(keyword)
    );
  }

  private static async storeMessage(message: WhatsAppMessage): Promise<void> {
    try {
      await ApiService.post('/whatsapp/store-message', message);
    } catch (error) {
      console.error('Error storing WhatsApp message:', error);
    }
  }

  private static async notifyStaff(message: WhatsAppMessage): Promise<void> {
    try {
      await ApiService.post('/notifications/staff', {
        type: 'whatsapp_message_requires_attention',
        message: message,
        priority: 'high'
      });
    } catch (error) {
      console.error('Error notifying staff:', error);
    }
  }

  private static async getVerifyToken(): Promise<string> {
    try {
      const token = await AsyncStorage.getItem('whatsapp_verify_token');
      return token || 'emirafrik_whatsapp_verify_token';
    } catch (error) {
      return 'emirafrik_whatsapp_verify_token';
    }
  }

  private static async openAppStore(): Promise<void> {
    const storeUrl = Platform.OS === 'ios' 
      ? 'https://apps.apple.com/app/whatsapp-messenger/id310633997'
      : 'https://play.google.com/store/apps/details?id=com.whatsapp';
    
    await Linking.openURL(storeUrl);
  }

  private static async connectToHumanAgent(): Promise<boolean> {
    try {
      const message = `👤 *Connecting to Human Agent*\n\n` +
                    `Please wait while we connect you to one of our support agents.\n` +
                    `Average wait time: 2-3 minutes\n\n` +
                    `*A team member will respond shortly.*`;

      // Notify staff about human agent request
      await this.notifyStaff({
        id: Date.now().toString(),
        type: 'text',
        content: 'Human agent requested',
        timestamp: new Date().toISOString(),
        fromUser: true,
        status: 'read'
      });

      return await this.sendMessage(message);
    } catch (error) {
      return false;
    }
  }

  private static async sendAppointmentOptions(): Promise<boolean> {
    try {
      const message = `📅 *Appointment Scheduling*\n\n` +
                    `To schedule an appointment:\n\n` +
                    `1. Open the EMIRAFRIK mobile app\n` +
                    `2. Go to 'Appointments' section\n` +
                    `3. Select 'Schedule New'\n` +
                    `4. Choose your preferred time\n\n` +
                    `Or reply 'CALL ME' for phone scheduling.\n` +
                    `*EMIRAFRIK Scheduling Team*`;

      return await this.sendMessage(message);
    } catch (error) {
      return false;
    }
  }
}