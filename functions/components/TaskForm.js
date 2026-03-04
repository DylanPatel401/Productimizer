import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { priorityLevel, categoryData, colors, spacing, typography, borderRadius } from '../../styles/style';
import { Priority, Category, DatePickerModal, TimePickerModal } from './createTasksModal';
import RecurrencePicker from './RecurrencePicker';
import ThemedTextInput from './ui/ThemedTextInput';
import GradientButton from './ui/GradientButton';
import ScreenWrapper from './ui/ScreenWrapper';
import { getFormatedDate } from "react-native-modern-datepicker";

const REMINDER_OPTIONS = [
  { value: -1, label: 'Off' },
  { value: 0, label: 'At time' },
  { value: 5, label: '5 min before' },
  { value: 15, label: '15 min before' },
  { value: 30, label: '30 min before' },
  { value: 60, label: '1 hour before' },
];

function ReminderPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const currentLabel = REMINDER_OPTIONS.find(o => o.value === value)?.label || '30 min before';

  return (
    <>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        activeOpacity={0.7}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.dark.surface,
          borderRadius: borderRadius.md,
          padding: spacing.md,
          marginBottom: spacing.sm,
        }}
      >
        <MaterialCommunityIcons name="bell-ring-outline" size={20} color={colors.dark.primary} style={{ marginRight: spacing.md }} />
        <Text style={[typography.body, { color: colors.dark.textSecondary, flex: 1 }]}>Remind me</Text>
        <Text style={[typography.body, { color: value >= 0 ? colors.dark.primary : colors.dark.text }]}>
          {currentLabel}
        </Text>
        <MaterialCommunityIcons name="chevron-right" size={18} color={colors.dark.textMuted} style={{ marginLeft: spacing.xs }} />
      </TouchableOpacity>

      {open && (
        <View style={{
          backgroundColor: colors.dark.surface,
          borderRadius: borderRadius.md,
          marginBottom: spacing.sm,
          overflow: 'hidden',
        }}>
          {REMINDER_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => { onChange(option.value); setOpen(false); }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: spacing.md,
                backgroundColor: value === option.value ? colors.dark.primary + '20' : 'transparent',
                borderBottomWidth: 1,
                borderBottomColor: colors.dark.border,
              }}
            >
              <Text style={[typography.body, { color: value === option.value ? colors.dark.primary : colors.dark.text, flex: 1 }]}>
                {option.label}
              </Text>
              {value === option.value && (
                <MaterialCommunityIcons name="check" size={18} color={colors.dark.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
}

export default function TaskForm({ initialValues, onSubmit, submitLabel }) {
  const today = new Date();
  const defaultDate = getFormatedDate(today.setDate(today.getDate()), "YYYY/MM/DD");

  const [title, changeTitle] = useState(initialValues?.title || '');
  const [priorityText, setPriorityText] = useState(initialValues?.priority || 'None');
  const [categoryText, setCategoryText] = useState(initialValues?.category || 'None');
  const [currentDate, setCurrentDate] = useState(initialValues?.date || defaultDate);
  const [currentTime, setCurrentTime] = useState(initialValues?.time || '23:59');
  const [subtasks, setSubtasks] = useState(initialValues?.subtasks || []);
  const [recurrence, setRecurrence] = useState(initialValues?.recurrence || null);
  const [reminder, setReminder] = useState(initialValues?.reminder ?? 30);
  const [newSubtask, setNewSubtask] = useState('');
  const [loading, setLoading] = useState(false);

  const [priorityModal, setPriorityModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const [timeModal, setTimeModal] = useState(false);

  const handlePrioritySelect = (priority) => {
    setPriorityText(priority);
    setPriorityModal(false);
  };

  const handleCategorySelect = (category) => {
    setCategoryText(category);
    setCategoryModal(false);
  };

  const handleDateSelect = (date) => {
    setCurrentDate(date);
    setDateModal(false);
  };

  const handleTimeSelect = (time) => {
    setCurrentTime(time);
    setTimeModal(false);
  };

  const addSubtask = () => {
    if (!newSubtask.trim()) return;
    setSubtasks([...subtasks, {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: newSubtask.trim(),
      completed: false,
      order: Date.now(),
    }]);
    setNewSubtask('');
  };

  const removeSubtask = (id) => {
    setSubtasks(subtasks.filter(st => st.id !== id));
  };

  const handleSubmit = async () => {
    if (!title) return alert("Please enter a title");
    setLoading(true);
    try {
      await onSubmit({
        title,
        date: currentDate,
        time: currentTime,
        category: categoryText,
        priority: priorityText,
        subtasks,
        recurrence,
        reminder,
      });
      if (!initialValues) {
        changeTitle('');
        setSubtasks([]);
        setRecurrence(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const catColor = categoryData.find(c => c.name === categoryText)?.color || colors.dark.textMuted;
  const priColor = priorityLevel[priorityText] || colors.dark.textMuted;

  const FieldRow = ({ icon, label, value, valueColor, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.dark.surface,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        marginBottom: spacing.sm,
      }}
    >
      <MaterialCommunityIcons name={icon} size={20} color={colors.dark.primary} style={{ marginRight: spacing.md }} />
      <Text style={[typography.body, { color: colors.dark.textSecondary, flex: 1 }]}>{label}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {valueColor && (
          <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: valueColor, marginRight: spacing.sm }} />
        )}
        <Text style={[typography.body, { color: colors.dark.text }]}>{value}</Text>
        <MaterialCommunityIcons name="chevron-right" size={18} color={colors.dark.textMuted} style={{ marginLeft: spacing.xs }} />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper scrollable>
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.xl }}>
        {/* Header */}
        <Text style={[typography.h2, { color: colors.dark.text, marginBottom: spacing.lg }]}>
          {initialValues ? 'Edit Task' : 'New Task'}
        </Text>

        {/* Title */}
        <ThemedTextInput
          label="Task Title"
          icon="text"
          value={title}
          onChangeText={changeTitle}
          placeholder="What do you need to do?"
        />

        {/* Fields */}
        <View style={{ marginTop: spacing.sm }}>
          <FieldRow icon="calendar-range" label="Date" value={currentDate} onPress={() => setDateModal(true)} />
          <FieldRow icon="clock-outline" label="Time" value={currentTime} onPress={() => setTimeModal(true)} />
          <FieldRow icon="tag-outline" label="Category" value={categoryText} valueColor={catColor} onPress={() => setCategoryModal(true)} />
          <FieldRow icon="flag-outline" label="Priority" value={priorityText} valueColor={priColor} onPress={() => setPriorityModal(true)} />

          {/* Recurrence */}
          <RecurrencePicker value={recurrence} onChange={setRecurrence} />

          {/* Reminder */}
          <ReminderPicker value={reminder} onChange={setReminder} />
        </View>

        {/* Subtasks */}
        <View style={{ marginTop: spacing.md }}>
          <Text style={[typography.bodySmall, { color: colors.dark.textSecondary, marginBottom: spacing.sm }]}>
            Subtasks ({subtasks.length})
          </Text>

          {subtasks.map((st) => (
            <View
              key={st.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.dark.surface,
                borderRadius: borderRadius.sm,
                padding: spacing.sm,
                paddingLeft: spacing.md,
                marginBottom: spacing.xs,
              }}
            >
              <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={16} color={colors.dark.textMuted} style={{ marginRight: spacing.sm }} />
              <Text style={[typography.body, { color: colors.dark.text, flex: 1 }]}>{st.title}</Text>
              <TouchableOpacity onPress={() => removeSubtask(st.id)} style={{ padding: spacing.xs }}>
                <MaterialCommunityIcons name="close" size={18} color={colors.dark.error} />
              </TouchableOpacity>
            </View>
          ))}

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.dark.surface,
            borderRadius: borderRadius.sm,
            padding: spacing.xs,
            paddingLeft: spacing.md,
          }}>
            <TextInput
              style={[typography.body, { color: colors.dark.text, flex: 1, paddingVertical: spacing.xs }]}
              value={newSubtask}
              onChangeText={setNewSubtask}
              placeholder="Add subtask..."
              placeholderTextColor={colors.dark.textMuted}
              onSubmitEditing={addSubtask}
              returnKeyType="done"
            />
            <TouchableOpacity onPress={addSubtask} style={{ padding: spacing.sm }}>
              <MaterialCommunityIcons name="plus-circle" size={22} color={colors.dark.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Submit Button */}
        <GradientButton
          title={submitLabel}
          onPress={handleSubmit}
          loading={loading}
          style={{ marginTop: spacing.lg, marginBottom: spacing.xxl }}
        />
      </View>

      {/* Modals */}
      <DatePickerModal dateModal={dateModal} setDateModal={setDateModal} handleDateSelect={handleDateSelect} />
      <TimePickerModal timeModal={timeModal} setTimeModal={setTimeModal} handleTimeSelect={handleTimeSelect} />
      <Category categoryModal={categoryModal} setCategoryModal={setCategoryModal} handleCategorySelect={handleCategorySelect} />
      <Priority priorityModal={priorityModal} setPriorityModal={setPriorityModal} handlePrioritySelect={handlePrioritySelect} />
    </ScreenWrapper>
  );
}
