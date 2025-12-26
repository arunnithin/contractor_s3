import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Linking,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import styles from './styles/taskDetailsStyles';

// Mock data (UI only)
const taskDetailsMap = {
  'PH-2024-001': {
    id: 'PH-2024-001',
    status: 'Assigned',
    priority: 'High',
    address: 'MG Road, Near Metro Station',
    coordinates: '12.971600, 77.594600',
    assignedDate: 'Saturday, December 14, 2024',
    assignedTime: '03:00 PM',
  },
};

export default function TaskDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const task = taskDetailsMap[id] || taskDetailsMap['PH-2024-001'];

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
      preWorkPhoto: '', // optional if no photo yet
      action: 'START_WORK', // TasksScreen will handle status update
    },
  });
};


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
                Assigned
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

        {/* START WORK */}
        <TouchableOpacity style={styles.startWorkButton} onPress={handleStartWork}>
          <Ionicons name="play" size={20} color="#000" />
          <Text style={styles.buttonText2}>Start Work</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
