import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTIFICATION_IDS_KEY = '@notification_ids';

// Configure how notifications appear when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function registerForPushNotifications() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Notification permissions not granted');
    return false;
  }

  return true;
}

export async function scheduleTaskReminder(task, minutesBefore = 30) {
  try {
    if (!task.date || !task.time || task.time.toLowerCase() === 'none') return null;

    const d = task.date.split('/');
    const t = task.time.split(':');
    const dueDate = new Date(d[0], d[1] - 1, d[2], parseInt(t[0]), parseInt(t[1]));

    // Subtract reminder time
    const triggerDate = new Date(dueDate.getTime() - minutesBefore * 60 * 1000);

    // Don't schedule if trigger is in the past
    if (triggerDate <= new Date()) return null;

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Task Reminder',
        body: `"${task.task || task.title}" is due ${minutesBefore === 0 ? 'now' : `in ${minutesBefore} minutes`}`,
        data: { taskId: task.taskID },
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: triggerDate,
      },
    });

    // Store the notification ID mapped to taskID
    await saveNotificationId(task.taskID || task.title, notificationId);
    return notificationId;
  } catch (error) {
    console.error('Error scheduling task reminder:', error);
    return null;
  }
}

export async function cancelTaskReminder(taskId) {
  try {
    const ids = await getNotificationIds();
    const notifId = ids[taskId];
    if (notifId) {
      await Notifications.cancelScheduledNotificationAsync(notifId);
      delete ids[taskId];
      await AsyncStorage.setItem(NOTIFICATION_IDS_KEY, JSON.stringify(ids));
    }
  } catch (error) {
    console.error('Error cancelling task reminder:', error);
  }
}

export async function scheduleDailySummary(hour = 8, minute = 0) {
  try {
    // Cancel existing daily summary first
    await cancelTaskReminder('__daily_summary__');

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Daily Summary',
        body: 'Check your tasks for today and stay productive!',
        data: { type: 'daily_summary' },
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      },
    });

    await saveNotificationId('__daily_summary__', notificationId);
    return notificationId;
  } catch (error) {
    console.error('Error scheduling daily summary:', error);
    return null;
  }
}

export async function cancelDailySummary() {
  await cancelTaskReminder('__daily_summary__');
}

export async function cancelAllNotifications() {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await AsyncStorage.removeItem(NOTIFICATION_IDS_KEY);
  } catch (error) {
    console.error('Error cancelling all notifications:', error);
  }
}

// Internal helpers
async function getNotificationIds() {
  try {
    const data = await AsyncStorage.getItem(NOTIFICATION_IDS_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

async function saveNotificationId(taskId, notifId) {
  try {
    const ids = await getNotificationIds();
    ids[taskId] = notifId;
    await AsyncStorage.setItem(NOTIFICATION_IDS_KEY, JSON.stringify(ids));
  } catch (error) {
    console.error('Error saving notification ID:', error);
  }
}
