import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/tasksStyles';
import { useFocusEffect } from '@react-navigation/native';
import { getJobs, updateJobStatus, transformJobToTask, getStats, rejectJob } from '../services/jobsService';
import { logout, getStoredUser } from '../services/authService';

export default function TasksScreen() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userName, setUserName] = useState('Contractor');
  const [stats, setStats] = useState(null);
  const { taskId, dbId, preWorkPhoto, action } = useLocalSearchParams();
  const lastHandledActionRef = useRef(null);

  const normalizeParam = (value) => {
    if (Array.isArray(value)) return value[0];
    return value;
  };

  const routeTaskId = normalizeParam(taskId);
  const routeDbId = normalizeParam(dbId);
  const routePreWorkPhoto = normalizeParam(preWorkPhoto);
  const routeAction = normalizeParam(action);

  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // --- Load tasks from API ---
  const loadTasks = useCallback(async (showLoader = true) => {
    if (showLoader) setIsLoading(true);
    
    try {
      const [jobsResult, statsResult, user] = await Promise.all([
        getJobs(),
        getStats(),
        getStoredUser(),
      ]);

      if (user) {
        setUserName(user.email?.split('@')[0] || 'Contractor');
      }

      if (jobsResult.success && jobsResult.data.jobs) {
        const transformedTasks = jobsResult.data.jobs.map(transformJobToTask);
        setTasks(transformedTasks);
      }

      if (statsResult.success) {
        setStats(statsResult.data.stats);
      }
    } catch (error) {
      console.error('Load tasks error:', error);
      Alert.alert('Error', 'Failed to load tasks. Please try again.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // --- Pull to refresh ---
  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    loadTasks(false);
  }, [loadTasks]);

  // --- Accept task ---
  const handleAccept = async (taskId) => {
    // Find task to get dbId
    const task = tasks.find(t => String(t.id) === String(taskId));
    if (!task) return;

    // Just mark as accepted locally - status remains "Assigned"
    // Status will change to "In Progress" only when "Start Work" is clicked
    setTasks(prev =>
      prev.map(t =>
        String(t.id) === String(taskId) ? { ...t, accepted: true } : t
      )
    );
  };

  // --- Handle updates from WorkScreen ---
  useFocusEffect(
    useCallback(() => {
      const actionKey = `${routeAction || ''}:${routeDbId || ''}:${routeTaskId || ''}:${routePreWorkPhoto || ''}`;

      // Handle actions first (doesn't rely on tasks being loaded yet), then refresh list.
      if (routeAction && (routeTaskId || routeDbId) && lastHandledActionRef.current !== actionKey) {
        lastHandledActionRef.current = actionKey;

        if (routeAction === 'START_WORK') {
          markInProgress(routeTaskId, routeDbId, routePreWorkPhoto ?? null);
        }

        if (routeAction === 'COMPLETE_WORK') {
          updateTaskStatusLocal(routeTaskId, 'Completed', routeDbId);
        }
      }

      // Always refresh on focus
      loadTasks();
    }, [routeAction, routeTaskId, routeDbId, routePreWorkPhoto, loadTasks])
  );

  // --- MARK IN PROGRESS ---
  const markInProgress = async (taskId, dbId, prePhoto = null) => {
    const matchByIdOrDbId = (t) => {
      if (taskId != null && String(t.id) === String(taskId)) return true;
      if (dbId != null && String(t.dbId) === String(dbId)) return true;
      return false;
    };

    const task = tasks.find(matchByIdOrDbId);
    const jobDbId = dbId ?? task?.dbId;

    if (!jobDbId) {
      Alert.alert('Error', 'Task not found to start work');
      return;
    }

    try {
      await updateJobStatus(
        jobDbId, 
        'in_progress', 
        prePhoto ? `Work started with pre-work photo: ${prePhoto}` : 'Work started'
      );
      
      // Update local state
      setTasks(prev =>
        prev.map(t =>
          matchByIdOrDbId(t)
            ? { ...t, status: 'In Progress', accepted: true, preWorkPhoto: prePhoto }
            : t
        )
      );
    } catch (error) {
      console.error('Mark in progress error:', error);
      Alert.alert('Error', 'Failed to start work');
    }
  };


  // --- UPDATE TASK STATUS ---
  const updateTaskStatusLocal = async (taskId, newStatus, dbId) => {
    const matchByIdOrDbId = (t) => {
      if (taskId != null && String(t.id) === String(taskId)) return true;
      if (dbId != null && String(t.dbId) === String(dbId)) return true;
      return false;
    };

    const task = tasks.find(matchByIdOrDbId);
    const jobDbId = dbId ?? task?.dbId;
    if (!jobDbId) return;

    const statusMap = {
      'Completed': 'completed',
      'In Progress': 'in_progress',
      'Assigned': 'assigned',
    };

    try {
      const result = await updateJobStatus(jobDbId, statusMap[newStatus] || 'assigned');
      if (result.success) {
        setTasks(prev =>
          prev.map(t =>
            matchByIdOrDbId(t) ? { ...t, status: newStatus, accepted: true } : t
          )
        );
      }
    } catch (error) {
      console.error('Update status error:', error);
    }
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
          dbId: task.dbId,
          preWorkPhoto: task.preWorkPhoto ?? '',
          mode: 'update',
        },
      });
      return;
    }

    if (task.status === 'Assigned' && task.accepted) {
      router.push({
        pathname: '/task-details',
        params: { 
          id: task.id,
          dbId: task.dbId,
          latitude: task.latitude,
          longitude: task.longitude,
          priority: task.priority,
          location: task.location,
          dueDate: task.dueDate || '',
          totalPotholes: task.totalPotholes,
          totalPatchy: task.totalPatchy,
        },
      });
    }
  };

  // --- Confirm Reject ---
  const confirmReject = async () => {
    if (!rejectReason.trim()) return;

    const task = tasks.find(t => t.id === selectedTaskId);
    if (task) {
      try {
        // Delete assignment from backend
        await rejectJob(task.dbId, rejectReason);
        
        // Remove from local state
        setTasks(prev => prev.filter(t => t.id !== selectedTaskId));
        
        Alert.alert('Success', 'Task rejected and removed');
      } catch (error) {
        console.error('Reject error:', error);
        Alert.alert('Error', 'Failed to reject task');
      }
    }

    setRejectModalVisible(false);
    setSelectedTaskId(null);
  };

  // --- Handle Logout ---
  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/login');
          },
        },
      ]
    );
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
          <Text style={styles.welcomeText}>Welcome, {userName}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
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

      {/* LOADING INDICATOR */}
      {isLoading && !isRefreshing && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Loading tasks...</Text>
        </View>
      )}

      {/* TASK LIST */}
      <ScrollView 
        style={styles.tasksList}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={['#FF6B35']}
            tintColor="#FF6B35"
          />
        }
      >
        {!isLoading && filteredTasks().length === 0 && (
          <View style={styles.emptyContainer}>
            <Ionicons name="clipboard-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No tasks found</Text>
            <Text style={styles.emptySubText}>Pull down to refresh</Text>
          </View>
        )}
        
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

              {!!task.dueDate && (
                <View style={styles.taskInfo}>
                  <Ionicons name="calendar-outline" size={16} color="#666" />
                  <Text style={styles.taskText}>Due: {task.dueDate}</Text>
                </View>
              )}

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
