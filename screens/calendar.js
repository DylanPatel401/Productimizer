import { Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { RenderCards } from '../functions/components/RenderCards';
import { getTasksGivenDate } from '../firebase/tasksActions';
import { FIREBASE_AUTH } from '../firebase/firebase';
import { colors, spacing, typography, borderRadius } from '../styles/style';

export default function CalendarScreen() {
  const [dayIndex, setDayIndex] = useState(0);
  const [currentDate, setDate] = useState(new Date());
  const [actualDate, setActualDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const data = await getTasksGivenDate(FIREBASE_AUTH.currentUser.uid, actualDate);
      setTasks(data);
      setLoading(false);
    }
    getData();
  }, []);

  const fetchNewData = async (index) => {
    setLoading(true);
    const data = await getTasksGivenDate(FIREBASE_AUTH.currentUser.uid, addDaysToDate(currentDate, index));
    setTasks(data);
    setLoading(false);
  };

  const newDatePress = async (index) => {
    setDayIndex(index);
    setActualDate(addDaysToDate(currentDate, index));
    await fetchNewData(index);
  };

  const getDayOfWeekStr = (year, month, day) =>
    new Date(year, month, day).toLocaleDateString('en-US', { weekday: 'short' });

  const goForward = async () => {
    setDate(prevDate => addDaysToDate(prevDate, 7));
    setActualDate(addDaysToDate(currentDate, dayIndex + 7));
    await fetchNewData(dayIndex + 7);
  };

  const goBackward = async () => {
    setDate(prevDate => addDaysToDate(prevDate, -7));
    setActualDate(addDaysToDate(currentDate, dayIndex - 7));
    await fetchNewData(dayIndex - 7);
  };

  function addDaysToDate(date, daysToAdd) {
    var newDate = new Date(date);
    newDate.setDate(newDate.getDate() + daysToAdd);
    return newDate;
  }

  const isToday = (date) => {
    const today = new Date();
    return date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate();
  };

  const Week = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const tempDate = addDaysToDate(currentDate, i);
      const dayStr = getDayOfWeekStr(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()).split(',')[0];
      const dayNum = tempDate.getDate();
      const selected = i === dayIndex;
      const todayHighlight = isToday(tempDate);

      days.push(
        <TouchableOpacity
          key={i}
          onPress={() => newDatePress(i)}
          style={{
            flex: 1,
            alignItems: 'center',
            paddingVertical: spacing.sm,
            marginHorizontal: 2,
            borderRadius: borderRadius.md,
            backgroundColor: selected ? colors.dark.primary : 'transparent',
          }}
        >
          <Text
            style={{
              fontFamily: 'lexend-regular',
              fontSize: 11,
              color: selected ? '#FFFFFF' : colors.dark.textMuted,
              marginBottom: 4,
            }}
          >
            {dayStr}
          </Text>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: selected ? 'rgba(255,255,255,0.2)' : todayHighlight ? colors.dark.primary + '30' : 'transparent',
            }}
          >
            <Text
              style={{
                fontFamily: 'lexend-bold',
                fontSize: 15,
                color: selected ? '#FFFFFF' : todayHighlight ? colors.dark.primary : colors.dark.text,
              }}
            >
              {dayNum}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <View style={{ flexDirection: 'row', paddingHorizontal: spacing.sm, paddingVertical: spacing.sm }}>
        {days}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.dark.background }}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <LinearGradient
        colors={[colors.dark.primary + '25', colors.dark.background]}
        style={{ paddingTop: spacing.xxl + spacing.md }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md, marginBottom: spacing.md }}>
          <TouchableOpacity onPress={goBackward} style={{ padding: spacing.sm }}>
            <MaterialCommunityIcons name="chevron-left" color={colors.dark.primary} size={28} />
          </TouchableOpacity>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={[typography.h3, { color: colors.dark.text }]}>
              {currentDate.toLocaleString('default', { month: 'long' })}
            </Text>
            <Text style={[typography.caption, { color: colors.dark.textSecondary }]}>
              {currentDate.getFullYear()}
            </Text>
          </View>

          <TouchableOpacity onPress={goForward} style={{ padding: spacing.sm }}>
            <MaterialCommunityIcons name="chevron-right" color={colors.dark.primary} size={28} />
          </TouchableOpacity>
        </View>

        <Week />
      </LinearGradient>

      {/* Tasks */}
      <View style={{ flex: 1 }}>
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={[typography.body, { color: colors.dark.textSecondary, textAlign: 'center' }]}>
              Loading...
            </Text>
          </View>
        ) : (
          <RenderCards currentTasks={tasks} />
        )}
      </View>
    </View>
  );
}
