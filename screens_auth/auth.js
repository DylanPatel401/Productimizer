import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SignUpScreen from './signup';
import SignInScreen from './signin';
import { colors, gradients, spacing, typography, borderRadius } from '../styles/style';

export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: colors.dark.background }}>
      {/* Header with gradient */}
      <LinearGradient
        colors={[colors.dark.primary + '40', colors.dark.background]}
        style={{
          paddingTop: spacing.xxl * 2,
          paddingBottom: spacing.xl,
          alignItems: 'center',
        }}
      >
        <Text style={[typography.h1, { color: colors.dark.text, fontSize: 32 }]}>
          Productimizer
        </Text>
        <Text style={[typography.bodySmall, { color: colors.dark.textSecondary, marginTop: spacing.xs }]}>
          Get things done, beautifully
        </Text>
      </LinearGradient>

      {/* Tab Switcher */}
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: spacing.xl,
          marginBottom: spacing.lg,
          backgroundColor: colors.dark.surface,
          borderRadius: borderRadius.md,
          padding: 4,
        }}
      >
        <TouchableOpacity
          onPress={() => setIsSignUp(true)}
          style={{ flex: 1 }}
        >
          <View
            style={{
              paddingVertical: spacing.sm + 2,
              borderRadius: borderRadius.sm,
              backgroundColor: isSignUp ? colors.dark.primary : 'transparent',
              alignItems: 'center',
            }}
          >
            <Text style={[typography.button, { color: isSignUp ? '#FFFFFF' : colors.dark.textMuted, fontSize: 14 }]}>
              Sign Up
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsSignUp(false)}
          style={{ flex: 1 }}
        >
          <View
            style={{
              paddingVertical: spacing.sm + 2,
              borderRadius: borderRadius.sm,
              backgroundColor: !isSignUp ? colors.dark.primary : 'transparent',
              alignItems: 'center',
            }}
          >
            <Text style={[typography.button, { color: !isSignUp ? '#FFFFFF' : colors.dark.textMuted, fontSize: 14 }]}>
              Sign In
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Form */}
      <View style={{ flex: 1 }}>
        {isSignUp ? <SignUpScreen /> : <SignInScreen />}
      </View>
    </View>
  );
}
