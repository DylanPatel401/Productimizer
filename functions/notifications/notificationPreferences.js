import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFS_KEY = '@notification_prefs';

const DEFAULT_PREFS = {
  enabled: true,
  taskReminder: true,
  reminderMinutesBefore: 30,
  dailySummary: true,
  dailySummaryHour: 8,
  dailySummaryMinute: 0,
  sound: true,
};

export async function getNotificationPreferences() {
  try {
    const data = await AsyncStorage.getItem(PREFS_KEY);
    if (data) {
      return { ...DEFAULT_PREFS, ...JSON.parse(data) };
    }
    return DEFAULT_PREFS;
  } catch {
    return DEFAULT_PREFS;
  }
}

export async function updateNotificationPreferences(updates) {
  try {
    const current = await getNotificationPreferences();
    const updated = { ...current, ...updates };
    await AsyncStorage.setItem(PREFS_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Error updating notification preferences:', error);
    return null;
  }
}
