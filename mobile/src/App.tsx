import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar, Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SplashScreen from 'react-native-splash-screen';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import LoginScreen from './screens/auth/LoginScreen';
import DashboardScreen from './screens/dashboard/DashboardScreen';
import AppointmentsScreen from './screens/appointments/AppointmentsScreen';
import DocumentsScreen from './screens/documents/DocumentsScreen';
import TelemedicineScreen from './screens/telemedicine/TelemedicineScreen';
import PaymentScreen from './screens/payment/PaymentScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import OfflineScreen from './screens/offline/OfflineScreen';
import NotificationScreen from './screens/notifications/NotificationScreen';

// New Screens
import LoyaltyScreen from './screens/loyalty/LoyaltyScreen';
import WhatsAppScreen from './screens/whatsapp/WhatsAppScreen';

// Family App Screens
import FamilyDashboard from './screens/family/FamilyDashboard';
import PatientTracker from './screens/family/PatientTracker';
import VideoCallFamily from './screens/family/VideoCallFamily';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';
import { OfflineProvider } from './context/OfflineContext';
import { NotificationProvider } from './context/NotificationContext';

// Services
import { BiometricService } from './services/BiometricService';
import { OfflineService } from './services/OfflineService';
import { NotificationService } from './services/NotificationService';
import { LoyaltyService } from './services/LoyaltyService';
import { WhatsAppService } from './services/WhatsAppService';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const PatientTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          switch (route.name) {
            case 'Dashboard':
              iconName = 'dashboard';
              break;
            case 'Appointments':
              iconName = 'event';
              break;
            case 'Documents':
              iconName = 'folder';
              break;
            case 'Telemedicine':
              iconName = 'video-call';
              break;
            case 'Loyalty':
              iconName = 'stars';
              break;
            case 'WhatsApp':
              iconName = 'chat';
              break;
            case 'Profile':
              iconName = 'person';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#059669',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Appointments" component={AppointmentsScreen} />
      <Tab.Screen name="Documents" component={DocumentsScreen} />
      <Tab.Screen name="Telemedicine" component={TelemedicineScreen} />
      <Tab.Screen 
        name="Loyalty" 
        component={LoyaltyScreen}
        options={{ tabBarLabel: 'Rewards' }}
      />
      <Tab.Screen name="WhatsApp" component={WhatsAppScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const FamilyTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          switch (route.name) {
            case 'FamilyDashboard':
              iconName = 'dashboard';
              break;
            case 'PatientTracker':
              iconName = 'track-changes';
              break;
            case 'VideoCall':
              iconName = 'video-call';
              break;
            case 'WhatsApp':
              iconName = 'chat';
              break;
            case 'Notifications':
              iconName = 'notifications';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#059669',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="FamilyDashboard" 
        component={FamilyDashboard}
        options={{ tabBarLabel: 'Dashboard' }}
      />
      <Tab.Screen 
        name="PatientTracker" 
        component={PatientTracker}
        options={{ tabBarLabel: 'Patient' }}
      />
      <Tab.Screen 
        name="VideoCall" 
        component={VideoCallFamily}
        options={{ tabBarLabel: 'Video Call' }}
      />
      <Tab.Screen name="WhatsApp" component={WhatsAppScreen} />
      <Tab.Screen 
        name="Notifications" 
        component={NotificationScreen}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { user, userType, isLoading } = useAuth();
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Network connectivity monitoring
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return null; // Show splash screen
  }

  if (!isOnline) {
    return <OfflineScreen />;
  }

  if (!user) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userType === 'family' ? (
        <Stack.Screen name="FamilyApp" component={FamilyTabNavigator} />
      ) : (
        <Stack.Screen name="PatientApp" component={PatientTabNavigator} />
      )}
      <Stack.Screen name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    // Initialize app
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Initialize services
      await BiometricService.initialize();
      await OfflineService.initialize();
      await NotificationService.initialize();
      await WhatsAppService.initializeWhatsAppIntegration();

      // Configure push notifications
      configurePushNotifications();

      // Hide splash screen
      SplashScreen.hide();
    } catch (error) {
      console.error('App initialization error:', error);
    }
  };

  const configurePushNotifications = () => {
    // Request permission
    messaging().requestPermission();

    // Handle foreground messages
    messaging().onMessage(async remoteMessage => {
      console.log('FCM Message Data:', remoteMessage.data);
      
      // Show local notification
      PushNotification.localNotification({
        title: remoteMessage.notification?.title,
        message: remoteMessage.notification?.body || '',
        playSound: true,
        soundName: 'default',
      });

      // Handle WhatsApp notifications
      if (remoteMessage.data?.type === 'whatsapp_message') {
        await WhatsAppService.handleIncomingMessage(remoteMessage.data);
      }

      // Handle loyalty notifications
      if (remoteMessage.data?.type === 'loyalty_points_earned') {
        await LoyaltyService.earnPoints(
          remoteMessage.data.activityType,
          parseInt(remoteMessage.data.points),
          remoteMessage.data.description
        );
      }
    });

    // Handle background/quit state messages
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    // Handle notification opened app
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background state:', remoteMessage.notification);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('Notification caused app to open from quit state:', remoteMessage.notification);
        }
      });
  };

  return (
    <PaperProvider>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor="#059669"
      />
      <AuthProvider>
        <OfflineProvider>
          <NotificationProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </NotificationProvider>
        </OfflineProvider>
      </AuthProvider>
    </PaperProvider>
  );
};

export default App;