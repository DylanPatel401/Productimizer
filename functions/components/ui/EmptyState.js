import React from 'react';
import { View, Text, Image } from 'react-native';
import Animated from 'react-native-reanimated';
import { ENTER_FADE } from '../../animations';
import { colors, spacing, typography } from '../../../styles/style';
import GradientButton from './GradientButton';

export default function EmptyState({ title, subtitle, actionLabel, onAction, image }) {
  return (
    <Animated.View
      entering={ENTER_FADE}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.xl,
      }}
    >
      {image && (
        <Image
          source={image}
          style={{ width: 150, height: 150, marginBottom: spacing.lg }}
          resizeMode="contain"
        />
      )}
      <Text style={[typography.h3, { color: colors.dark.text, textAlign: 'center', marginBottom: spacing.sm }]}>
        {title || 'No tasks yet'}
      </Text>
      {subtitle && (
        <Text style={[typography.bodySmall, { color: colors.dark.textSecondary, textAlign: 'center', marginBottom: spacing.lg }]}>
          {subtitle}
        </Text>
      )}
      {actionLabel && onAction && (
        <GradientButton title={actionLabel} onPress={onAction} />
      )}
    </Animated.View>
  );
}
