import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients, borderRadius, typography, colors, spacing, shadows } from '../../../styles/style';

const variants = {
  primary: {
    gradient: gradients.primary,
    textColor: '#FFFFFF',
  },
  secondary: {
    gradient: gradients.teal,
    textColor: '#FFFFFF',
  },
  danger: {
    gradient: gradients.accent,
    textColor: '#FFFFFF',
  },
  outline: {
    gradient: null,
    textColor: colors.dark.primary,
  },
};

export default function GradientButton({ title, onPress, variant = 'primary', loading, disabled, style, icon }) {
  const config = variants[variant] || variants.primary;
  const isDisabled = disabled || loading;

  if (config.gradient) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} disabled={isDisabled} style={style}>
        <LinearGradient
          colors={config.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            {
              borderRadius: borderRadius.md,
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.xl,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              opacity: isDisabled ? 0.6 : 1,
              ...shadows.glow,
            },
          ]}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              {icon && <View style={{ marginRight: spacing.sm }}>{icon}</View>}
              <Text style={[typography.button, { color: config.textColor }]}>{title}</Text>
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={isDisabled}
      style={[
        {
          borderRadius: borderRadius.md,
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.xl,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          borderWidth: 2,
          borderColor: colors.dark.primary,
          opacity: isDisabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={config.textColor} />
      ) : (
        <>
          {icon && <View style={{ marginRight: spacing.sm }}>{icon}</View>}
          <Text style={[typography.button, { color: config.textColor }]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}
