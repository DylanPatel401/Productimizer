import { Text, View, useWindowDimensions } from 'react-native';
import { useState, useContext } from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { LinearGradient } from 'expo-linear-gradient';

import TodayScreen from './nested/main_screens/today';
import PastdueScreen from './nested/main_screens/pastdue';
import CompletedScreen from './nested/main_screens/completed';
import { TaskContext } from './nested/main_screens/TaskContext';
import { colors, gradients, spacing, typography } from '../styles/style';

const renderScene = SceneMap({
  first: TodayScreen,
  second: PastdueScreen,
  third: CompletedScreen,
});

export default function MainScreen() {
  const layout = useWindowDimensions();
  const { todayTasks, pastdueTasks } = useContext(TaskContext);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Today' },
    { key: 'second', title: 'Past Due' },
    { key: 'third', title: 'Completed' },
  ]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={{ backgroundColor: 'transparent', elevation: 0 }}
      indicatorStyle={{
        backgroundColor: colors.dark.primary,
        height: 3,
        borderRadius: 2,
      }}
      labelStyle={[typography.bodySmall, { fontFamily: 'lexend-bold', textTransform: 'none' }]}
      activeColor={colors.dark.text}
      inactiveColor={colors.dark.textMuted}
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.dark.background }}>
      {/* Header */}
      <LinearGradient
        colors={[colors.dark.primary + '30', colors.dark.background]}
        style={{ paddingTop: spacing.xxl + spacing.md, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}
      >
        <Text style={[typography.h1, { color: colors.dark.text }]}>
          {getGreeting()}
        </Text>
        <View style={{ flexDirection: 'row', marginTop: spacing.xs }}>
          <Text style={[typography.bodySmall, { color: colors.dark.textSecondary }]}>
            {todayTasks.length} task{todayTasks.length !== 1 ? 's' : ''} today
          </Text>
          {pastdueTasks.length > 0 && (
            <Text style={[typography.bodySmall, { color: colors.dark.error, marginLeft: spacing.md }]}>
              {pastdueTasks.length} overdue
            </Text>
          )}
        </View>
      </LinearGradient>

      {/* Tab View */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
}
