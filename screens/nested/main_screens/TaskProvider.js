import React, { useState, useCallback } from 'react';
import { TaskContext } from './TaskContext';
import { getTodaysTasks, getPastTasks, getCompleted } from '../../../firebase/tasksActions';
import { FIREBASE_AUTH } from '../../../firebase/firebase';
import { scheduleTaskReminder, cancelTaskReminder } from '../../../functions/notifications/notificationService';
import { getNotificationPreferences } from '../../../functions/notifications/notificationPreferences';

export function TaskProvider({ children }) {
  const [todayTasks, setTodayTasks] = useState([]);
  const [pastdueTasks, setPastdueTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshAllTasks = useCallback(async () => {
    try {
      const uid = FIREBASE_AUTH.currentUser?.uid;
      if (!uid) return;

      const [todayData, pastData, completedData] = await Promise.all([
        getTodaysTasks(uid),
        getPastTasks(uid),
        getCompleted(uid),
      ]);

      setTodayTasks(todayData);
      setPastdueTasks(pastData);
      setCompletedTasks(completedData);
    } catch (error) {
      console.error('Error refreshing tasks:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const scheduleNotificationForTask = useCallback(async (task) => {
    try {
      const prefs = await getNotificationPreferences();
      if (!prefs.enabled || !prefs.taskReminder) return;
      await scheduleTaskReminder(task, prefs.reminderMinutesBefore);
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  }, []);

  const cancelNotificationForTask = useCallback(async (taskId) => {
    try {
      await cancelTaskReminder(taskId);
    } catch (error) {
      console.error('Error cancelling notification:', error);
    }
  }, []);

  const value = {
    todayTasks,
    setTodayTasks,
    pastdueTasks,
    setPastdueTasks,
    completedTasks,
    setCompletedTasks,
    refreshAllTasks,
    scheduleNotificationForTask,
    cancelNotificationForTask,
    loading,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}
