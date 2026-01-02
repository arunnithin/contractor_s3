import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API Configuration - Change this to your server IP
export const API_BASE_URL = Platform.OS === 'web' 
  ? 'http://localhost:5000/api'  // For web
  : 'http://192.168.43.67:5000/api';  // For mobile devices - Update this IP to match your server

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@contractor_auth_token',
  USER_DATA: '@contractor_user_data',
  CONTRACTOR_DATA: '@contractor_data',
};

// Default headers for API requests
export const getHeaders = async (includeAuth = true) => {
  const headers = {
    'Content-Type': 'application/json',
    'X-App-Version': '1.0.0',
    'X-Platform': Platform.OS,
  };

  if (includeAuth) {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

// API request helper with error handling
export const apiRequest = async (endpoint, options = {}) => {
  const { method = 'GET', body, includeAuth = true } = options;
  
  try {
    const headers = await getHeaders(includeAuth);
    
    const config = {
      method,
      headers,
    };

    if (body && method !== 'GET') {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return { success: true, data };
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    return { success: false, error: error.message };
  }
};
