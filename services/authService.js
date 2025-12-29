import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, STORAGE_KEYS, getHeaders } from './config';

/**
 * Login contractor with email and password
 */
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Verify user is a contractor
    if (data.user?.role !== 'contractor') {
      throw new Error('Access denied. This app is for contractors only.');
    }

    // Store auth token and user data
    await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token);
    await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data.user));

    return { success: true, user: data.user, token: data.token };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Logout contractor - clear stored data
 */
export const logout = async () => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.AUTH_TOKEN,
      STORAGE_KEYS.USER_DATA,
      STORAGE_KEYS.CONTRACTOR_DATA,
    ]);
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = async () => {
  try {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    return !!token;
  } catch (error) {
    return false;
  }
};

/**
 * Get stored user data
 */
export const getStoredUser = async () => {
  try {
    const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    return null;
  }
};

/**
 * Get stored auth token
 */
export const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  } catch (error) {
    return null;
  }
};

/**
 * Verify token is still valid by calling profile endpoint
 */
export const verifyToken = async () => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${API_BASE_URL}/contractor/profile`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      // Token invalid, clear storage
      await logout();
      return { success: false, error: 'Session expired' };
    }

    const data = await response.json();
    return { success: true, contractor: data.contractor };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
