import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import RNFS from 'react-native-fs';

interface QueuedAction {
  id: string;
  type: string;
  data: any;
  timestamp: number;
  retryCount: number;
}

export class OfflineService {
  private static readonly QUEUE_KEY = 'offline_queue';
  private static readonly CACHE_KEY = 'offline_cache';
  private static readonly MAX_RETRIES = 3;
  private static isInitialized = false;

  static async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Set up network state listener
      NetInfo.addEventListener(state => {
        if (state.isConnected) {
          this.processQueue();
        }
      });

      this.isInitialized = true;
      console.log('OfflineService initialized');
    } catch (error) {
      console.error('Error initializing OfflineService:', error);
    }
  }

  static async isOnline(): Promise<boolean> {
    try {
      const state = await NetInfo.fetch();
      return state.isConnected ?? false;
    } catch (error) {
      return false;
    }
  }

  static async queueAction(type: string, data: any): Promise<void> {
    try {
      const action: QueuedAction = {
        id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type,
        data,
        timestamp: Date.now(),
        retryCount: 0,
      };

      const queue = await this.getQueue();
      queue.push(action);
      await this.saveQueue(queue);

      console.log(`Queued action: ${type}`, action.id);
    } catch (error) {
      console.error('Error queueing action:', error);
    }
  }

  static async processQueue(): Promise<void> {
    try {
      const isOnline = await this.isOnline();
      if (!isOnline) return;

      const queue = await this.getQueue();
      const processedIds: string[] = [];

      for (const action of queue) {
        try {
          const success = await this.executeAction(action);
          
          if (success) {
            processedIds.push(action.id);
            console.log(`Processed queued action: ${action.type}`, action.id);
          } else {
            action.retryCount++;
            if (action.retryCount >= this.MAX_RETRIES) {
              processedIds.push(action.id);
              console.log(`Max retries reached for action: ${action.type}`, action.id);
            }
          }
        } catch (error) {
          console.error(`Error processing action ${action.type}:`, error);
          action.retryCount++;
          if (action.retryCount >= this.MAX_RETRIES) {
            processedIds.push(action.id);
          }
        }
      }

      // Remove processed actions from queue
      const remainingQueue = queue.filter(action => !processedIds.includes(action.id));
      await this.saveQueue(remainingQueue);
    } catch (error) {
      console.error('Error processing queue:', error);
    }
  }

  private static async executeAction(action: QueuedAction): Promise<boolean> {
    try {
      switch (action.type) {
        case 'uploadDocument':
          return await this.executeDocumentUpload(action.data);
        case 'submitForm':
          return await this.executeFormSubmission(action.data);
        case 'syncAppointment':
          return await this.executeSyncAppointment(action.data);
        case 'sendMessage':
          return await this.executeSendMessage(action.data);
        default:
          console.warn(`Unknown action type: ${action.type}`);
          return false;
      }
    } catch (error) {
      console.error(`Error executing action ${action.type}:`, error);
      return false;
    }
  }

  private static async executeDocumentUpload(data: any): Promise<boolean> {
    try {
      // Implement document upload logic
      const { DocumentService } = require('./DocumentService');
      const result = await DocumentService.uploadDocument(data.document);
      return result.success;
    } catch (error) {
      console.error('Error uploading document:', error);
      return false;
    }
  }

  private static async executeFormSubmission(data: any): Promise<boolean> {
    try {
      // Implement form submission logic
      const { PatientService } = require('./PatientService');
      const result = await PatientService.submitForm(data.form);
      return result.success;
    } catch (error) {
      console.error('Error submitting form:', error);
      return false;
    }
  }

  private static async executeSyncAppointment(data: any): Promise<boolean> {
    try {
      // Implement appointment sync logic
      const { AppointmentService } = require('./AppointmentService');
      const result = await AppointmentService.syncAppointment(data.appointment);
      return result.success;
    } catch (error) {
      console.error('Error syncing appointment:', error);
      return false;
    }
  }

  private static async executeSendMessage(data: any): Promise<boolean> {
    try {
      // Implement message sending logic
      const { MessageService } = require('./MessageService');
      const result = await MessageService.sendMessage(data.message);
      return result.success;
    } catch (error) {
      console.error('Error sending message:', error);
      return false;
    }
  }

  private static async getQueue(): Promise<QueuedAction[]> {
    try {
      const queueJson = await AsyncStorage.getItem(this.QUEUE_KEY);
      return queueJson ? JSON.parse(queueJson) : [];
    } catch (error) {
      console.error('Error getting queue:', error);
      return [];
    }
  }

  private static async saveQueue(queue: QueuedAction[]): Promise<void> {
    try {
      await AsyncStorage.setItem(this.QUEUE_KEY, JSON.stringify(queue));
    } catch (error) {
      console.error('Error saving queue:', error);
    }
  }

  static async cacheData(key: string, data: any): Promise<void> {
    try {
      const cache = await this.getCache();
      cache[key] = {
        data,
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem(this.CACHE_KEY, JSON.stringify(cache));
    } catch (error) {
      console.error('Error caching data:', error);
    }
  }

  static async getCachedData(key: string, maxAge: number = 3600000): Promise<any | null> {
    try {
      const cache = await this.getCache();
      const cached = cache[key];
      
      if (cached && (Date.now() - cached.timestamp) < maxAge) {
        return cached.data;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting cached data:', error);
      return null;
    }
  }

  private static async getCache(): Promise<any> {
    try {
      const cacheJson = await AsyncStorage.getItem(this.CACHE_KEY);
      return cacheJson ? JSON.parse(cacheJson) : {};
    } catch (error) {
      console.error('Error getting cache:', error);
      return {};
    }
  }

  static async clearCache(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.CACHE_KEY);
      console.log('Cache cleared');
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }

  static async getQueueSize(): Promise<number> {
    try {
      const queue = await this.getQueue();
      return queue.length;
    } catch (error) {
      return 0;
    }
  }

  static async clearQueue(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.QUEUE_KEY);
      console.log('Queue cleared');
    } catch (error) {
      console.error('Error clearing queue:', error);
    }
  }

  static async downloadForOffline(url: string, fileName: string): Promise<string | null> {
    try {
      const downloadDest = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      
      const download = RNFS.downloadFile({
        fromUrl: url,
        toFile: downloadDest,
      });

      const result = await download.promise;
      
      if (result.statusCode === 200) {
        console.log(`File downloaded: ${fileName}`);
        return downloadDest;
      }
      
      return null;
    } catch (error) {
      console.error('Error downloading file:', error);
      return null;
    }
  }

  static async getOfflineFiles(): Promise<string[]> {
    try {
      const files = await RNFS.readDir(RNFS.DocumentDirectoryPath);
      return files.map(file => file.name);
    } catch (error) {
      console.error('Error getting offline files:', error);
      return [];
    }
  }

  static async deleteOfflineFile(fileName: string): Promise<boolean> {
    try {
      const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      await RNFS.unlink(filePath);
      console.log(`File deleted: ${fileName}`);
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  }
}