import { Text, View, TouchableOpacity, Alert, Switch } from 'react-native';
import { FIREBASE_AUTH } from '../firebase/firebase';
import { useContext, useState, useEffect } from 'react';
import { Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { TaskContext } from './nested/main_screens/TaskContext';
import { colors, spacing, typography, borderRadius } from '../styles/style';
import GradientButton from '../functions/components/ui/GradientButton';
import ScreenWrapper from '../functions/components/ui/ScreenWrapper';
import { getNotificationPreferences, updateNotificationPreferences } from '../functions/notifications/notificationPreferences';
import { scheduleDailySummary, cancelDailySummary } from '../functions/notifications/notificationService';

export default function ProfileScreen() {
  const user = FIREBASE_AUTH.currentUser;
  const { todayTasks, completedTasks } = useContext(TaskContext);
  const [notifPrefs, setNotifPrefs] = useState(null);

  useEffect(() => {
    getNotificationPreferences().then(setNotifPrefs);
  }, []);

  const toggleNotifPref = async (key, value) => {
    const updated = await updateNotificationPreferences({ [key]: value });
    if (updated) {
      setNotifPrefs(updated);
      if (key === 'dailySummary') {
        if (value) {
          await scheduleDailySummary(updated.dailySummaryHour, updated.dailySummaryMinute);
        } else {
          await cancelDailySummary();
        }
      }
    }
  };

  const getInitials = () => {
    if (!user?.email) return '?';
    return user.email.charAt(0).toUpperCase();
  };

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: () => FIREBASE_AUTH.signOut() },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action is permanent and cannot be undone. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await FIREBASE_AUTH.currentUser.delete();
            } catch (error) {
              if (error.code === 'auth/requires-recent-login') {
                alert('Please log out and log back in before deleting your account.');
              } else {
                alert('Error deleting account: ' + error.message);
              }
            }
          },
        },
      ]
    );
  };

  return (
    <ScreenWrapper scrollable>
      {/* Avatar & User Info */}
      <LinearGradient
        colors={[colors.dark.primary + '30', colors.dark.background]}
        style={{ alignItems: 'center', paddingTop: spacing.xxl, paddingBottom: spacing.xl }}
      >
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: colors.dark.primary,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: spacing.md,
          }}
        >
          <Text style={[typography.h1, { color: '#FFFFFF' }]}>{getInitials()}</Text>
        </View>
        <Text style={[typography.h3, { color: colors.dark.text }]}>
          {user?.email?.split('@')[0] || 'User'}
        </Text>
        <Text style={[typography.bodySmall, { color: colors.dark.textSecondary, marginTop: spacing.xs }]}>
          {user?.email}
        </Text>
      </LinearGradient>

      {/* Quick Stats */}
      <View style={{ flexDirection: 'row', paddingHorizontal: spacing.md, marginBottom: spacing.lg }}>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.dark.surface,
            borderRadius: borderRadius.lg,
            padding: spacing.md,
            marginRight: spacing.sm,
            alignItems: 'center',
          }}
        >
          <Text style={[typography.h2, { color: colors.dark.primary }]}>{todayTasks.length}</Text>
          <Text style={[typography.caption, { color: colors.dark.textSecondary }]}>Today</Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.dark.surface,
            borderRadius: borderRadius.lg,
            padding: spacing.md,
            marginLeft: spacing.sm,
            alignItems: 'center',
          }}
        >
          <Text style={[typography.h2, { color: colors.dark.tertiary }]}>{completedTasks.length}</Text>
          <Text style={[typography.caption, { color: colors.dark.textSecondary }]}>Completed</Text>
        </View>
      </View>

      {/* Notifications Section */}
      {notifPrefs && (
        <View style={{ paddingHorizontal: spacing.md, marginBottom: spacing.lg }}>
          <Text style={[typography.bodySmall, { color: colors.dark.textMuted, marginBottom: spacing.sm, marginLeft: spacing.xs }]}>
            NOTIFICATIONS
          </Text>
          <View style={{ backgroundColor: colors.dark.surface, borderRadius: borderRadius.lg }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.dark.border }}>
              <MaterialCommunityIcons name="bell-outline" size={20} color={colors.dark.primary} style={{ marginRight: spacing.md }} />
              <Text style={[typography.body, { color: colors.dark.text, flex: 1 }]}>Notifications</Text>
              <Switch
                value={notifPrefs.enabled}
                onValueChange={(v) => toggleNotifPref('enabled', v)}
                trackColor={{ false: colors.dark.border, true: colors.dark.primary + '80' }}
                thumbColor={notifPrefs.enabled ? colors.dark.primary : colors.dark.textMuted}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.dark.border }}>
              <MaterialCommunityIcons name="clock-alert-outline" size={20} color={colors.dark.tertiary} style={{ marginRight: spacing.md }} />
              <Text style={[typography.body, { color: colors.dark.text, flex: 1 }]}>Task Reminders</Text>
              <Switch
                value={notifPrefs.taskReminder}
                onValueChange={(v) => toggleNotifPref('taskReminder', v)}
                trackColor={{ false: colors.dark.border, true: colors.dark.tertiary + '80' }}
                thumbColor={notifPrefs.taskReminder ? colors.dark.tertiary : colors.dark.textMuted}
                disabled={!notifPrefs.enabled}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.dark.border }}>
              <MaterialCommunityIcons name="calendar-check-outline" size={20} color={colors.dark.secondary} style={{ marginRight: spacing.md }} />
              <Text style={[typography.body, { color: colors.dark.text, flex: 1 }]}>Daily Summary</Text>
              <Switch
                value={notifPrefs.dailySummary}
                onValueChange={(v) => toggleNotifPref('dailySummary', v)}
                trackColor={{ false: colors.dark.border, true: colors.dark.secondary + '80' }}
                thumbColor={notifPrefs.dailySummary ? colors.dark.secondary : colors.dark.textMuted}
                disabled={!notifPrefs.enabled}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: spacing.md }}>
              <MaterialCommunityIcons name="volume-high" size={20} color={colors.dark.primary} style={{ marginRight: spacing.md }} />
              <Text style={[typography.body, { color: colors.dark.text, flex: 1 }]}>Sound</Text>
              <Switch
                value={notifPrefs.sound}
                onValueChange={(v) => toggleNotifPref('sound', v)}
                trackColor={{ false: colors.dark.border, true: colors.dark.primary + '80' }}
                thumbColor={notifPrefs.sound ? colors.dark.primary : colors.dark.textMuted}
                disabled={!notifPrefs.enabled}
              />
            </View>
          </View>
        </View>
      )}

      {/* Settings Section */}
      <View style={{ paddingHorizontal: spacing.md }}>
        <Text style={[typography.bodySmall, { color: colors.dark.textMuted, marginBottom: spacing.sm, marginLeft: spacing.xs }]}>
          ACCOUNT
        </Text>

        <View style={{ backgroundColor: colors.dark.surface, borderRadius: borderRadius.lg, marginBottom: spacing.lg }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: spacing.md,
              borderBottomWidth: 1,
              borderBottomColor: colors.dark.border,
            }}
            onPress={() => Linking.openURL('https://storyset.com/work')}
          >
            <MaterialCommunityIcons name="heart-outline" size={20} color={colors.dark.secondary} style={{ marginRight: spacing.md }} />
            <Text style={[typography.body, { color: colors.dark.text, flex: 1 }]}>Credits</Text>
            <Text style={[typography.caption, { color: colors.dark.textMuted }]}>Storyset</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color={colors.dark.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: spacing.md,
            }}
            onPress={handleDeleteAccount}
          >
            <MaterialCommunityIcons name="account-remove-outline" size={20} color={colors.dark.error} style={{ marginRight: spacing.md }} />
            <Text style={[typography.body, { color: colors.dark.error }]}>Delete Account</Text>
          </TouchableOpacity>
        </View>

        <GradientButton
          title="Log Out"
          onPress={handleLogout}
          variant="danger"
          style={{ marginBottom: spacing.xxl }}
        />
      </View>
    </ScreenWrapper>
  );
}
