# EMIRAFRIK Medical Tourism Platform

A comprehensive medical tourism platform connecting patients from the Middle East and French-speaking Africa with world-class healthcare in the UAE, featuring integrated Mobile Money payments, WhatsApp communication, and loyalty rewards.

## 🌟 Features

### 🏥 Medical Tourism Management
- **20-Step Process**: Comprehensive patient journey from inquiry to aftercare
- **AI-Powered Recommendations**: Smart treatment plan suggestions
- **Multi-language Support**: Arabic, French, English
- **Real-time Tracking**: Application status and progress monitoring

### 🎁 Loyalty & Rewards System
- **Tier-based Rewards**: Bronze, Silver, Gold, Platinum, Diamond tiers
- **Point Earning**: Earn points for various actions and milestones
- **Exclusive Benefits**: Discounts, upgrades, and premium services
- **Referral Program**: Earn bonus points for successful referrals

### 📱 WhatsApp Integration
- **Instant Notifications**: Appointment reminders, status updates
- **Interactive Bot**: Quick commands and automated responses
- **Emergency Support**: 24/7 emergency assistance via WhatsApp
- **Multi-language**: Support in Arabic, French, and English

### 💰 Payment Integration
- **Multiple Payment Methods**: Credit cards, bank transfers, and Mobile Money
- **Mobile Money Providers**: MTN, Orange, Airtel, M-Pesa, Wave, Moov
- **Multi-currency Support**: USD, EUR, and local African currencies
- **Secure Processing**: Bank-grade security and encryption

### 👩‍⚕️ Employee Portal
- **Patient Management**: Comprehensive case tracking
- **Application Review**: AI-assisted approval workflow
- **Communication Center**: Real-time messaging with patients
- **Analytics Dashboard**: Performance metrics and insights

### 🤖 AI Assistant
- **24/7 Support**: Intelligent chatbot for patient inquiries
- **Treatment Guidance**: AI-powered medical recommendations
- **Process Automation**: Smart workflow management

## 🎨 EmirAfrik Branding

The platform now features the authentic EmirAfrik brand identity:

### **Visual Identity**
- **Primary Color**: Emerald Green (#059669) - representing health, growth, and trust
- **Logo**: Custom medical tourism icon with geometric design
- **Typography**: Inter font family for modern, professional appearance
- **Color Palette**: Emerald-focused with medical accent colors

### **Brand Elements**
- Custom logo with medical cross and geometric patterns
- Gradient backgrounds using brand colors
- Consistent spacing and border radius (12px)
- Professional medical-themed icons and illustrations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Modern web browser

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-org/emirafrik-medical-tourism.git
cd emirafrik-medical-tourism
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env` file in the root directory:
```env
# Mobile Money API Keys
REACT_APP_MTN_API_URL=https://sandbox.momodeveloper.mtn.com
REACT_APP_MTN_SUBSCRIPTION_KEY=your_mtn_subscription_key
REACT_APP_ORANGE_CLIENT_ID=your_orange_client_id
REACT_APP_AIRTEL_CLIENT_ID=your_airtel_client_id
REACT_APP_MPESA_CONSUMER_KEY=your_mpesa_consumer_key

# WhatsApp Business API
REACT_APP_WHATSAPP_API_URL=https://graph.facebook.com/v18.0
REACT_APP_WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
REACT_APP_WHATSAPP_ACCESS_TOKEN=your_access_token

# General API
REACT_APP_API_URL=https://api.emirafrik.com
```

4. **Start development server**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
```

## 🎁 Loyalty & Rewards System

### **Tier Structure**
- **Bronze** (0-999 points): 5% discount, priority support
- **Silver** (1000-2499 points): 10% discount, free consultation
- **Gold** (2500-4999 points): 15% discount, VIP lounge access
- **Platinum** (5000-9999 points): 20% discount, premium accommodation
- **Diamond** (10000+ points): 25% discount, private jet transfers

### **Point Earning Opportunities**
- Registration: 100 points
- Document Upload: 50 points
- Treatment Completion: 500 points
- Successful Referral: 500 points
- Review Submission: 100 points
- Survey Completion: 75 points

### **Reward Categories**
- **Medical**: Treatment discounts, VIP upgrades
- **Travel**: Airport transfers, flight upgrades
- **Accommodation**: Hotel upgrades, extended stays
- **Wellness**: Spa packages, health services
- **Tourism**: Desert safaris, city tours

## 📱 WhatsApp Integration Features

### **Automated Notifications**
- Appointment reminders (24h and 1h before)
- Document status updates
- Payment confirmations
- Treatment progress updates
- Emergency alerts

### **Interactive Commands**
- `STATUS` - Check application status
- `APPOINTMENTS` - View upcoming appointments
- `DOCUMENTS` - Document requirements
- `PAYMENT` - Payment information
- `HELP` - Assistance menu
- `EMERGENCY` - Emergency support

### **Multi-language Support**
- Arabic: العربية
- French: Français
- English: Default

## 📱 Mobile Money Integration

### Supported Providers
| Provider | Countries | Features |
|----------|-----------|----------|
| **MTN Mobile Money** | Ghana, Uganda, Rwanda, Zambia, Cameroon | USSD, API Integration |
| **Orange Money** | Senegal, Mali, Burkina Faso, Niger | Web Payment, SMS |
| **Airtel Money** | Kenya, Tanzania, Uganda, Rwanda | STK Push, API |
| **M-Pesa** | Kenya, Tanzania, Ghana | STK Push, Real-time |
| **Wave** | Senegal, Mali, Burkina Faso | App-based, Instant |
| **Moov Money** | West Africa (7 countries) | USSD, API |

### Payment Flow
1. **Provider Selection**: User selects their mobile money provider
2. **Phone Verification**: Enter registered mobile number
3. **Payment Initiation**: Secure API call to provider
4. **User Authorization**: USSD prompt or app notification
5. **Confirmation**: Real-time status updates
6. **Receipt**: Transaction confirmation and receipt

## 🏗️ Architecture

### Frontend
- **React 18**: Modern React with hooks and context
- **Tailwind CSS**: Custom EmirAfrik brand styling
- **Framer Motion**: Smooth animations and transitions
- **React Router**: Client-side routing
- **React Icons**: Comprehensive icon library

### Backend Integration
- **RESTful APIs**: Comprehensive API integration
- **Real-time Updates**: WebSocket connections
- **Webhook Handling**: Secure payment and notification confirmations
- **Authentication**: JWT-based secure authentication

### Services
- **Loyalty Service**: Point tracking and reward management
- **WhatsApp Service**: Business API integration
- **Payment Service**: Multi-provider mobile money integration
- **Notification Service**: Real-time alerts and updates

## 🔧 Configuration

### WhatsApp Business API Setup
1. **Create WhatsApp Business Account**
2. **Configure Webhook URL**: `https://yourapp.com/api/whatsapp/webhook`
3. **Set up Message Templates**
4. **Configure Phone Number**

### Mobile Money Setup
1. **Register with Providers**: Get sandbox and production credentials
2. **Configure Webhooks**: Set up payment confirmation endpoints
3. **Test Integration**: Verify payment flows in sandbox
4. **Go Live**: Switch to production endpoints

### Loyalty System Configuration
1. **Define Point Values**: Set point values for different actions
2. **Configure Tiers**: Set up tier thresholds and benefits
3. **Create Rewards**: Add available rewards and redemption options
4. **Set Up Analytics**: Track loyalty metrics and engagement

## 🌍 Localization

### Supported Languages
- **English**: Default language
- **Arabic**: العربية (Primary for Middle East)
- **French**: Français (Primary for French-speaking Africa)

### Currency Support
- **USD**: Primary currency for medical packages
- **Local Currencies**: Automatic conversion
  - West African CFA Franc (XOF)
  - Kenyan Shilling (KES)
  - Ugandan Shilling (UGX)
  - Ghanaian Cedi (GHS)
  - And 15+ more African currencies

## 📊 Analytics & Monitoring

### Key Metrics
- **Patient Journey**: Conversion rates at each step
- **Loyalty Engagement**: Points earned and redeemed
- **WhatsApp Usage**: Message volume and response rates
- **Payment Success**: Transaction completion rates
- **User Satisfaction**: NPS and feedback scores

### Monitoring Tools
- **Real-time Dashboards**: Live metrics and KPIs
- **Alert Systems**: Automated notifications for issues
- **Performance Tracking**: Response times and uptime
- **User Analytics**: Behavior and engagement patterns

## 🛡️ Security Features

### Data Protection
- **End-to-end Encryption**: All sensitive data encrypted
- **GDPR Compliance**: European data protection standards
- **HIPAA Compliance**: Medical data protection
- **PCI DSS**: Payment card industry standards

### Authentication & Authorization
- **JWT Tokens**: Secure session management
- **Role-based Access**: Patient and employee permissions
- **Two-factor Authentication**: SMS and app-based 2FA
- **Audit Logging**: Comprehensive activity tracking

## 🚀 Deployment

### Production Deployment
1. **Build the application**: `npm run build`
2. **Deploy to hosting platform**: Vercel, Netlify, AWS
3. **Configure environment variables**: Production API keys
4. **Set up monitoring**: Error tracking and analytics

### WhatsApp Production Setup
1. **Business Verification**: Complete Meta business verification
2. **Phone Number Approval**: Get production phone number
3. **Template Approval**: Submit message templates for approval
4. **Go Live**: Switch to production endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For technical support or questions:
- **Email**: dev-support@emirafrik.com
- **WhatsApp**: +971 50 XXX XXXX
- **Documentation**: https://docs.emirafrik.com

## 🗺️ Roadmap

- [x] **Loyalty & Rewards System**: Comprehensive tier-based loyalty program
- [x] **WhatsApp Integration**: Full business API integration with automation
- [x] **EmirAfrik Branding**: Authentic brand identity and styling
- [ ] **Mobile App**: React Native iOS and Android applications
- [ ] **AI Enhancements**: Advanced medical recommendations
- [ ] **Blockchain Integration**: Secure medical record management
- [ ] **IoT Integration**: Wearable device connectivity

---

**EMIRAFRIK** - Excellence in Medical Tourism 🏥💚

*Connecting patients across Africa and the Middle East with world-class healthcare in the UAE*

Built with ❤️ using React, Tailwind CSS, and modern web technologies.