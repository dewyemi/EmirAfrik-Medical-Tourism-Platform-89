import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { OfflineService } from '../services/OfflineService';

interface OfflineContextType {
  isOffline: boolean;
  queueSize: number;
  syncInProgress: boolean;
  queueAction: (type: string, data: any) => Promise<void>;
  syncData: () => Promise<void>;
  clearQueue: () => Promise<void>;
  getCachedData: (key: string, maxAge?: number) => Promise<any>;
  cacheData: (key: string, data: any) => Promise<void>;
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

export const useOffline = (): OfflineContextType => {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  return context;
};

interface OfflineProviderProps {
  children: ReactNode;
}

export const OfflineProvider: React.FC<OfflineProviderProps> = ({ children }) => {
  const [isOffline, setIsOffline] = useState(false);
  const [queueSize, setQueueSize] = useState(0);
  const [syncInProgress, setSyncInProgress] = useState(false);

  useEffect(() => {
    initializeOfflineService();
    setupNetworkListener();
    updateQueueSize();
  }, []);

  const initializeOfflineService = async () => {
    try {
      await OfflineService.initialize();
      console.log('OfflineService initialized successfully');
    } catch (error) {
      console.error('Failed to initialize OfflineService:', error);
    }
  };

  const setupNetworkListener = () => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const wasOffline = isOffline;
      const nowOffline = !state.isConnected;
      
      setIsOffline(nowOffline);
      
      // If we just came back online, sync data
      if (wasOffline && !nowOffline) {
        console.log('Network restored, syncing data...');
        syncData();
      }
      
      console.log('Network status changed:', {
        isConnected: state.isConnected,
        type: state.type,
        isInternetReachable: state.isInternetReachable,
      });
    });

    return unsubscribe;
  };

  const updateQueueSize = async () => {
    try {
      const size = await OfflineService.getQueueSize();
      setQueueSize(size);
    } catch (error) {
      console.error('Error getting queue size:', error);
    }
  };

  const queueAction = async (type: string, data: any): Promise<void> => {
    try {
      await OfflineService.queueAction(type, data);
      await updateQueueSize();
      console.log(`Queued action: ${type}`);
    } catch (error) {
      console.error('Error queueing action:', error);
      throw error;
    }
  };

  const syncData = async (): Promise<void> => {
    if (syncInProgress) {
      console.log('Sync already in progress, skipping...');
      return;
    }

    try {
      setSyncInProgress(true);
      console.log('Starting data synchronization...');
      
      // Check if we're actually online
      const networkState = await NetInfo.fetch();
      if (!networkState.isConnected) {
        console.log('No network connection, skipping sync');
        return;
      }

      // Process the offline queue
      await OfflineService.processQueue();
      await updateQueueSize();
      
      console.log('Data synchronization completed');
    } catch (error) {
      console.error('Error during data synchronization:', error);
    } finally {
      setSyncInProgress(false);
    }
  };

  const clearQueue = async (): Promise<void> => {
    try {
      await OfflineService.clearQueue();
      await updateQueueSize();
      console.log('Offline queue cleared');
    } catch (error) {
      console.error('Error clearing queue:', error);
      throw error;
    }
  };

  const getCachedData = async (key: string, maxAge?: number): Promise<any> => {
    try {
      return await OfflineService.getCachedData(key, maxAge);
    } catch (error) {
      console.error('Error getting cached data:', error);
      return null;
    }
  };

  const cacheData = async (key: string, data: any): Promise<void> => {
    try {
      await OfflineService.cacheData(key, data);
      console.log(`Data cached with key: ${key}`);
    } catch (error) {
      console.error('Error caching data:', error);
      throw error;
    }
  };

  const value: OfflineContextType = {
    isOffline,
    queueSize,
    syncInProgress,
    queueAction,
    syncData,
    clearQueue,
    getCachedData,
    cacheData,
  };

  return (
    <OfflineContext.Provider value={value}>
      {children}
    </OfflineContext.Provider>
  );
};