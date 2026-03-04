import React from 'react';
import { View, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../styles/style';

export default function ScreenWrapper({ children, scrollable, style }) {
  const content = scrollable ? (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    children
  );

  return (
    <View style={[{ flex: 1, backgroundColor: colors.dark.background }, style]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.dark.background} />
      <SafeAreaView style={{ flex: 1 }}>
        {content}
      </SafeAreaView>
    </View>
  );
}
