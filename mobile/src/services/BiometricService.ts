import ReactNativeBiometrics from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export class BiometricService {
  private static rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });

  static async initialize(): Promise<void> {
    try {
      const { available, biometryType } = await this.rnBiometrics.isSensorAvailable();
      
      if (available) {
        console.log('Biometric authentication available:', biometryType);
        await AsyncStorage.setItem('biometricAvailable', 'true');
        await AsyncStorage.setItem('biometricType', biometryType || 'unknown');
      } else {
        console.log('Biometric authentication not available');
        await AsyncStorage.setItem('biometricAvailable', 'false');
      }
    } catch (error) {
      console.error('Error initializing biometrics:', error);
    }
  }

  static async isAvailable(): Promise<boolean> {
    try {
      const available = await AsyncStorage.getItem('biometricAvailable');
      return available === 'true';
    } catch (error) {
      return false;
    }
  }

  static async getBiometricType(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('biometricType');
    } catch (error) {
      return null;
    }
  }

  static async authenticate(reason: string = 'Authenticate to access EMIRAFRIK'): Promise<boolean> {
    try {
      const isAvailable = await this.isAvailable();
      
      if (!isAvailable) {
        Alert.alert(
          'Biometric Authentication',
          'Biometric authentication is not available on this device'
        );
        return false;
      }

      const { success, error } = await this.rnBiometrics.simplePrompt({
        promptMessage: reason,
        cancelButtonText: 'Cancel',
      });

      if (success) {
        console.log('Biometric authentication successful');
        return true;
      } else {
        console.log('Biometric authentication failed:', error);
        return false;
      }
    } catch (error) {
      console.error('Biometric authentication error:', error);
      return false;
    }
  }

  static async createKeys(): Promise<boolean> {
    try {
      const { available } = await this.rnBiometrics.isSensorAvailable();
      
      if (!available) {
        return false;
      }

      const { keysExist } = await this.rnBiometrics.biometricKeysExist();
      
      if (!keysExist) {
        const { publicKey } = await this.rnBiometrics.createKeys();
        await AsyncStorage.setItem('biometricPublicKey', publicKey);
        console.log('Biometric keys created successfully');
      }

      return true;
    } catch (error) {
      console.error('Error creating biometric keys:', error);
      return false;
    }
  }

  static async deleteKeys(): Promise<boolean> {
    try {
      const { keysDeleted } = await this.rnBiometrics.deleteKeys();
      
      if (keysDeleted) {
        await AsyncStorage.removeItem('biometricPublicKey');
        console.log('Biometric keys deleted successfully');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error deleting biometric keys:', error);
      return false;
    }
  }

  static async createSignature(payload: string): Promise<string | null> {
    try {
      const { available } = await this.rnBiometrics.isSensorAvailable();
      
      if (!available) {
        return null;
      }

      const { success, signature, error } = await this.rnBiometrics.createSignature({
        promptMessage: 'Sign in with biometrics',
        payload: payload,
      });

      if (success && signature) {
        console.log('Biometric signature created successfully');
        return signature;
      } else {
        console.log('Biometric signature creation failed:', error);
        return null;
      }
    } catch (error) {
      console.error('Error creating biometric signature:', error);
      return null;
    }
  }

  static async enableBiometricLogin(): Promise<boolean> {
    try {
      const isAvailable = await this.isAvailable();
      
      if (!isAvailable) {
        Alert.alert(
          'Biometric Login',
          'Biometric authentication is not available on this device'
        );
        return false;
      }

      const authenticated = await this.authenticate('Enable biometric login for EMIRAFRIK');
      
      if (authenticated) {
        const keysCreated = await this.createKeys();
        
        if (keysCreated) {
          await AsyncStorage.setItem('biometricLoginEnabled', 'true');
          Alert.alert(
            'Success',
            'Biometric login has been enabled successfully'
          );
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error('Error enabling biometric login:', error);
      Alert.alert('Error', 'Failed to enable biometric login');
      return false;
    }
  }

  static async disableBiometricLogin(): Promise<boolean> {
    try {
      const deleted = await this.deleteKeys();
      
      if (deleted) {
        await AsyncStorage.removeItem('biometricLoginEnabled');
        Alert.alert(
          'Success',
          'Biometric login has been disabled successfully'
        );
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error disabling biometric login:', error);
      Alert.alert('Error', 'Failed to disable biometric login');
      return false;
    }
  }

  static async isBiometricLoginEnabled(): Promise<boolean> {
    try {
      const enabled = await AsyncStorage.getItem('biometricLoginEnabled');
      return enabled === 'true';
    } catch (error) {
      return false;
    }
  }

  static async authenticateForLogin(): Promise<{ success: boolean; signature?: string }> {
    try {
      const isEnabled = await this.isBiometricLoginEnabled();
      
      if (!isEnabled) {
        return { success: false };
      }

      const payload = `emirafrik_login_${Date.now()}`;
      const signature = await this.createSignature(payload);

      if (signature) {
        return { success: true, signature };
      }

      return { success: false };
    } catch (error) {
      console.error('Error authenticating for login:', error);
      return { success: false };
    }
  }

  static async showBiometricPrompt(
    title: string,
    subtitle?: string,
    description?: string
  ): Promise<boolean> {
    try {
      const isAvailable = await this.isAvailable();
      
      if (!isAvailable) {
        return false;
      }

      const { success } = await this.rnBiometrics.simplePrompt({
        promptMessage: title,
        cancelButtonText: 'Cancel',
      });

      return success;
    } catch (error) {
      console.error('Error showing biometric prompt:', error);
      return false;
    }
  }
}