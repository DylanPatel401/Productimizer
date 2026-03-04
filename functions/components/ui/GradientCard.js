import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients, borderRadius, shadows, spacing } from '../../../styles/style';

export default function GradientCard({ children, onPress, gradient, style, disabled }) {
  const gradientColors = gradient || gradients.card;

  const content = (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        {
          borderRadius: borderRadius.lg,
          padding: spacing.md,
          ...shadows.sm,
        },
        style,
      ]}
    >
      {children}
    </LinearGradient>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} disabled={disabled}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}
