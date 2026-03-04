import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../../styles/style';
import GradientButton from './ui/GradientButton';

const PATTERNS = [
  { key: 'daily', label: 'Daily', icon: 'calendar-today' },
  { key: 'weekly', label: 'Weekly', icon: 'calendar-week' },
  { key: 'monthly', label: 'Monthly', icon: 'calendar-month' },
];

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function RecurrencePicker({ value, onChange }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [pattern, setPattern] = useState(value?.pattern || 'daily');
  const [selectedDays, setSelectedDays] = useState(value?.daysOfWeek || [1, 2, 3, 4, 5]);
  const [interval, setInterval] = useState(value?.interval || 1);

  const toggleDay = (dayIndex) => {
    if (selectedDays.includes(dayIndex)) {
      if (selectedDays.length > 1) {
        setSelectedDays(selectedDays.filter(d => d !== dayIndex));
      }
    } else {
      setSelectedDays([...selectedDays, dayIndex].sort());
    }
  };

  const handleSave = () => {
    onChange({
      enabled: true,
      pattern,
      interval,
      daysOfWeek: pattern === 'weekly' ? selectedDays : null,
      dayOfMonth: pattern === 'monthly' ? new Date().getDate() : null,
      endDate: null,
    });
    setModalVisible(false);
  };

  const handleClear = () => {
    onChange(null);
    setModalVisible(false);
  };

  const getLabel = () => {
    if (!value?.enabled) return 'None';
    if (value.pattern === 'daily') return value.interval > 1 ? `Every ${value.interval} days` : 'Daily';
    if (value.pattern === 'weekly') return value.interval > 1 ? `Every ${value.interval} weeks` : 'Weekly';
    if (value.pattern === 'monthly') return 'Monthly';
    return 'Custom';
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
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
        <MaterialCommunityIcons name="repeat" size={20} color={colors.dark.primary} style={{ marginRight: spacing.md }} />
        <Text style={[typography.body, { color: colors.dark.textSecondary, flex: 1 }]}>Repeat</Text>
        <Text style={[typography.body, { color: value?.enabled ? colors.dark.primary : colors.dark.text }]}>
          {getLabel()}
        </Text>
        <MaterialCommunityIcons name="chevron-right" size={18} color={colors.dark.textMuted} style={{ marginLeft: spacing.xs }} />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' }}
        >
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
            <View style={{
              backgroundColor: colors.dark.surface,
              borderTopLeftRadius: borderRadius.xl,
              borderTopRightRadius: borderRadius.xl,
              padding: spacing.lg,
              paddingBottom: spacing.xxl,
            }}>
              <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: colors.dark.textMuted, alignSelf: 'center', marginBottom: spacing.lg }} />

              <Text style={[typography.h3, { color: colors.dark.text, marginBottom: spacing.lg }]}>
                Repeat Pattern
              </Text>

              {/* Pattern selector */}
              <View style={{ flexDirection: 'row', marginBottom: spacing.lg }}>
                {PATTERNS.map(p => (
                  <TouchableOpacity
                    key={p.key}
                    onPress={() => setPattern(p.key)}
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      paddingVertical: spacing.md,
                      marginHorizontal: spacing.xs,
                      borderRadius: borderRadius.md,
                      backgroundColor: pattern === p.key ? colors.dark.primary : colors.dark.surfaceElevated,
                    }}
                  >
                    <MaterialCommunityIcons name={p.icon} size={22} color={pattern === p.key ? '#FFF' : colors.dark.textMuted} />
                    <Text style={[typography.caption, { color: pattern === p.key ? '#FFF' : colors.dark.textSecondary, marginTop: 4 }]}>
                      {p.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Weekly day selector */}
              {pattern === 'weekly' && (
                <View style={{ marginBottom: spacing.lg }}>
                  <Text style={[typography.bodySmall, { color: colors.dark.textSecondary, marginBottom: spacing.sm }]}>
                    Repeat on
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    {DAYS_OF_WEEK.map((day, i) => (
                      <TouchableOpacity
                        key={i}
                        onPress={() => toggleDay(i)}
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          paddingVertical: spacing.sm,
                          marginHorizontal: 2,
                          borderRadius: borderRadius.sm,
                          backgroundColor: selectedDays.includes(i) ? colors.dark.primary : colors.dark.surfaceElevated,
                        }}
                      >
                        <Text style={{
                          fontFamily: 'lexend-bold',
                          fontSize: 12,
                          color: selectedDays.includes(i) ? '#FFF' : colors.dark.textMuted,
                        }}>
                          {day}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {/* Action buttons */}
              <View style={{ flexDirection: 'row' }}>
                <GradientButton title="Remove" onPress={handleClear} variant="outline" style={{ flex: 1, marginRight: spacing.sm }} />
                <GradientButton title="Save" onPress={handleSave} style={{ flex: 1, marginLeft: spacing.sm }} />
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
