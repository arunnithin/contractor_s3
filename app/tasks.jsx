import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/tasksStyles';
import { useFocusEffect } from '@react-navigation/native';

const mockTasks = [
  {
    id: 'PH-2024-001',
    date: 'Dec 14, 2024',
    time: '15:00',
    latitude: 8.4207098,
    longitude: 78.0309535,
    location: 'MG road, Near Metro Station',
    priority: 'High',
    status: 'Assigned',
    accepted: false,
  },
  {
    id: 'PH-2024-002',
    date: 'Dec 12, 2024',
    time: '07:30',
    latitude: 8.4207098,
    longitude: 78.0309535,
    location: 'MG road, Near Metro Station',
    priority: 'High',
    status: 'Assigned',
    accepted: false,
  },
];

export default function TasksScreen() {
  const router = useRouter();
  const [tasks, setTasks] = useState(mockTasks);
  const [activeFilter, setActiveFilter] = useState('All');
  const { taskId, preWorkPhoto, action } = useLocalSearchParams();

  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // --- Accept task ---
  const handleAccept = (taskId) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, accepted: true } : task
      )
    );
  };

  // --- Handle updates from WorkScreen ---
  useFocusEffect(
  React.useCallback(() => {
    if (action && taskId) {
      if (action === 'START_WORK') markInProgress(taskId, preWorkPhoto ?? null);
      if (action === 'COMPLETE_WORK') updateTaskStatus(taskId, 'Completed');
    }
  }, [action, taskId, preWorkPhoto])
);

  // --- MARK IN PROGRESS ---
  const markInProgress = (taskId, prePhoto = null) => {
  setTasks(prev =>
    prev.map(task =>
      task.id === taskId
        ? {
            ...task,
            status: 'In Progress', // ✅ change immediately
            accepted: true,
            preWorkPhoto: prePhoto,
          }
        : task
    )
  );
};


  // --- UPDATE TASK STATUS ---
  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, status: newStatus, accepted: true } : task
      )
    );
  };

  // --- Open reject modal ---
  const openRejectModal = (taskId) => {
    setSelectedTaskId(taskId);
    setRejectReason('');
    setRejectModalVisible(true);
  };

  // --- Handle Task Press Navigation ---
  const handleTaskPress = (task) => {
    if (task.status === 'In Progress') {
      router.push({
        pathname: '/WorkScreen',
        params: {
          id: task.id,
          preWorkPhoto: task.preWorkPhoto ?? '',
          mode: 'update',
        },
      });
      return;
    }

    if (task.status === 'Assigned' && task.accepted) {
      router.push({
        pathname: '/task-details',
        params: { id: task.id },
      });
    }
  };

  // --- Confirm Reject ---
  const confirmReject = () => {
    if (!rejectReason.trim()) return;

    setTasks(prev =>
      prev.map(task =>
        task.id === selectedTaskId
          ? { ...task, status: 'Rejected', accepted: false, rejectReason }
          : task
      )
    );
    setRejectModalVisible(false);
    setSelectedTaskId(null);
  };

  // --- Filter logic ---
  const filteredTasks = () => {
  switch (activeFilter) {
    case 'All':
      // Show only Assigned and In Progress tasks
      return tasks
        .filter(t => t.status === 'Assigned' || t.status === 'In Progress')
        .sort((a, b) => {
          const order = { Assigned: 0, 'In Progress': 1 };
          return order[a.status] - order[b.status];
        });
    case 'Assigned':
      return tasks.filter(t => t.status === 'Assigned' && !t.accepted);
    case 'In Progress':
      return tasks.filter(t => t.status === 'In Progress' && t.accepted);
    case 'Completed':
      return tasks.filter(t => t.status === 'Completed' && t.accepted);
    default:
      return tasks;
  }
};


  // --- Priority & Status styles ---
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return { bg: '#FFE5E5', text: '#FF4444', icon: 'warning' };
      case 'Medium': return { bg: '#FFF4E5', text: '#FF8800', icon: 'time' };
      default: return { bg: '#E5F5E5', text: '#44AA44', icon: 'time' };
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Assigned': return { bg: '#E5F0FF', text: '#0066FF', dot: '#0066FF' };
      case 'In Progress': return { bg: '#FFF4E5', text: '#FF8800', dot: '#FF8800' };
      case 'Completed': return { bg: '#E5F0FF', text: '#44AA44', dot: '#44AA44' };
      case 'Rejected': return { bg: '#FFE5E5', text: '#FF4444', dot: '#FF4444' };
      default: return { bg: '#E5F0FF', text: '#0066FF', dot: '#0066FF' };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My Tasks</Text>
          <Text style={styles.welcomeText}>Welcome, Arun Contractor</Text>
        </View>
        <TouchableOpacity onPress={() => router.replace('/login')} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="#11181C" />
        </TouchableOpacity>
      </View>

      {/* FILTER TABS */}
      <View style={styles.filterTabs}>
        {['All', 'Assigned', 'In Progress', 'Completed'].map(filter => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterTab, activeFilter === filter && styles.activeFilterTab]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text style={[styles.filterTabText, activeFilter === filter && styles.activeFilterTabText]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* TASK LIST */}
      <ScrollView style={styles.tasksList}>
        {filteredTasks().map(task => {
          const priorityStyle = getPriorityColor(task.priority);
          const statusStyle = getStatusColor(task.status);

          return (
            <View key={task.id} style={styles.taskCard}>
              <View style={[styles.badge1, { backgroundColor: statusStyle.bg }]}>
                <View style={[styles.statusDot1, { backgroundColor: statusStyle.dot }]} />
                <Text style={[styles.badgeText1, { color: statusStyle.text }]}>{task.status}</Text>
              </View>

              <Text style={styles.taskId}>{task.id}</Text>

              <View style={styles.taskInfo}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text style={styles.taskText}>{task.date} • {task.time}</Text>
              </View>

              <View style={styles.taskInfo}>
                <Ionicons name="location-outline" size={16} color="#666" />
                <Text style={styles.taskText}>{task.location}</Text>
              </View>

              <View style={styles.taskFooter}>
                <View style={styles.badges}>
                  <View style={[styles.badge, { backgroundColor: priorityStyle.bg }]}>
                    <Ionicons name="warning" size={12} color={priorityStyle.text} />
                    <Text style={[styles.badgeText, { color: priorityStyle.text }]}>{task.priority}</Text>
                  </View>
                </View>

                {/* ACTIONS */}
                {task.status === 'Assigned' && !task.accepted && (
                  <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.acceptButton} onPress={() => handleAccept(task.id)}>
                      <Text style={styles.acceptText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rejectButton} onPress={() => openRejectModal(task.id)}>
                      <Text style={styles.rejectText}>Reject</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {task.status !== 'Rejected' && !(task.status === 'Assigned' && !task.accepted) && (
                  <TouchableOpacity onPress={() => handleTaskPress(task)}>
                    <Text style={styles.viewDetails}>
                      {task.status === 'In Progress' ? 'Update ›' : 'View Details ›'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* REJECT MODAL */}
      <Modal transparent animationType="fade" visible={rejectModalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Reject Task</Text>
              <Text style={styles.modalSubtitle}>Please provide a reason for rejecting this task.</Text>
            </View>

            <TextInput
              multiline
              value={rejectReason}
              onChangeText={setRejectReason}
              placeholder="Enter rejection reason..."
              style={styles.modalInput}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setRejectModalVisible(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity disabled={!rejectReason.trim()} onPress={confirmReject}>
                <Text
                  style={[
                    styles.modalRejectText,
                    rejectReason.trim() ? { color: '#f51717ff' } : { color: '#B0B0B0' },
                  ]}
                >
                  Reject
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
