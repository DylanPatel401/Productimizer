import { Text, View } from 'react-native';
import { useContext, useMemo } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';

import { TaskContext } from './nested/main_screens/TaskContext';
import { colors, spacing, typography, borderRadius, gradients, categoryData, priorityLevel } from '../styles/style';
import ScreenWrapper from '../functions/components/ui/ScreenWrapper';
import {
  calculateCompletionRate,
  calculateStreak,
  calculateCategoryBreakdown,
  calculatePriorityBreakdown,
  calculateWeeklyCompletions,
  calculateAverageTasksPerDay,
} from '../functions/analytics/statsCalculator';

const StatCard = ({ icon, value, label, color, delay = 0 }) => (
  <Animated.View entering={FadeIn.delay(delay).duration(400)} style={{ flex: 1 }}>
    <View
      style={{
        backgroundColor: colors.dark.surface,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        alignItems: 'center',
        marginHorizontal: spacing.xs,
      }}
    >
      <MaterialCommunityIcons name={icon} size={22} color={color || colors.dark.primary} />
      <Text style={[typography.h2, { color: colors.dark.text, marginTop: spacing.xs }]}>{value}</Text>
      <Text style={[typography.caption, { color: colors.dark.textSecondary }]}>{label}</Text>
    </View>
  </Animated.View>
);

const BarChart = ({ data }) => {
  const maxCount = Math.max(...data.map(d => d.count), 1);

  return (
    <Animated.View entering={FadeIn.delay(200).duration(400)}>
      <View
        style={{
          backgroundColor: colors.dark.surface,
          borderRadius: borderRadius.lg,
          padding: spacing.md,
          marginHorizontal: spacing.md,
          marginBottom: spacing.lg,
        }}
      >
        <Text style={[typography.h3, { color: colors.dark.text, marginBottom: spacing.md }]}>
          This Week
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 120 }}>
          {data.map((d, i) => (
            <View key={i} style={{ flex: 1, alignItems: 'center' }}>
              <Text style={[typography.caption, { color: colors.dark.textSecondary, marginBottom: 4 }]}>
                {d.count > 0 ? d.count : ''}
              </Text>
              <Animated.View
                entering={FadeIn.delay(300 + i * 80).duration(400)}
                style={{
                  width: '60%',
                  height: Math.max((d.count / maxCount) * 80, 4),
                  borderRadius: borderRadius.sm,
                  overflow: 'hidden',
                }}
              >
                <LinearGradient
                  colors={d.count > 0 ? gradients.primary : [colors.dark.surfaceElevated, colors.dark.surfaceElevated]}
                  style={{ flex: 1, borderRadius: borderRadius.sm }}
                />
              </Animated.View>
              <Text style={[typography.caption, { color: colors.dark.textMuted, marginTop: 4, fontSize: 10 }]}>
                {d.day}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </Animated.View>
  );
};

const CategoryBreakdownView = ({ data }) => {
  if (data.length === 0) return null;

  return (
    <Animated.View entering={FadeIn.delay(400).duration(400)}>
      <View
        style={{
          backgroundColor: colors.dark.surface,
          borderRadius: borderRadius.lg,
          padding: spacing.md,
          marginHorizontal: spacing.md,
          marginBottom: spacing.lg,
        }}
      >
        <Text style={[typography.h3, { color: colors.dark.text, marginBottom: spacing.md }]}>
          Categories
        </Text>
        {data.slice(0, 5).map((item, i) => {
          const catInfo = categoryData.find(c => c.name === item.category);
          const color = catInfo?.color || colors.dark.textMuted;

          return (
            <View key={i} style={{ marginBottom: spacing.sm }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text style={[typography.bodySmall, { color: colors.dark.text }]}>{item.category}</Text>
                <Text style={[typography.caption, { color: colors.dark.textSecondary }]}>{item.count} ({item.percentage}%)</Text>
              </View>
              <View style={{ height: 6, backgroundColor: colors.dark.surfaceElevated, borderRadius: 3 }}>
                <View
                  style={{
                    height: 6,
                    width: `${item.percentage}%`,
                    backgroundColor: color,
                    borderRadius: 3,
                  }}
                />
              </View>
            </View>
          );
        })}
      </View>
    </Animated.View>
  );
};

const PriorityBreakdownView = ({ data }) => {
  if (data.length === 0) return null;

  return (
    <Animated.View entering={FadeIn.delay(500).duration(400)}>
      <View
        style={{
          backgroundColor: colors.dark.surface,
          borderRadius: borderRadius.lg,
          padding: spacing.md,
          marginHorizontal: spacing.md,
          marginBottom: spacing.xxl,
        }}
      >
        <Text style={[typography.h3, { color: colors.dark.text, marginBottom: spacing.md }]}>
          Priority Distribution
        </Text>
        <View style={{ flexDirection: 'row' }}>
          {data.map((item, i) => {
            const color = priorityLevel[item.priority] || colors.dark.textMuted;
            return (
              <View key={i} style={{ flex: 1, alignItems: 'center' }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: color + '20',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: spacing.xs,
                  }}
                >
                  <Text style={[typography.body, { color, fontFamily: 'lexend-bold' }]}>{item.count}</Text>
                </View>
                <Text style={[typography.caption, { color: colors.dark.textSecondary, textTransform: 'capitalize' }]}>
                  {item.priority}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </Animated.View>
  );
};

export default function StatsScreen() {
  const { todayTasks, pastdueTasks, completedTasks } = useContext(TaskContext);

  const allTasks = useMemo(() => [...todayTasks, ...pastdueTasks, ...completedTasks], [todayTasks, pastdueTasks, completedTasks]);

  const completionRate = useMemo(() => calculateCompletionRate(allTasks), [allTasks]);
  const streak = useMemo(() => calculateStreak(completedTasks), [completedTasks]);
  const weeklyData = useMemo(() => calculateWeeklyCompletions(completedTasks), [completedTasks]);
  const categoryBreakdown = useMemo(() => calculateCategoryBreakdown(allTasks), [allTasks]);
  const priorityBreakdown = useMemo(() => calculatePriorityBreakdown(allTasks), [allTasks]);
  const avgPerDay = useMemo(() => calculateAverageTasksPerDay(completedTasks), [completedTasks]);

  return (
    <ScreenWrapper scrollable>
      {/* Header */}
      <LinearGradient
        colors={[colors.dark.primary + '30', colors.dark.background]}
        style={{ paddingTop: spacing.xxl + spacing.md, paddingHorizontal: spacing.lg, paddingBottom: spacing.lg }}
      >
        <Text style={[typography.h1, { color: colors.dark.text }]}>
          Your Stats
        </Text>
        <Text style={[typography.bodySmall, { color: colors.dark.textSecondary, marginTop: spacing.xs }]}>
          Track your productivity
        </Text>
      </LinearGradient>

      {/* Summary Cards */}
      <View style={{ flexDirection: 'row', paddingHorizontal: spacing.md, marginBottom: spacing.lg }}>
        <StatCard icon="check-circle" value={completedTasks.length} label="Done" color={colors.dark.success} delay={0} />
        <StatCard icon="percent" value={`${completionRate}%`} label="Rate" color={colors.dark.primary} delay={100} />
        <StatCard icon="fire" value={streak.currentStreak} label="Streak" color={colors.dark.secondary} delay={200} />
        <StatCard icon="chart-line" value={avgPerDay} label="Avg/Day" color={colors.dark.tertiary} delay={300} />
      </View>

      {/* Weekly Bar Chart */}
      <BarChart data={weeklyData} />

      {/* Category Breakdown */}
      <CategoryBreakdownView data={categoryBreakdown} />

      {/* Priority Distribution */}
      <PriorityBreakdownView data={priorityBreakdown} />
    </ScreenWrapper>
  );
}
