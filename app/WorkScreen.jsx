import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
  BackHandler,
  ActionSheetIOS,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles/workScreenStyles';

export default function WorkScreen() {
  const router = useRouter();
  const { id, preWorkPhoto: savedPrePhoto } = useLocalSearchParams();

  const [preWorkPhoto, setPreWorkPhoto] = useState(savedPrePhoto || null);
  const [postWorkPhoto, setPostWorkPhoto] = useState(null);
  const [workStarted, setWorkStarted] = useState(!!savedPrePhoto);

  // 🔒 BACK → TASKS ALWAYS
  useEffect(() => {
    const backAction = () => {
      router.replace({
        pathname: '/tasks',
        params: {
          taskId: id,
          preWorkPhoto,
          action: 'START_WORK',
        },
      });
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [preWorkPhoto, id]);

  // ⚡ Permissions
  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const mediaStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraStatus.status !== 'granted' || mediaStatus.status !== 'granted') {
        Alert.alert('Permissions Required', 'Camera and gallery permissions are required!');
      }
    })();
  }, []);

  // 📸 PICK IMAGE
  const pickImage = async (source, target) => {
    try {
      let result;
      if (source === 'camera') {
        result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
      } else {
        result = await ImagePicker.launchImageLibraryAsync({ quality: 0.7 });
      }

      if (result.canceled) return;

      const uri = result.assets[0].uri;

      if (target === 'pre') {
        setPreWorkPhoto(uri);
        if (!workStarted) setWorkStarted(true);

        // Use setTimeout to avoid call stack issues
        setTimeout(() => {
          router.replace({
            pathname: '/tasks',
            params: { taskId: id, preWorkPhoto: uri, action: 'START_WORK' },
          });
        }, 50);
      } else {
        setPostWorkPhoto(uri);
      }
    } catch (error) {
      console.log('Image picker error:', error);
      Alert.alert('Error', 'Failed to pick image.');
    }
  };

  const handlePickOption = (target) => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo', 'Choose from Gallery'],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) pickImage('camera', target);
          if (buttonIndex === 2) pickImage('library', target);
        }
      );
    } else {
      Alert.alert(
        'Select Photo',
        'Choose an option',
        [
          { text: 'Take Photo', onPress: () => pickImage('camera', target), color: '#FF6B35' },
          { text: 'Choose from Gallery', onPress: () => pickImage('library', target), color: '#FF6B35' },
          { text: 'Cancel', style: 'cancel', color: '#FF6B35' },
        ],
        { cancelable: true }
      );
    }
  };

  // ✅ FINISH WORK
  const finishWork = () => {
    if (!preWorkPhoto || !postWorkPhoto) {
      Alert.alert('Missing Photos', 'Please upload both photos.');
      return;
    }

    Alert.alert('Success', 'Work completed successfully!', [
      {
        text: 'OK',
        onPress: () => {
          router.replace({
            pathname: '/tasks',
            params: { taskId: id, action: 'COMPLETE_WORK' },
          });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.screenTitle}>Work in Progress</Text>
        <Text style={styles.taskId}>Task ID: {id}</Text>
        <Text style={styles.statusText}>
          Status: {'In Progress'}
        </Text>

        {/* PRE-WORK */}
        <View style={styles.photoSection}>
          <Text style={styles.photoLabel}>Pre-Work Photo</Text>
          <TouchableOpacity style={styles.photoButton} onPress={() => handlePickOption('pre')}>
            {preWorkPhoto ? (
              <Image source={{ uri: preWorkPhoto }} style={styles.photoPreview} />
            ) : (
              <Ionicons name="camera" size={40} color="#FF6B35" />
            )}
          </TouchableOpacity>
        </View>

        {/* POST-WORK */}
        <View style={styles.photoSection}>
          <Text style={styles.photoLabel}>Post-Work Photo</Text>
          <TouchableOpacity style={styles.photoButton} onPress={() => handlePickOption('post')}>
            {postWorkPhoto ? (
              <Image source={{ uri: postWorkPhoto }} style={styles.photoPreview} />
            ) : (
              <Ionicons name="camera" size={40} color="#FF6B35" />
            )}
          </TouchableOpacity>
        </View>

        {/* FINISH BUTTON */}
        <TouchableOpacity
          style={[
            styles.finishButton,
            preWorkPhoto && postWorkPhoto
              ? { backgroundColor: '#FF6B35' }
              : { backgroundColor: '#F0F0F0' },
          ]}
          disabled={!preWorkPhoto || !postWorkPhoto}
          onPress={finishWork}
        >
          <Text
            style={[
              styles.finishButtonText,
              preWorkPhoto && postWorkPhoto ? { color: '#fff' } : { color: '#B0B0B0' },
            ]}
          >
            Finish Work
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
