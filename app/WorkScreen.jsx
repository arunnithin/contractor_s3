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
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles/workScreenStyles';
import { completeJob, uploadWorkPhoto } from '../services/jobsService';

export default function WorkScreen() {
  const router = useRouter();
  const { id, dbId, preWorkPhoto: savedPrePhoto } = useLocalSearchParams();

  const [preWorkPhoto, setPreWorkPhoto] = useState(savedPrePhoto || null);
  const [postWorkPhoto, setPostWorkPhoto] = useState(null);
  const [workStarted, setWorkStarted] = useState(!!savedPrePhoto);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

        // Upload pre-work photo to backend and store URL in DB
        try {
          const uploadRes = await uploadWorkPhoto(dbId || id, uri, 'pre');
          const photoUrl = uploadRes?.data?.photoUrl || uploadRes?.data?.url || uploadRes?.data?.fileUrl || uploadRes?.data?.path;

          // Navigate back and let TasksScreen set status to In Progress
          setTimeout(() => {
            router.replace({
              pathname: '/tasks',
              params: { taskId: id, dbId: dbId || id, preWorkPhoto: photoUrl || uri, action: 'START_WORK' },
            });
          }, 50);
        } catch (e) {
          console.error('Pre photo upload failed:', e);
          Alert.alert('Upload failed', 'Could not upload pre-work photo. Please try again.');
        }
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
  const finishWork = async () => {
    if (!preWorkPhoto || !postWorkPhoto) {
      Alert.alert('Missing Photos', 'Please upload both photos.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const jobId = dbId || id;

      // Ensure post-work photo is uploaded and persisted
      const postUploadRes = await uploadWorkPhoto(jobId, postWorkPhoto, 'post');
      const postUrl = postUploadRes?.data?.photoUrl || postUploadRes?.data?.url || postUploadRes?.data?.fileUrl || postUploadRes?.data?.path;

      // If preWorkPhoto is still a local URI, upload it too (best-effort)
      let preUrl = preWorkPhoto;
      if (preWorkPhoto && String(preWorkPhoto).startsWith('file:')) {
        try {
          const preUploadRes = await uploadWorkPhoto(jobId, preWorkPhoto, 'pre');
          preUrl = preUploadRes?.data?.photoUrl || preUploadRes?.data?.url || preUploadRes?.data?.fileUrl || preUploadRes?.data?.path || preWorkPhoto;
        } catch (_) {
          // keep local URI in notes if upload fails
        }
      }

      const result = await completeJob(
        jobId,
        postUrl || postWorkPhoto,
        `Pre-work photo: ${preUrl}`
      );

      if (result.success) {
        Alert.alert('Success', 'Work completed successfully!', [
          {
            text: 'OK',
            onPress: () => {
              router.replace({
                pathname: '/tasks',
                params: { taskId: id, dbId: dbId || id, action: 'COMPLETE_WORK' },
              });
            },
          },
        ]);
      } else {
        Alert.alert('Error', result.error || 'Failed to complete work. Please try again.');
      }
    } catch (error) {
      console.error('Complete work error:', error);
      Alert.alert('Error', 'Failed to complete work. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
            preWorkPhoto && postWorkPhoto && !isSubmitting
              ? { backgroundColor: '#FF6B35' }
              : { backgroundColor: '#F0F0F0' },
          ]}
          disabled={!preWorkPhoto || !postWorkPhoto || isSubmitting}
          onPress={finishWork}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text
              style={[
                styles.finishButtonText,
                preWorkPhoto && postWorkPhoto ? { color: '#fff' } : { color: '#B0B0B0' },
              ]}
            >
              Finish Work
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
