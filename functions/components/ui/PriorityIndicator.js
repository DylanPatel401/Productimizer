import React from 'react';
import { View } from 'react-native';
import { priorityLevel, borderRadius } from '../../../styles/style';

export default function PriorityIndicator({ priority, variant = 'bar' }) {
  const color = priorityLevel[priority] || priorityLevel.None;

  if (variant === 'dot') {
    return (
      <View
        style={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: color,
        }}
      />
    );
  }

  return (
    <View
      style={{
        width: 4,
        borderRadius: 2,
        backgroundColor: color,
        marginRight: 12,
      }}
    />
  );
}
