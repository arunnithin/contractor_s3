import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/tasksStyles';
import { navigate } from 'expo-router/build/global-state/routing';
import login from './login';

const mockTasks = [
  {
    id: 'PH-2024-001',
    date: 'Dec 14, 2024',
    time: '15:00',
    location: 'MG Road, Near Metro Station',
    priority: 'High',
    status: 'Assigned',
  },
  {
    id: 'PH-2024-002',
    date: 'Dec 13, 2024',
    time: '19:45',
    location: 'Koramangala 5th Block',
    priority: 'Medium',
    status: 'In Progress',
  },
  {
    id: 'PH-2024-003',
    date: 'Dec 12, 2024',
    time: '16:30',
    location: 'Whitefield Main Road',
    priority: 'Low',
    status: 'Assigned',
  },
  {
    id: 'PH-2024-004',
    date: 'Dec 11, 2024',
    time: '10:00',
    location: 'Indiranagar 100 Feet Road',
    priority: 'High',
    status: 'Assigned',
  },
  {
    id: 'PH-2024-005',
    date: 'Dec 10, 2024',
    time: '14:20',
    location: 'BTM Layout 2nd Stage',
    priority: 'Medium',
    status: 'In Progress',
  },
];

export default function TasksScreen() {
  const [activeFilter, setActiveFilter] = useState('All');
  const router = useRouter();

  const filteredTasks =
    activeFilter === 'All'
      ? mockTasks
      : mockTasks.filter((task) => task.status === activeFilter);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return { bg: '#FFE5E5', text: '#FF4444', icon: 'warning' };
      case 'Medium':
        return { bg: '#fdfaaeff', text: '#e5b000ff', icon: 'time' };
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My Tasks</Text>
          <Text style={styles.welcomeText}>Welcome, Arun Contractor</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace('/login')}>
          <Ionicons name="log-out-outline" size={24} color="#11181C" />
        </TouchableOpacity>
      </View>
              
      <View style={styles.underline}></View>

      <View style={styles.filterContainer}>
        <Ionicons name="filter-outline" size={20} color="#666" style={styles.filterIcon} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {['All', 'Assigned', 'In Progress'].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                activeFilter === filter && styles.filterButtonActive,
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter && styles.filterTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.underline1}></View>


      <Text style={styles.taskCount}>Showing {filteredTasks.length} tasks</Text>

      <ScrollView style={styles.tasksList} showsVerticalScrollIndicator={false}>
        {filteredTasks.map((task) => {
          const priorityStyle = getPriorityColor(task.priority);
          const statusStyle = getStatusColor(task.status);

          return (
            <TouchableOpacity
              key={task.id}
              style={styles.taskCard}
              onPress={() => router.push(`/task-details?id=${task.id}`)}
            >

              <View
                    style={[
                      styles.badge1,
                      { backgroundColor: statusStyle.bg },
                    ]}
                  >
                    <View
                      style={[
                        styles.statusDot1,
                        { backgroundColor: statusStyle.dot },
                      ]}
                    />
                  <Text style={[styles.badgeText1, { color: statusStyle.text }]}>
                      {task.status}
                    </Text>
                  </View>

              <View style={styles.taskHeader}>
                <Text style={styles.taskId}>{task.id}</Text>
              </View>

              <View style={styles.taskInfo}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text style={styles.taskText}>
                  {task.date} • {task.time}
                </Text>
              </View>

              <View style={styles.taskInfo}>
                <Ionicons name="location-outline" size={16} color="#666" />
                <Text style={styles.taskText}>{task.location}</Text>
              </View>

              <View style={styles.taskFooter}>
                <View style={styles.badges}>
                  <View
                    style={[
                      styles.badge,
                      { backgroundColor: priorityStyle.bg },
                    ]}
                  >
                    <Ionicons
                      name={priorityStyle.icon === 'warning' ? 'warning' : 'time-outline'}
                      size={12}
                      color={priorityStyle.text}
                    />
                    <Text style={[styles.badgeText, { color: priorityStyle.text }]}>
                      {task.priority}
                    </Text>
                  </View>

                  {/* <View
                    style={[
                      styles.badge,
                      { backgroundColor: statusStyle.bg },
                    ]}
                  >
                    <View
                      style={[
                        styles.statusDot,
                        { backgroundColor: statusStyle.dot },
                      ]}
                    />
                    <Text style={[styles.badgeText, { color: statusStyle.text }]}>
                      {task.status}
                    </Text>
                  </View> */}
                </View>

                <Text style={styles.viewDetails}>View Details &gt;</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}



