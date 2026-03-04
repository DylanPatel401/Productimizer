import { useContext } from 'react';
import TaskForm from '../../../functions/components/TaskForm';
import { updateTask } from '../../../firebase/tasksActions';
import { TaskContext } from '../main_screens/TaskContext';

export default function EditTaskScreen({ route, navigation }) {
  const { refreshAllTasks } = useContext(TaskContext);
  const editT = route.params.editT;

  const handleSubmit = async (values) => {
    await updateTask({
      taskID: editT.taskID,
      task: values.title,
      date: values.date,
      category: values.category,
      priority: values.priority,
      time: values.time,
      subtasks: values.subtasks,
      recurrence: values.recurrence,
    });
    navigation.goBack();
    await refreshAllTasks();
  };

  return (
    <TaskForm
      initialValues={{
        title: editT.task,
        date: editT.date,
        time: editT.time,
        category: editT.category,
        priority: editT.priority,
        subtasks: editT.subtasks,
        recurrence: editT.recurrence,
      }}
      onSubmit={handleSubmit}
      submitLabel="Update task"
    />
  );
}
