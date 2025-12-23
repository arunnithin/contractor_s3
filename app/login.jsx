import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import './styles/login.css';
import styles from './styles/loginStyles';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignIn = () => {
    // Demo mode - accept any credentials
    if (email && password) {
      router.replace('/tasks');
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
        </View>

        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.demoBox}>
          <Ionicons name="construct-outline" size={16} color="#666" />
          <Text style={styles.demoText}>Demo: Use any credentials to login</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
