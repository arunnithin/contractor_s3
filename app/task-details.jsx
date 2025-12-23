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
import './styles/task-details.css';
import styles from './styles/taskDetailsStyles';

const taskDetailsMap = {
  'PH-2024-001': {
    id: 'PH-2024-001',
    status: 'Assigned',
    priority: 'High',
    location: 'MG Road, Near Metro Station',
    address: 'MG Road, Near Metro Station',
    coordinates: '12.971600, 77.594600',
    assignedDate: 'Saturday, December 14, 2024',
    assignedTime: '03:00 PM',
  },
  'PH-2024-002': {
    id: 'PH-2024-002',
    status: 'In Progress',
    priority: 'Medium',
    location: 'Koramangala 5th Block',
    address: 'Koramangala 5th Block',
    coordinates: '12.935200, 77.624500',
    assignedDate: 'Friday, December 13, 2024',
    assignedTime: '07:45 PM',
  },
  'PH-2024-003': {
    id: 'PH-2024-003',
    status: 'Assigned',
    priority: 'Low',
    location: 'Whitefield Main Road',
    address: 'Whitefield Main Road',
    coordinates: '12.969800, 77.749900',
    assignedDate: 'Thursday, December 12, 2024',
    assignedTime: '04:30 PM',
  },
  'PH-2024-004': {
    id: 'PH-2024-004',
    status: 'Assigned',
    priority: 'High',
    location: 'Indiranagar 100 Feet Road',
    address: 'Indiranagar 100 Feet Road',
    coordinates: '12.978400, 77.640800',
    assignedDate: 'Wednesday, December 11, 2024',
    assignedTime: '10:00 AM',
  },
  'PH-2024-005': {
    id: 'PH-2024-005',
    status: 'In Progress',
    priority: 'Medium',
    location: 'BTM Layout 2nd Stage',
    address: 'BTM Layout 2nd Stage',
    coordinates: '12.916600, 77.610100',
    assignedDate: 'Tuesday, December 10, 2024',
    assignedTime: '02:20 PM',
  },
};

export default function TaskDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const task = taskDetailsMap[id || 'PH-2024-001'] || taskDetailsMap['PH-2024-001'];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return { bg: '#FFE5E5', text: '#FF4444', icon: 'warning' };
      case 'Medium':
        return { bg: '#FFF4E5', text: '#FF8800', icon: 'time' };
      case 'Low':
        return { bg: '#E5F5E5', text: '#44AA44', icon: 'time' };
      default:
        return { bg: '#E5F5E5', text: '#44AA44', icon: 'time' };
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Assigned':
        return { bg: '#E5F0FF', text: '#0066FF', dot: '#0066FF' };
      case 'In Progress':
        return { bg: '#FFF4E5', text: '#FF8800', dot: '#FF8800' };
      default:
        return { bg: '#E5F0FF', text: '#0066FF', dot: '#0066FF' };
    }
  };

  const priorityStyle = getPriorityColor(task.priority);
  const statusStyle = getStatusColor(task.status);

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${task.coordinates}`;
    Linking.openURL(url);
  };

  const handleStartWork = () => {
    // Handle start work action
    alert('Work started!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#11181C" />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.taskId}>{task.id}</Text>
          <Text style={styles.headerSubtitle}>Task Details</Text>
        </View>
      </View>
      <View style={styles.underline1}></View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View
              style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}
            >
              <View
                style={[styles.statusDot, { backgroundColor: statusStyle.dot }]}
              />
              <Text style={[styles.statusText, { color: statusStyle.text }]}>
                {task.status}
              </Text>
            </View>

            <View
              style={[styles.priorityBadge, { backgroundColor: priorityStyle.bg }]}
            >
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

        <TouchableOpacity style={styles.mapsButton} onPress={openGoogleMaps}>
          <Ionicons name="paper-plane" size={20} color="#fff" />
          <Text style={styles.buttonText1}>Open in Google Maps</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.startWorkButton} onPress={handleStartWork}>
          <Ionicons name="play" size={20} color="#000" />
          <Text style={styles.buttonText2} color="#000">Start Work</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
