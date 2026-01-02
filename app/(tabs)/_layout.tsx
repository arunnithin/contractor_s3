import { Tabs } from 'expo-router';
import React from 'react';
import { Dimensions, PixelRatio } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';

// Responsive scaling for all device sizes
const { width } = Dimensions.get('window');
const baseWidth = 375;
const minScale = 0.85;
const maxScale = 1.35;
const scaleRatio = Math.min(Math.max(width / baseWidth, minScale), maxScale);
const rs = (size: number) => Math.round(Math.max(size * scaleRatio, size * minScale));

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#999',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarLabelStyle: {
          fontSize: rs(11),
        },
      }}>
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color }) => <Ionicons name="list" size={rs(24)} color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={rs(28)} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={rs(28)} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
