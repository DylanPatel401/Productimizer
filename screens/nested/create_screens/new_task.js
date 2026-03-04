import { useContext } from 'react';
import TaskForm from '../../../functions/components/TaskForm';
import { createTask } from '../../../firebase/tasksActions';
import { FIREBASE_AUTH } from '../../../firebase/firebase';
import { TaskContext } from '../main_screens/TaskContext';

export default function NewTaskScreen({ navigation }) {
  const { refreshAllTasks } = useContext(TaskContext);

  const handleSubmit = async (values) => {
    await createTask({
      uid: FIREBASE_AUTH.currentUser.uid,
      title: values.title,
      date: values.date,
      time: values.time,
      category: values.category,
      priority: values.priority,
      subtasks: values.subtasks,
      recurrence: values.recurrence,
    });
    await refreshAllTasks();
  };

  return (
    <TaskForm
      onSubmit={handleSubmit}
      submitLabel="Add task"
    />
  );
}
