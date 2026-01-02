import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import styles from './styles/taskDetailsStyles';
import { getJobDetails, transformJobToTask } from '../services/jobsService';

export default function TaskDetailsScreen() {
  const router = useRouter();
  const { id, dbId, latitude, longitude, priority, location, dueDate, totalPotholes, totalPatchy } = useLocalSearchParams();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTaskDetails();
  }, [id]);

  const loadTaskDetails = async () => {
    // Use passed params if available
    if (latitude && longitude) {
      setTask({
        id: id,
        dbId: dbId,
        status: 'Assigned',
        priority: priority || 'Medium',
        address: location || 'Location pending',
        dueDate: (typeof dueDate === 'string' ? dueDate : Array.isArray(dueDate) ? dueDate[0] : '') || '',
        coordinates: `${latitude}, ${longitude}`,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        assignedDate: new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        assignedTime: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        totalPotholes: parseInt(totalPotholes) || 0,
        totalPatchy: parseInt(totalPatchy) || 0,
      });
      setIsLoading(false);
      return;
    }

    // Fetch from API
    try {
      const result = await getJobDetails(dbId || id);
      if (result.success && result.data.job) {
        const transformedTask = transformJobToTask(result.data.job);
        setTask({
          ...transformedTask,
          address: transformedTask.location,
          coordinates: `${transformedTask.latitude}, ${transformedTask.longitude}`,
          assignedDate: transformedTask.date,
          assignedTime: transformedTask.time,
        });
      } else {
        // No task found
        setTask(null);
      }
    } catch (error) {
      console.error('Load task details error:', error);
      setTask(null);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Loading task details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!task) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={64} color="#EF4444" />
          <Text style={styles.errorText}>Task not found</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backLinkText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ---------- COLORS ----------
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return { bg: '#FFE5E5', text: '#FF4444', icon: 'warning' };
      case 'Medium':
        return { bg: '#FFF4E5', text: '#FF8800', icon: 'time' };
      default:
        return { bg: '#E5F5E5', text: '#44AA44', icon: 'time' };
    }
  };

  const getStatusColor = () => ({
    bg: '#E5F0FF',
    text: '#0066FF',
    dot: '#0066FF',
  });

  const priorityStyle = getPriorityColor(task.priority);
  const statusStyle = getStatusColor();

  // ---------- MAP ----------
  const openGoogleMaps = () => {
    const [lat, lng] = task.coordinates.split(',');
    Linking.openURL(`google.navigation:q=${lat},${lng}`);
  };

  // ---------- START WORK (🔥 CRITICAL) ----------
  const handleStartWork = () => {
    router.replace({
      pathname: '/tasks',
      params: {
        taskId: task.id,
        dbId: task.dbId,
        preWorkPhoto: '', // optional if no photo yet
        action: 'START_WORK', // TasksScreen will handle status update
      },
    });
  };

  const isPendingVerification =
    task?.awaitingApproval ||
    task?.backendStatus === 'pending_verification' ||
    task?.status === 'Pending Verification';

  const isCompleted = task?.status === 'Completed';

  const startWorkButtonLabel = isPendingVerification
    ? 'Pending Verification'
    : isCompleted
      ? 'Completed'
      : task?.status === 'In Progress'
        ? 'Continue Work'
        : 'Start Work';

  const startWorkButtonDisabled = isPendingVerification || isCompleted;


  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#11181C" />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.taskId}>{task.id}</Text>
          <Text style={styles.headerSubtitle}>Task Details</Text>
        </View>
      </View>

      <View style={styles.underline1} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* CARD */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
              <View style={[styles.statusDot, { backgroundColor: statusStyle.dot }]} />
              <Text style={[styles.statusText, { color: statusStyle.text }]}>
                {task.status}
              </Text>
            </View>

            <View style={[styles.priorityBadge, { backgroundColor: priorityStyle.bg }]}>
              <Ionicons
                name={priorityStyle.icon === 'warning' ? 'warning' : 'time-outline'}
                size={14}
                color={priorityStyle.text}
              />
              <Text style={[styles.priorityText, { color: priorityStyle.text }]}>
                {task.priority}
              </Text>
            </View>
          </View>

          {/* LOCATION */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.iconCircle}>
                <Ionicons name="location" size={20} color="#FF6B35" />
              </View>
              <Text style={styles.sectionLabel}>Location</Text>
            </View>
            <Text style={styles.sectionValue}>{task.address}</Text>
            <Text style={styles.sectionSubValue}>{task.coordinates}</Text>
          </View>

          {/* TIME */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.iconCircle}>
                <Ionicons name="time-outline" size={20} color="#FF6B35" />
              </View>
              <Text style={styles.sectionLabel}>Assigned Time</Text>
            </View>
            <Text style={styles.sectionValue}>{task.assignedDate}</Text>
            <Text style={styles.sectionSubValue}>{task.assignedTime}</Text>
          </View>

          {!!task.dueDate && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.iconCircle}>
                  <Ionicons name="calendar-outline" size={20} color="#FF6B35" />
                </View>
                <Text style={styles.sectionLabel}>Due Date</Text>
              </View>
              <Text style={styles.sectionValue}>{task.dueDate}</Text>
            </View>
          )}

          {!!task.remarks && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.iconCircle}>
                  <Ionicons name="chatbubble-ellipses" size={20} color="#FF6B35" />
                </View>
                <Text style={styles.sectionLabel}>Admin Remarks</Text>
              </View>
              <Text style={styles.sectionValue}>{task.remarks}</Text>
            </View>
          )}

          {/* PROOF PHOTOS */}
          {(!!task.preWorkPhotoUrl || !!task.postWorkPhotoUrl) && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.iconCircle}>
                  <Ionicons name="image" size={20} color="#FF6B35" />
                </View>
                <Text style={styles.sectionLabel}>Work Photos</Text>
              </View>

              <View style={styles.proofGrid}>
                {!!task.preWorkPhotoUrl && (
                  <View style={styles.proofItem}>
                    <Text style={styles.proofLabel}>Pre-Work</Text>
                    <Image source={{ uri: task.preWorkPhotoUrl }} style={styles.proofImage} />
                  </View>
                )}

                {!!task.postWorkPhotoUrl && (
                  <View style={styles.proofItem}>
                    <Text style={styles.proofLabel}>Post-Work</Text>
                    <Image source={{ uri: task.postWorkPhotoUrl }} style={styles.proofImage} />
                  </View>
                )}
              </View>
            </View>
          )}

          {/* DAMAGE INFO */}
          {(task.totalPotholes > 0 || task.totalPatchy > 0) && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.iconCircle}>
                  <Ionicons name="warning" size={20} color="#FF6B35" />
                </View>
                <Text style={styles.sectionLabel}>Damage Report</Text>
              </View>
              <View style={styles.damageRow}>
                <View style={styles.damageBoxPothole}>
                  <Text style={styles.damageCount}>{task.totalPotholes || 0}</Text>
                  <Text style={styles.damageLabel}>Potholes</Text>
                </View>
                <View style={styles.damageBoxPatchy}>
                  <Text style={[styles.damageCount, { color: '#6366F1' }]}>{task.totalPatchy || 0}</Text>
                  <Text style={styles.damageLabel}>Patchy Areas</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* MAP */}
        <View
          style={{
            height: 200,
            width: '100%',
            borderRadius: 20,
            overflow: 'hidden',
            marginBottom: 24,
          }}
        >
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: parseFloat(task.coordinates.split(',')[0]),
              longitude: parseFloat(task.coordinates.split(',')[1]),
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: parseFloat(task.coordinates.split(',')[0]),
                longitude: parseFloat(task.coordinates.split(',')[1]),
              }}
            />
          </MapView>
        </View>

        {/* MAP BUTTON */}
        <TouchableOpacity style={styles.mapsButton} onPress={openGoogleMaps}>
          <Ionicons name="navigate" size={20} color="#fff" />
          <Text style={styles.buttonText1}>Navigate in Google Maps</Text>
        </TouchableOpacity>

        {/* START / CONTINUE (hidden while Pending Verification) */}
        {!isPendingVerification && !isCompleted && (
          <TouchableOpacity
            style={styles.startWorkButton}
            onPress={handleStartWork}
          >
            <Ionicons name="play" size={20} color="#000" />
            <Text style={styles.buttonText2}>{startWorkButtonLabel}</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
