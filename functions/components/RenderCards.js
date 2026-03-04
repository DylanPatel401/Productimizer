import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Animated from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { colors, spacing, borderRadius, priorityLevel, categoryData, typography } from '../../styles/style';
import { ActionsModal } from './actionsModal';
import EmptyState from './ui/EmptyState';
import { slideInStaggered } from '../animations';

export const RenderCards = ({ currentTasks, renderDate }) => {
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const formatTime = (time) => {
    if (!time || time.toLowerCase() === 'none') return 'All day';
    try {
      return new Date(`2023-12-31T${time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
    } catch {
      return time;
    }
  };

  const getCategoryColor = (category) => {
    const cat = categoryData.find(c => c.name === category);
    return cat?.color || colors.dark.textMuted;
  };

  const renderCard = ({ item: todo, index }) => {
    const priorityColor = priorityLevel[todo.priority] || priorityLevel.None;
    const catColor = getCategoryColor(todo.category);

    return (
      <Animated.View entering={slideInStaggered(index)}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setSelectedItem(todo.taskID);
            setModal(true);
          }}
          style={{
            backgroundColor: colors.dark.surface,
            borderRadius: borderRadius.lg,
            marginHorizontal: spacing.md,
            marginBottom: spacing.sm,
            flexDirection: 'row',
            overflow: 'hidden',
          }}
        >
          {/* Priority bar */}
          <View
            style={{
              width: 4,
              backgroundColor: priorityColor,
              borderTopLeftRadius: borderRadius.lg,
              borderBottomLeftRadius: borderRadius.lg,
            }}
          />

          {/* Content */}
          <View style={{ flex: 1, padding: spacing.md, paddingLeft: spacing.md }}>
            <Text
              style={[typography.body, { color: colors.dark.text, marginBottom: spacing.xs }]}
              numberOfLines={1}
            >
              {todo.task}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={13}
                color={colors.dark.textMuted}
                style={{ marginRight: 4 }}
              />
              <Text style={[typography.caption, { color: colors.dark.textSecondary }]}>
                {formatTime(todo.time)}
              </Text>

              {renderDate && todo.date && (
                <>
                  <Text style={{ color: colors.dark.textMuted, marginHorizontal: spacing.xs }}> · </Text>
                  <Text style={[typography.caption, { color: colors.dark.textSecondary }]}>
                    {todo.date}
                  </Text>
                </>
              )}

              {/* Recurrence indicator */}
              {(todo.recurrence_parent_id || todo.is_recurrence_template) && (
                <>
                  <Text style={{ color: colors.dark.textMuted, marginHorizontal: spacing.xs }}> · </Text>
                  <MaterialCommunityIcons name="repeat" size={13} color={colors.dark.primary} />
                </>
              )}

              {/* Subtask progress */}
              {todo.subtasks && todo.subtasks.length > 0 && (
                <>
                  <Text style={{ color: colors.dark.textMuted, marginHorizontal: spacing.xs }}> · </Text>
                  <MaterialCommunityIcons name="checkbox-multiple-outline" size={13} color={colors.dark.textMuted} style={{ marginRight: 2 }} />
                  <Text style={[typography.caption, { color: colors.dark.textSecondary }]}>
                    {todo.subtasks.filter(s => s.completed).length}/{todo.subtasks.length}
                  </Text>
                </>
              )}
            </View>
          </View>

          {/* Category badge */}
          {todo.category && todo.category !== 'None' && (
            <View style={{ justifyContent: 'center', paddingRight: spacing.md }}>
              <View
                style={{
                  backgroundColor: catColor + '20',
                  borderRadius: borderRadius.full,
                  paddingHorizontal: spacing.sm + 2,
                  paddingVertical: 3,
                }}
              >
                <Text style={{ fontFamily: 'lexend-regular', fontSize: 11, color: catColor }}>
                  {todo.category}
                </Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  if (!currentTasks || currentTasks.length === 0) {
    return (
      <EmptyState
        title="No tasks here"
        subtitle="Tap + to add your first task"
        image={require('../../assets/Task.gif')}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={currentTasks}
        renderItem={renderCard}
        keyExtractor={(item, index) => item.taskID || index.toString()}
        contentContainerStyle={{ paddingTop: spacing.md, paddingBottom: spacing.xxl }}
        showsVerticalScrollIndicator={false}
      />
      <ActionsModal modal={modal} setModal={setModal} item_id={selectedItem} />
    </View>
  );
};
