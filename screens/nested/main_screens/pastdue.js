import { View } from 'react-native';
import { useContext } from 'react';
import { TaskContext } from './TaskContext';
import { RenderCards } from '../../../functions/components/RenderCards';
import { colors } from '../../../styles/style';

export default function PastdueScreen() {
  const { pastdueTasks } = useContext(TaskContext);

  return (
    <View style={{ flex: 1, backgroundColor: colors.dark.background }}>
      <RenderCards currentTasks={pastdueTasks} renderDate={true} />
    </View>
  );
}
