import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import './styles/login.css';
import styles from './styles/loginStyles';
import { login, isAuthenticated, verifyToken } from '../services/authService';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  // Check if already authenticated on mount
  useEffect(() => {
    checkExistingAuth();
  }, []);

  const checkExistingAuth = async () => {
    const authenticated = await isAuthenticated();
    if (authenticated) {
      // Verify token is still valid
      const result = await verifyToken();
      if (result.success) {
        router.replace('/tasks');
      }
    }
  };

  const handleSignIn = async () => {
    setErrorMessage('');
    
    if (!email || !password) {
      setErrorMessage('Please enter email and password');
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await login(email, password);
      
      if (result.success) {
        router.replace('/tasks');
      } else {
        setErrorMessage(result.error || 'Login failed. Please try again.');
        Alert.alert('Login Failed', result.error || 'Invalid credentials');
      }
    } catch (error) {
      setErrorMessage('Network error. Please check your connection.');
      Alert.alert('Error', 'Could not connect to server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="construct-outline" size={52} color="#FF6B35" />
          </View>
          <Text style={styles.title}>Contractor Portal</Text>
          <Text style={styles.subtitle}>Sign in to view your assigned repair tasks</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="contractor@example.com"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="password"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
          </View>

          {errorMessage ? (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={16} color="#EF4444" />
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}
        </View>

        <TouchableOpacity 
          style={[styles.signInButton, isLoading && styles.signInButtonDisabled]} 
          onPress={handleSignIn}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <>
              <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.signInText}>Sign In</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
