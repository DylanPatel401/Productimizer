import React from 'react';
import { View, Text } from 'react-native';
import { categoryData, borderRadius, spacing, typography } from '../../../styles/style';

export default function CategoryBadge({ category, size = 'sm' }) {
  const catInfo = categoryData.find(c => c.name === category);
  const color = catInfo?.color || '#6B6B80';

  const isSmall = size === 'sm';
  const fontSize = isSmall ? 10 : 12;
  const paddingH = isSmall ? spacing.sm : spacing.md;
  const paddingV = isSmall ? 2 : 4;

  return (
    <View
      style={{
        backgroundColor: color + '20',
        borderRadius: borderRadius.full,
        paddingHorizontal: paddingH,
        paddingVertical: paddingV,
        alignSelf: 'flex-start',
      }}
    >
      <Text style={{ fontFamily: 'lexend-bold', fontSize, color }}>
        {category}
      </Text>
    </View>
  );
}
