import { StyleSheet, StatusBar } from "react-native";

const barHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 24;

const colors = {
  dark: {
    background: '#0F0F1A',
    surface: '#1A1A2E',
    surfaceElevated: '#252542',
    primary: '#7C5CFC',
    primaryLight: '#9B85FC',
    secondary: '#FF6B6B',
    tertiary: '#4ECDC4',
    text: '#FFFFFF',
    textSecondary: '#A0A0B8',
    textMuted: '#6B6B80',
    border: '#2A2A40',
    success: '#4ADE80',
    warning: '#FBBF24',
    error: '#F87171',
    cardBg: '#1A1A2E',
  },
  light: {
    background: '#F8F9FE',
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',
    primary: '#7C5CFC',
    primaryLight: '#9B85FC',
    secondary: '#FF6B6B',
    tertiary: '#4ECDC4',
    text: '#1A1A2E',
    textSecondary: '#6B6B80',
    textMuted: '#A0A0B8',
    border: '#E8E8F0',
    success: '#4ADE80',
    warning: '#FBBF24',
    error: '#F87171',
    cardBg: '#FFFFFF',
  },
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

const gradients = {
  primary: ['#7C5CFC', '#9B85FC'],
  accent: ['#FF6B6B', '#FF8E8E'],
  teal: ['#4ECDC4', '#45B7AA'],
  card: ['#1A1A2E', '#252542'],
  success: ['#4ADE80', '#34D399'],
  surface: ['#1A1A2E', '#1F1F35'],
};

const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  glow: {
    shadowColor: '#7C5CFC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
};

const typography = {
  h1: { fontFamily: 'lexend-bold', fontSize: 28 },
  h2: { fontFamily: 'lexend-bold', fontSize: 22 },
  h3: { fontFamily: 'lexend-bold', fontSize: 18 },
  body: { fontFamily: 'lexend-regular', fontSize: 16 },
  bodySmall: { fontFamily: 'lexend-regular', fontSize: 14 },
  caption: { fontFamily: 'lexend-regular', fontSize: 12 },
  button: { fontFamily: 'lexend-bold', fontSize: 16 },
};

// Legacy support
const lightScheme = StyleSheet.create({
  background: colors.light.background,
  primary: colors.light.primary,
  secondary: '#363636',
  text: { fontFamily: 'lexend-regular', fontSize: barHeight / 1.25, color: colors.light.text },
  smallText: { fontFamily: 'lexend-regular', fontSize: barHeight / 2, color: colors.light.textSecondary },
});

const darkScheme = StyleSheet.create({
  background: colors.dark.background,
  primary: colors.dark.primary,
  secondary: colors.dark.surface,
  text: { fontFamily: 'lexend-regular', fontSize: barHeight / 1.25, color: colors.dark.text },
  smallText: { fontFamily: 'lexend-regular', fontSize: barHeight / 2, color: colors.dark.textSecondary },
});

const priorityLevel = {
  None: '#6B6B80',
  none: '#6B6B80',
  high: '#F87171',
  low: '#4ADE80',
  medium: '#FBBF24',
};

const categoryData = [
  { name: "Work", color: '#6366F1' },
  { name: "Study", color: '#4ADE80' },
  { name: "Health & Fitness", color: '#F87171' },
  { name: "Household", color: '#FB923C' },
  { name: "Social", color: '#A78BFA' },
  { name: "Personal Development", color: '#4ECDC4' },
  { name: "Finance", color: '#FBBF24' },
  { name: "Hobbies", color: '#F472B6' },
  { name: "Travel", color: '#22D3EE' },
  { name: "Volunteering", color: '#A3E635' },
];

export {
  lightScheme,
  darkScheme,
  barHeight,
  priorityLevel,
  categoryData,
  colors,
  spacing,
  borderRadius,
  gradients,
  shadows,
  typography,
};
