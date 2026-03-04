import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, borderRadius, spacing, typography } from '../../../styles/style';

export default function ThemedTextInput({ label, icon, value, onChangeText, placeholder, secureTextEntry, style, ...rest }) {
  return (
    <View style={[{ marginBottom: spacing.md }, style]}>
      {label && (
        <Text style={[typography.bodySmall, { color: colors.dark.textSecondary, marginBottom: spacing.xs }]}>
          {label}
        </Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.dark.surface,
          borderRadius: borderRadius.md,
          borderWidth: 1,
          borderColor: colors.dark.border,
          paddingHorizontal: spacing.md,
          height: 50,
        }}
      >
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={colors.dark.primary}
            style={{ marginRight: spacing.sm }}
          />
        )}
        <TextInput
          style={[
            typography.body,
            {
              flex: 1,
              color: colors.dark.text,
            },
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.dark.textMuted}
          secureTextEntry={secureTextEntry}
          {...rest}
        />
      </View>
    </View>
  );
}
