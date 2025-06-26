// WhatsApp Business API Integration Service

export class WhatsAppService {
  constructor() {
    this.baseURL = process.env.REACT_APP_WHATSAPP_API_URL || 'https://graph.facebook.com/v18.0';
    this.phoneNumberId = process.env.REACT_APP_WHATSAPP_PHONE_NUMBER_ID;
    this.accessToken = process.env.REACT_APP_WHATSAPP_ACCESS_TOKEN;
    this.webhookVerifyToken = process.env.REACT_APP_WHATSAPP_WEBHOOK_VERIFY_TOKEN;
  }

  // Send text message
  async sendTextMessage(to, message) {
    try {
      const response = await fetch(`${this.baseURL}/${this.phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: to,
          type: 'text',
          text: {
            body: message
          }
        })
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      throw error;
    }
  }

  // Send template message
  async sendTemplateMessage(to, templateName, languageCode = 'en', components = []) {
    try {
      const response = await fetch(`${this.baseURL}/${this.phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: to,
          type: 'template',
          template: {
            name: templateName,
            language: {
              code: languageCode
            },
            components: components
          }
        })
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error sending WhatsApp template:', error);
      throw error;
    }
  }

  // Send interactive message with buttons
  async sendInteractiveMessage(to, bodyText, buttons) {
    try {
      const response = await fetch(`${this.baseURL}/${this.phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: to,
          type: 'interactive',
          interactive: {
            type: 'button',
            body: {
              text: bodyText
            },
            action: {
              buttons: buttons.map((button, index) => ({
                type: 'reply',
                reply: {
                  id: `btn_${index}`,
                  title: button
                }
              }))
            }
          }
        })
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error sending interactive message:', error);
      throw error;
    }
  }

  // Send appointment reminder
  async sendAppointmentReminder(to, appointmentDetails) {
    const message = `🏥 *EMIRAFRIK Appointment Reminder*

Hello! This is a friendly reminder about your upcoming appointment:

📅 *Date:* ${appointmentDetails.date}
⏰ *Time:* ${appointmentDetails.time}
👨‍⚕️ *Doctor:* ${appointmentDetails.doctor}
🏥 *Location:* ${appointmentDetails.location}

Please arrive 15 minutes early. If you need to reschedule, reply with "RESCHEDULE".

For support: Reply "HELP"`;

    return await this.sendTextMessage(to, message);
  }

  // Send document status update
  async sendDocumentStatusUpdate(to, documentName, status) {
    const statusMessages = {
      'uploaded': '✅ Your document has been successfully uploaded',
      'verified': '🎉 Your document has been verified and approved',
      'rejected': '❌ Your document needs revision',
      'pending': '⏳ Your document is being reviewed'
    };

    const message = `📄 *Document Status Update*

Document: ${documentName}
Status: ${statusMessages[status]}

${status === 'rejected' ? 'Please check your patient portal for details on required changes.' : ''}
${status === 'verified' ? 'You can proceed to the next step in your application.' : ''}

Portal: emirafrik.com/patient-portal`;

    return await this.sendTextMessage(to, message);
  }

  // Send payment confirmation
  async sendPaymentConfirmation(to, paymentDetails) {
    const message = `💳 *Payment Confirmation*

Thank you! Your payment has been processed successfully.

💰 *Amount:* ${paymentDetails.currency} ${paymentDetails.amount}
🔢 *Transaction ID:* ${paymentDetails.transactionId}
📅 *Date:* ${paymentDetails.date}
💳 *Method:* ${paymentDetails.method}

Your receipt has been sent to your email. For any questions, reply "HELP".`;

    return await this.sendTextMessage(to, message);
  }

  // Send emergency alert
  async sendEmergencyAlert(to, emergencyDetails) {
    const message = `🚨 *EMERGENCY ALERT*

This is an urgent notification from EMIRAFRIK Medical Team.

Patient: ${emergencyDetails.patientName}
Alert: ${emergencyDetails.alertType}
Time: ${emergencyDetails.timestamp}

Immediate action required. Please contact our emergency hotline:
📞 +971 50 XXX XXXX

This is an automated alert. Do not reply to this message.`;

    return await this.sendTextMessage(to, message);
  }

  // Handle incoming webhook messages
  async handleWebhook(req, res) {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // Verify webhook
    if (mode === 'subscribe' && token === this.webhookVerifyToken) {
      console.log('Webhook verified successfully');
      return res.status(200).send(challenge);
    }

    // Handle incoming messages
    if (req.body.object === 'whatsapp_business_account') {
      req.body.entry.forEach(entry => {
        entry.changes.forEach(change => {
          if (change.field === 'messages') {
            const messages = change.value.messages;
            if (messages) {
              messages.forEach(message => {
                this.processIncomingMessage(message);
              });
            }
          }
        });
      });
    }

    return res.status(200).send('OK');
  }

  // Process incoming messages and respond
  async processIncomingMessage(message) {
    const from = message.from;
    const messageText = message.text?.body?.toLowerCase();

    try {
      switch (messageText) {
        case 'status':
          await this.sendApplicationStatus(from);
          break;
        case 'appointments':
          await this.sendAppointments(from);
          break;
        case 'documents':
          await this.sendDocumentRequirements(from);
          break;
        case 'payment':
          await this.sendPaymentInfo(from);
          break;
        case 'help':
          await this.sendHelpMenu(from);
          break;
        case 'emergency':
          await this.handleEmergencyRequest(from);
          break;
        default:
          await this.sendDefaultResponse(from);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      await this.sendTextMessage(from, 'Sorry, there was an error processing your request. Please try again later or contact support.');
    }
  }

  // Send application status
  async sendApplicationStatus(to) {
    // This would typically fetch from your database
    const status = await this.getUserApplicationStatus(to);
    
    const message = `📋 *Your Application Status*

Current Step: ${status.currentStep} of 20
Progress: ${status.progress}%
Status: ${status.statusText}

Next Steps:
${status.nextSteps.map(step => `• ${step}`).join('\n')}

Portal: emirafrik.com/patient-portal`;

    return await this.sendTextMessage(to, message);
  }

  // Send upcoming appointments
  async sendAppointments(to) {
    const appointments = await this.getUserAppointments(to);
    
    if (appointments.length === 0) {
      return await this.sendTextMessage(to, 'You have no upcoming appointments. To schedule one, visit your patient portal or reply "SCHEDULE".');
    }

    const message = `📅 *Your Upcoming Appointments*

${appointments.map(apt => `
📅 ${apt.date} at ${apt.time}
👨‍⚕️ ${apt.doctor}
🏥 ${apt.location}
`).join('\n')}

To reschedule any appointment, reply with "RESCHEDULE [appointment number]"`;

    return await this.sendTextMessage(to, message);
  }

  // Send help menu
  async sendHelpMenu(to) {
    const helpButtons = [
      'Check Status',
      'Book Appointment', 
      'Contact Support'
    ];

    const bodyText = `🤖 *EMIRAFRIK Assistant*

How can I help you today? Choose an option below or type one of these commands:

📋 STATUS - Check application status
📅 APPOINTMENTS - View appointments
📄 DOCUMENTS - Document requirements
💳 PAYMENT - Payment information
🆘 EMERGENCY - Emergency support

You can also type your question and I'll do my best to help!`;

    return await this.sendInteractiveMessage(to, bodyText, helpButtons);
  }

  // Send default response
  async sendDefaultResponse(to) {
    const message = `👋 Hello! I'm your EMIRAFRIK assistant.

I can help you with:
• STATUS - Check your application
• APPOINTMENTS - View appointments
• DOCUMENTS - Document info
• PAYMENT - Payment details
• HELP - Show this menu
• EMERGENCY - Urgent support

What would you like to know?`;

    return await this.sendTextMessage(to, message);
  }

  // Utility methods (these would connect to your actual database)
  async getUserApplicationStatus(phoneNumber) {
    // Mock data - replace with actual database query
    return {
      currentStep: 8,
      progress: 40,
      statusText: 'Document Review in Progress',
      nextSteps: [
        'Submit missing lab results',
        'Schedule pre-treatment consultation',
        'Complete payment'
      ]
    };
  }

  async getUserAppointments(phoneNumber) {
    // Mock data - replace with actual database query
    return [
      {
        date: '2024-02-15',
        time: '10:00 AM',
        doctor: 'Dr. Ahmed Al-Rashid',
        location: 'Dubai Heart Center'
      }
    ];
  }

  async handleEmergencyRequest(phoneNumber) {
    // Log emergency request
    console.log(`Emergency request from: ${phoneNumber}`);
    
    // Send immediate response
    const message = `🚨 *EMERGENCY SUPPORT ACTIVATED*

Your emergency request has been received and forwarded to our medical team.

🏥 Emergency Hotline: +971 50 XXX XXXX
🚑 Ambulance: 999 (UAE)
🩺 24/7 Medical Support: +971 4 XXX XXXX

A medical coordinator will contact you within 5 minutes.

Stay calm and follow any immediate medical instructions you've received.`;

    await this.sendTextMessage(phoneNumber, message);

    // Trigger emergency protocol (notify medical team, etc.)
    await this.triggerEmergencyProtocol(phoneNumber);
  }

  async triggerEmergencyProtocol(phoneNumber) {
    // Implementation would include:
    // - Notify medical team
    // - Create emergency ticket
    // - Send alerts to relevant staff
    // - Log in emergency system
    console.log(`Emergency protocol triggered for: ${phoneNumber}`);
  }
}

// Notification Templates
export const WhatsAppTemplates = {
  // Appointment reminder template
  appointmentReminder: {
    name: 'appointment_reminder',
    language: 'en',
    components: [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: '{{patient_name}}' },
          { type: 'text', text: '{{appointment_date}}' },
          { type: 'text', text: '{{appointment_time}}' },
          { type: 'text', text: '{{doctor_name}}' }
        ]
      }
    ]
  },

  // Welcome message template
  welcome: {
    name: 'welcome_message',
    language: 'en',
    components: [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: '{{patient_name}}' }
        ]
      }
    ]
  },

  // Payment confirmation template
  paymentConfirmation: {
    name: 'payment_confirmation',
    language: 'en',
    components: [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: '{{amount}}' },
          { type: 'text', text: '{{transaction_id}}' },
          { type: 'text', text: '{{payment_date}}' }
        ]
      }
    ]
  }
};

// Export singleton instance
export const whatsAppService = new WhatsAppService();