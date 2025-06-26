import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BiometricService } from '../services/BiometricService';
import { AuthService } from '../services/AuthService';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  nationality?: string;
  patientId?: string;
  familyMemberOf?: string;
}

interface AuthContextType {
  user: User | null;
  userType: 'patient' | 'family' | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, type: 'patient' | 'family') => Promise<boolean>;
  loginWithBiometrics: () => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<'patient' | 'family' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Check if user is stored locally
      const storedUser = await AsyncStorage.getItem('user');
      const storedUserType = await AsyncStorage.getItem('userType');
      const storedToken = await AsyncStorage.getItem('authToken');

      if (storedUser && storedUserType && storedToken) {
        // Verify token with server
        const isValid = await AuthService.verifyToken(storedToken);
        
        if (isValid) {
          setUser(JSON.parse(storedUser));
          setUserType(storedUserType as 'patient' | 'family');
        } else {
          // Token invalid, clear storage
          await clearAuthData();
        }
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      await clearAuthData();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (
    email: string, 
    password: string, 
    type: 'patient' | 'family'
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      const response = await AuthService.login(email, password, type);
      
      if (response.success) {
        await storeAuthData(response.user, response.token, type);
        setUser(response.user);
        setUserType(type);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithBiometrics = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Check if biometric login is enabled
      const isEnabled = await BiometricService.isBiometricLoginEnabled();
      if (!isEnabled) {
        return false;
      }

      // Authenticate with biometrics
      const biometricResult = await BiometricService.authenticateForLogin();
      if (!biometricResult.success) {
        return false;
      }

      // Get stored credentials
      const storedEmail = await AsyncStorage.getItem('biometricEmail');
      const storedUserType = await AsyncStorage.getItem('userType');
      
      if (!storedEmail || !storedUserType) {
        return false;
      }

      // Authenticate with server using biometric signature
      const response = await AuthService.loginWithBiometrics(
        storedEmail,
        biometricResult.signature!,
        storedUserType as 'patient' | 'family'
      );

      if (response.success) {
        await storeAuthData(response.user, response.token, storedUserType as 'patient' | 'family');
        setUser(response.user);
        setUserType(storedUserType as 'patient' | 'family');
        return true;
      }

      return false;
    } catch (error) {
      console.error('Biometric login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Notify server about logout
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        await AuthService.logout(token);
      }
      
      // Clear local data
      await clearAuthData();
      setUser(null);
      setUserType(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (userData: Partial<User>): Promise<void> => {
    try {
      if (!user) return;

      const updatedUser = { ...user, ...userData };
      
      // Update on server
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        await AuthService.updateUser(updatedUser, token);
      }
      
      // Update locally
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  };

  const storeAuthData = async (
    userData: User, 
    token: string, 
    type: 'patient' | 'family'
  ): Promise<void> => {
    try {
      await AsyncStorage.multiSet([
        ['user', JSON.stringify(userData)],
        ['authToken', token],
        ['userType', type],
        ['biometricEmail', userData.email], // Store for biometric login
      ]);
    } catch (error) {
      console.error('Error storing auth data:', error);
      throw error;
    }
  };

  const clearAuthData = async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove([
        'user',
        'authToken',
        'userType',
        // Keep biometric email for future logins
      ]);
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  };

  const value: AuthContextType = {
    user,
    userType,
    isLoading,
    isAuthenticated: !!user,
    login,
    loginWithBiometrics,
    logout,
    updateUser,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};