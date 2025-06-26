import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { Card, Button, ProgressBar, FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DocumentPicker from 'react-native-document-picker';
import { launchCamera, launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

import { DocumentService } from '../../services/DocumentService';
import { OCRService } from '../../services/OCRService';
import { useOffline } from '../../context/OfflineContext';

interface DocumentCategory {
  id: string;
  title: string;
  required: boolean;
  documents: Document[];
  progress: number;
}

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'uploaded' | 'verified' | 'rejected';
  required: boolean;
  file?: any;
  uploadedAt?: string;
}

const DocumentsScreen: React.FC = () => {
  const { isOffline, queueAction } = useOffline();
  const [categories, setCategories] = useState<DocumentCategory[]>([]);
  const [uploading, setUploading] = useState(false);
  const [scanningText, setScanningText] = useState(false);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const data = await DocumentService.getDocumentCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error loading documents:', error);
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'EMIRAFRIK needs access to your camera to scan documents.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const showDocumentPicker = () => {
    Alert.alert(
      'Add Document',
      'Choose how you want to add your document',
      [
        { text: 'Take Photo', onPress: () => openCamera() },
        { text: 'Choose from Gallery', onPress: () => openGallery() },
        { text: 'Select File', onPress: () => pickDocument() },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Camera permission is required to scan documents.');
      return;
    }

    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: false,
      },
      handleImageResponse
    );
  };

  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: false,
      },
      handleImageResponse
    );
  };

  const handleImageResponse = async (response: ImagePickerResponse) => {
    if (response.didCancel || response.errorMessage) {
      return;
    }

    if (response.assets && response.assets[0]) {
      const asset = response.assets[0];
      
      // Option to perform OCR on the image
      Alert.alert(
        'Document Scanned',
        'Would you like to extract text from this document?',
        [
          { 
            text: 'Extract Text', 
            onPress: () => performOCR(asset.uri || '') 
          },
          { 
            text: 'Upload as Image', 
            onPress: () => uploadDocument(asset) 
          },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
    }
  };

  const performOCR = async (imageUri: string) => {
    try {
      setScanningText(true);
      const extractedText = await OCRService.extractText(imageUri);
      
      Alert.alert(
        'Text Extracted',
        `Extracted text: ${extractedText.substring(0, 100)}...`,
        [
          { text: 'Save Text', onPress: () => saveExtractedText(extractedText) },
          { text: 'Upload Image', onPress: () => uploadDocument({ uri: imageUri }) },
        ]
      );
    } catch (error) {
      console.error('OCR Error:', error);
      Alert.alert('Error', 'Failed to extract text from image');
    } finally {
      setScanningText(false);
    }
  };

  const saveExtractedText = async (text: string) => {
    try {
      const fileName = `extracted_text_${Date.now()}.txt`;
      const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      
      await RNFS.writeFile(filePath, text, 'utf8');
      
      Alert.alert(
        'Text Saved',
        'Extracted text has been saved. Would you like to upload it?',
        [
          { text: 'Upload', onPress: () => uploadDocument({ uri: filePath, type: 'text/plain' }) },
          { text: 'Later', style: 'cancel' },
        ]
      );
    } catch (error) {
      console.error('Error saving text:', error);
      Alert.alert('Error', 'Failed to save extracted text');
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: false,
      });

      if (result && result[0]) {
        uploadDocument(result[0]);
      }
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        console.error('Document picker error:', error);
        Alert.alert('Error', 'Failed to pick document');
      }
    }
  };

  const uploadDocument = async (document: any) => {
    try {
      setUploading(true);

      if (isOffline) {
        // Queue for upload when online
        queueAction('uploadDocument', { document });
        Alert.alert('Queued', 'Document will be uploaded when you\'re back online');
        return;
      }

      const result = await DocumentService.uploadDocument(document);
      
      if (result.success) {
        Alert.alert('Success', 'Document uploaded successfully');
        loadDocuments(); // Refresh the list
      } else {
        Alert.alert('Error', result.message || 'Failed to upload document');
      }
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Failed to upload document');
    } finally {
      setUploading(false);
    }
  };

  const shareDocument = async (document: Document) => {
    try {
      if (!document.file) {
        Alert.alert('Error', 'Document file not available');
        return;
      }

      const options = {
        title: 'Share Document',
        url: document.file.uri || document.file.url,
        type: document.file.type || 'application/pdf',
      };

      await Share.open(options);
    } catch (error) {
      console.error('Share error:', error);
      Alert.alert('Error', 'Failed to share document');
    }
  };

  const deleteDocument = (documentId: string) => {
    Alert.alert(
      'Delete Document',
      'Are you sure you want to delete this document?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              await DocumentService.deleteDocument(documentId);
              loadDocuments();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete document');
            }
          }
        },
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return '#10B981';
      case 'uploaded': return '#3B82F6';
      case 'rejected': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return 'verified';
      case 'uploaded': return 'cloud-done';
      case 'rejected': return 'error';
      default: return 'pending';
    }
  };

  const overallProgress = categories.length > 0 
    ? categories.reduce((sum, cat) => sum + cat.progress, 0) / categories.length 
    : 0;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Documents</Text>
        <Text style={styles.headerSubtitle}>Upload and manage your medical documents</Text>
        
        {/* Overall Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressLabel}>Overall Progress</Text>
            <Text style={styles.progressText}>{Math.round(overallProgress * 100)}%</Text>
          </View>
          <ProgressBar
            progress={overallProgress}
            color="#059669"
            style={styles.progressBar}
          />
        </View>
      </View>

      {/* Document Categories */}
      <ScrollView style={styles.scrollView}>
        {categories.map((category) => (
          <Card key={category.id} style={styles.categoryCard}>
            <Card.Content>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                {category.required && (
                  <Text style={styles.requiredBadge}>Required</Text>
                )}
              </View>
              
              <View style={styles.categoryProgress}>
                <ProgressBar
                  progress={category.progress}
                  color="#059669"
                  style={styles.categoryProgressBar}
                />
                <Text style={styles.categoryProgressText}>
                  {Math.round(category.progress * 100)}% Complete
                </Text>
              </View>

              {/* Documents in Category */}
              {category.documents.map((document) => (
                <View key={document.id} style={styles.documentItem}>
                  <View style={styles.documentInfo}>
                    <View style={styles.documentHeader}>
                      <Icon
                        name={getStatusIcon(document.status)}
                        size={20}
                        color={getStatusColor(document.status)}
                      />
                      <Text style={styles.documentName}>{document.name}</Text>
                      {document.required && (
                        <Icon name="star" size={16} color="#F59E0B" />
                      )}
                    </View>
                    
                    <Text style={[styles.documentStatus, { color: getStatusColor(document.status) }]}>
                      {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                    </Text>
                    
                    {document.uploadedAt && (
                      <Text style={styles.uploadDate}>
                        Uploaded: {new Date(document.uploadedAt).toLocaleDateString()}
                      </Text>
                    )}
                  </View>

                  <View style={styles.documentActions}>
                    {document.status === 'pending' ? (
                      <TouchableOpacity
                        style={styles.uploadButton}
                        onPress={showDocumentPicker}
                      >
                        <Icon name="cloud-upload" size={20} color="#FFF" />
                      </TouchableOpacity>
                    ) : (
                      <View style={styles.actionButtons}>
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={() => shareDocument(document)}
                        >
                          <Icon name="share" size={16} color="#6B7280" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={() => deleteDocument(document.id)}
                        >
                          <Icon name="delete" size={16} color="#EF4444" />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </Card.Content>
          </Card>
        ))}

        {/* Offline Notice */}
        {isOffline && (
          <Card style={styles.offlineCard}>
            <Card.Content>
              <View style={styles.offlineHeader}>
                <Icon name="cloud-off" size={24} color="#F59E0B" />
                <Text style={styles.offlineTitle}>Offline Mode</Text>
              </View>
              <Text style={styles.offlineText}>
                You can still add documents. They will be uploaded automatically when you're back online.
              </Text>
            </Card.Content>
          </Card>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        style={styles.fab}
        icon="add"
        onPress={showDocumentPicker}
        loading={uploading || scanningText}
        disabled={uploading || scanningText}
      />

      {/* Status Messages */}
      {uploading && (
        <View style={styles.statusMessage}>
          <Text style={styles.statusText}>Uploading document...</Text>
        </View>
      )}

      {scanningText && (
        <View style={styles.statusMessage}>
          <Text style={styles.statusText}>Extracting text...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  progressContainer: {
    marginTop: 16,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  categoryCard: {
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  requiredBadge: {
    backgroundColor: '#FEE2E2',
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryProgress: {
    marginBottom: 16,
  },
  categoryProgressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 8,
  },
  categoryProgressText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'right',
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  documentInfo: {
    flex: 1,
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  documentName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginLeft: 8,
    flex: 1,
  },
  documentStatus: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 28,
  },
  uploadDate: {
    fontSize: 11,
    color: '#9CA3AF',
    marginLeft: 28,
    marginTop: 2,
  },
  documentActions: {
    marginLeft: 12,
  },
  uploadButton: {
    backgroundColor: '#059669',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  offlineCard: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
    borderWidth: 1,
    marginBottom: 16,
  },
  offlineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  offlineTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#92400E',
    marginLeft: 8,
  },
  offlineText: {
    fontSize: 14,
    color: '#92400E',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#059669',
  },
  statusMessage: {
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
    backgroundColor: '#1F2937',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  statusText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default DocumentsScreen;