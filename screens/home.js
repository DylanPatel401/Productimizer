import { View, Dimensions } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import MainScreen from './main';
import TaskScreen from './task';
import CalendarScreen from './calendar';
import StatsScreen from './stats';
import ProfileScreen from './profile';

import { colors, gradients } from '../styles/style';

const deviceHeight = Dimensions.get('window').height;
const Tab = createBottomTabNavigator();

const FloatingCreateButton = ({ focused }) => (
  <View
    style={{
      width: 56,
      height: 56,
      borderRadius: 28,
      marginBottom: 20,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    }}
  >
    <LinearGradient
      colors={focused ? gradients.primary : ['#3A3A5C', '#4A4A6A']}
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <MaterialCommunityIcons name="plus" color="#FFFFFF" size={28} />
    </LinearGradient>
  </View>
);

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.dark.background },
        tabBarStyle: {
          backgroundColor: colors.dark.surface,
          borderTopColor: colors.dark.border,
          borderTopWidth: 1,
          height: 70,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.dark.primary,
        tabBarInactiveTintColor: colors.dark.textMuted,
        tabBarLabelStyle: {
          fontFamily: 'lexend-regular',
          fontSize: 11,
        },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: 'center',
      }}
    >
      <Tab.Screen name="Main" component={MainScreen}
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="checkbox-marked-circle-outline" color={color} size={deviceHeight / 30} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen name="Calendar" component={CalendarScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar-month" color={color} size={deviceHeight / 30} />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen name="Create" component={TaskScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FloatingCreateButton focused={focused} />
          ),
          tabBarLabel: () => null,
          headerShown: false,
        }}
      />

      <Tab.Screen name="Stats" component={StatsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-bar" color={color} size={deviceHeight / 30} />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen name="Profile" component={ProfileScreen}
        options={{
          tabBarIcon: ({ color: iconColor }) => (
            <MaterialCommunityIcons name="account-circle" color={iconColor} size={deviceHeight / 30} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
