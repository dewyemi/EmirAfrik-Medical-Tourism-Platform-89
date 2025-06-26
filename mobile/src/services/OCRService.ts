import TextRecognition from 'react-native-text-recognition';
import { Platform } from 'react-native';

export class OCRService {
  static async extractText(imageUri: string): Promise<string> {
    try {
      console.log('Starting OCR text extraction for:', imageUri);
      
      const result = await TextRecognition.recognize(imageUri);
      
      if (result && result.length > 0) {
        // Combine all recognized text blocks
        const extractedText = result.map(block => block.text).join('\n');
        console.log('OCR extraction successful, text length:', extractedText.length);
        return extractedText;
      }
      
      return '';
    } catch (error) {
      console.error('OCR extraction failed:', error);
      throw new Error('Failed to extract text from image');
    }
  }

  static async extractTextWithBounds(imageUri: string): Promise<any[]> {
    try {
      console.log('Starting OCR text extraction with bounds for:', imageUri);
      
      const result = await TextRecognition.recognize(imageUri);
      
      if (result && result.length > 0) {
        return result.map(block => ({
          text: block.text,
          bounds: block.bounds,
          confidence: block.confidence || 1.0,
        }));
      }
      
      return [];
    } catch (error) {
      console.error('OCR extraction with bounds failed:', error);
      throw new Error('Failed to extract text with bounds from image');
    }
  }

  static async extractSpecificData(imageUri: string, dataType: 'passport' | 'id' | 'medical'): Promise<any> {
    try {
      const extractedText = await this.extractText(imageUri);
      
      switch (dataType) {
        case 'passport':
          return this.parsePassportData(extractedText);
        case 'id':
          return this.parseIdData(extractedText);
        case 'medical':
          return this.parseMedicalData(extractedText);
        default:
          return { text: extractedText };
      }
    } catch (error) {
      console.error('Error extracting specific data:', error);
      throw error;
    }
  }

  private static parsePassportData(text: string): any {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const passportData: any = {};

    for (const line of lines) {
      // Look for passport number (usually alphanumeric, 6-10 characters)
      const passportMatch = line.match(/[A-Z]{1,2}[0-9]{6,8}/);
      if (passportMatch && !passportData.passportNumber) {
        passportData.passportNumber = passportMatch[0];
      }

      // Look for dates (DD/MM/YYYY or DD-MM-YYYY)
      const dateMatch = line.match(/\d{2}[\/\-]\d{2}[\/\-]\d{4}/);
      if (dateMatch) {
        if (line.toLowerCase().includes('exp') || line.toLowerCase().includes('valid')) {
          passportData.expiryDate = dateMatch[0];
        } else if (line.toLowerCase().includes('birth') || line.toLowerCase().includes('dob')) {
          passportData.dateOfBirth = dateMatch[0];
        } else if (line.toLowerCase().includes('issue')) {
          passportData.issueDate = dateMatch[0];
        }
      }

      // Look for country codes
      const countryMatch = line.match(/[A-Z]{3}/);
      if (countryMatch && line.length < 20) {
        passportData.countryCode = countryMatch[0];
      }

      // Look for names (usually in capital letters)
      if (line.match(/^[A-Z\s]+$/) && line.length > 3 && line.length < 50) {
        if (!passportData.name) {
          passportData.name = line;
        }
      }
    }

    return {
      type: 'passport',
      data: passportData,
      rawText: text,
    };
  }

  private static parseIdData(text: string): any {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const idData: any = {};

    for (const line of lines) {
      // Look for ID number
      const idMatch = line.match(/\d{10,}/);
      if (idMatch && !idData.idNumber) {
        idData.idNumber = idMatch[0];
      }

      // Look for dates
      const dateMatch = line.match(/\d{2}[\/\-]\d{2}[\/\-]\d{4}/);
      if (dateMatch) {
        if (line.toLowerCase().includes('exp') || line.toLowerCase().includes('valid')) {
          idData.expiryDate = dateMatch[0];
        } else if (line.toLowerCase().includes('birth') || line.toLowerCase().includes('dob')) {
          idData.dateOfBirth = dateMatch[0];
        }
      }

      // Look for names
      if (line.match(/^[A-Z\s]+$/) && line.length > 3 && line.length < 50) {
        if (!idData.name) {
          idData.name = line;
        }
      }
    }

    return {
      type: 'id',
      data: idData,
      rawText: text,
    };
  }

  private static parseMedicalData(text: string): any {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const medicalData: any = {
      medications: [],
      conditions: [],
      dates: [],
      values: [],
    };

    for (const line of lines) {
      // Look for medication names (common patterns)
      const medicationPatterns = [
        /\b\w+cillin\b/i,
        /\b\w+mycin\b/i,
        /\b\w+prazole\b/i,
        /\b\w+statin\b/i,
        /\bmg\b|\bml\b|\btablets?\b|\bcapsules?\b/i,
      ];

      for (const pattern of medicationPatterns) {
        if (pattern.test(line)) {
          medicalData.medications.push(line);
          break;
        }
      }

      // Look for medical conditions
      const conditionKeywords = [
        'diabetes', 'hypertension', 'asthma', 'allergy', 'allergic',
        'surgery', 'operation', 'treatment', 'diagnosis', 'condition',
      ];

      for (const keyword of conditionKeywords) {
        if (line.toLowerCase().includes(keyword)) {
          medicalData.conditions.push(line);
          break;
        }
      }

      // Look for dates
      const dateMatch = line.match(/\d{2}[\/\-]\d{2}[\/\-]\d{4}/);
      if (dateMatch) {
        medicalData.dates.push({
          date: dateMatch[0],
          context: line,
        });
      }

      // Look for numerical values (lab results, vitals)
      const valueMatch = line.match(/\d+\.?\d*\s*(mg|ml|mmHg|bpm|%)/i);
      if (valueMatch) {
        medicalData.values.push({
          value: valueMatch[0],
          context: line,
        });
      }
    }

    return {
      type: 'medical',
      data: medicalData,
      rawText: text,
    };
  }

  static async validateDocumentType(imageUri: string): Promise<'passport' | 'id' | 'medical' | 'other'> {
    try {
      const text = await this.extractText(imageUri);
      const lowerText = text.toLowerCase();

      // Check for passport indicators
      if (lowerText.includes('passport') || lowerText.includes('republic') || 
          text.match(/[A-Z]{1,2}[0-9]{6,8}/)) {
        return 'passport';
      }

      // Check for ID indicators
      if (lowerText.includes('identity') || lowerText.includes('national id') ||
          lowerText.includes('citizen') || text.match(/\d{10,15}/)) {
        return 'id';
      }

      // Check for medical indicators
      if (lowerText.includes('medical') || lowerText.includes('hospital') ||
          lowerText.includes('doctor') || lowerText.includes('patient') ||
          lowerText.includes('diagnosis') || lowerText.includes('treatment')) {
        return 'medical';
      }

      return 'other';
    } catch (error) {
      console.error('Error validating document type:', error);
      return 'other';
    }
  }

  static async enhanceImageForOCR(imageUri: string): Promise<string> {
    try {
      // This would implement image enhancement techniques
      // For now, return the original image URI
      // In a full implementation, you might use image processing libraries
      // to improve contrast, remove noise, etc.
      
      console.log('Image enhancement not implemented, using original image');
      return imageUri;
    } catch (error) {
      console.error('Error enhancing image:', error);
      return imageUri;
    }
  }

  static getConfidenceScore(text: string): number {
    // Simple confidence scoring based on text characteristics
    let score = 0.5; // Base score

    // Increase score for longer text
    if (text.length > 100) score += 0.2;
    if (text.length > 500) score += 0.1;

    // Increase score for structured data
    if (text.match(/\d{2}[\/\-]\d{2}[\/\-]\d{4}/)) score += 0.1; // Dates
    if (text.match(/[A-Z]{2,}\d+/)) score += 0.1; // ID patterns
    if (text.match(/\b[A-Z][a-z]+\s+[A-Z][a-z]+\b/)) score += 0.1; // Names

    // Decrease score for very short or very long text
    if (text.length < 10) score -= 0.3;
    if (text.length > 2000) score -= 0.1;

    return Math.max(0, Math.min(1, score));
  }
}