import { Text, View, TouchableOpacity, Modal } from 'react-native';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { colors, spacing, typography, borderRadius } from '../../styles/style';
import { TaskContext } from '../../screens/nested/main_screens/TaskContext';
import { deleteTask, updateTaskCompletion, getSingleTask } from '../../firebase/tasksActions';

const ActionButton = ({ icon, iconColor, label, onPress, bgColor }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onPress}
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: bgColor || colors.dark.surfaceElevated,
      borderRadius: borderRadius.md,
      padding: spacing.md,
      marginBottom: spacing.sm,
    }}
  >
    <MaterialCommunityIcons name={icon} size={22} color={iconColor || colors.dark.text} style={{ marginRight: spacing.md }} />
    <Text style={[typography.body, { color: colors.dark.text }]}>{label}</Text>
  </TouchableOpacity>
);

const ActionsModal = ({ modal, setModal, item_id }) => {
  const navigation = useNavigation();
  const { refreshAllTasks } = useContext(TaskContext);

  const markAsDone = async () => {
    await updateTaskCompletion(item_id);
    setModal(false);
    await refreshAllTasks();
  };

  const editT = async () => {
    const task = await getSingleTask(item_id);
    navigation.push("Edit Task", { editT: task });
    setModal(false);
  };

  const deleteT = async () => {
    await deleteTask(item_id);
    setModal(false);
    await refreshAllTasks();
  };

  const startT = async () => {
    const task = await getSingleTask(item_id);
    setModal(false);
    navigation.push('Stopwatch', { task });
  };

  return (
    <Modal visible={modal} animationType="slide" transparent={true}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setModal(false)}
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' }}
      >
        <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
          <View
            style={{
              backgroundColor: colors.dark.surface,
              borderTopLeftRadius: borderRadius.xl,
              borderTopRightRadius: borderRadius.xl,
              padding: spacing.lg,
              paddingBottom: spacing.xxl,
            }}
          >
            {/* Handle bar */}
            <View
              style={{
                width: 40,
                height: 4,
                borderRadius: 2,
                backgroundColor: colors.dark.textMuted,
                alignSelf: 'center',
                marginBottom: spacing.lg,
              }}
            />

            <Text style={[typography.h3, { color: colors.dark.text, marginBottom: spacing.md }]}>
              Task Actions
            </Text>

            <ActionButton icon="pencil-outline" label="Edit Task" onPress={editT} iconColor={colors.dark.primary} />
            <ActionButton icon="play-circle-outline" label="Start Timer" onPress={startT} iconColor={colors.dark.tertiary} />
            <ActionButton icon="check-circle-outline" label="Mark as Done" onPress={markAsDone} iconColor={colors.dark.success} />
            <ActionButton icon="trash-can-outline" label="Delete" onPress={deleteT} iconColor={colors.dark.error} bgColor={colors.dark.error + '15'} />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export { ActionsModal };
