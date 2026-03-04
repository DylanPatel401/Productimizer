import { collection, doc, addDoc, getDoc, updateDoc, deleteDoc, arrayUnion, arrayRemove, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../firebase/firebase';

export async function getTasks(uid) {
  try {
    const querySnapshot = await getDocs(
      query(collection(FIRESTORE_DB, 'Tasks'), where('owner', '==', uid))
    );

    if (querySnapshot.empty) {
      return [];
    }

    const tasks = [];
    querySnapshot.forEach(doc => {
      const tempData = doc.data();
      tempData.taskID = doc.id;
      tasks.push(tempData);
    });
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
}

export async function getSingleTask(taskID) {
  try {
    const docSnapshot = await getDoc(doc(FIRESTORE_DB, 'Tasks', taskID));

    if (docSnapshot.exists()) {
      const taskData = docSnapshot.data();
      taskData.taskID = docSnapshot.id;
      return taskData;
    }
    return null;
  } catch (error) {
    console.error('Error fetching single task:', error);
    return null;
  }
}

export async function getTasksGivenDate(uid, date) {
  try {
    const month = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
    const day = (date.getDate() < 10 ? '0' : '') + date.getDate();
    const formatDate = `${date.getFullYear()}/${month}/${day}`;

    const querySnapshot = await getDocs(
      query(collection(FIRESTORE_DB, 'Tasks'),
        where('owner', '==', uid),
        where('date', '==', formatDate),
        where('completed_at', "==", "")
      )
    );

    if (querySnapshot.empty) {
      return [];
    }

    const tasks = [];
    querySnapshot.forEach(doc => {
      const tempData = doc.data();
      tempData.taskID = doc.id;
      tasks.push(tempData);
    });
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks for date:', error);
    return [];
  }
}

export async function getTodaysTasks(uid) {
  try {
    const tasks = await getTasks(uid);
    if (!tasks) return [];

    const currentTasks = [];
    const currentDate = new Date();

    for (let i = 0; i < tasks.length; i++) {
      const d = tasks[i].date.split('/');
      const taskDate = new Date(d[0], d[1] - 1, d[2], 0, 0, 0);
      if (taskDate.getFullYear() == currentDate.getFullYear() && taskDate.getMonth() == currentDate.getMonth() && taskDate.getDate() == currentDate.getDate()
        && tasks[i].completed_at == ""
      ) {
        currentTasks.push(tasks[i]);
      }
    }
    return currentTasks;
  } catch (error) {
    console.error('Error fetching today tasks:', error);
    return [];
  }
}

export async function getPastTasks(uid) {
  try {
    const taskData = await getTasks(uid);
    if (!taskData) return [];

    const currentTasks = [];
    const currentDate = new Date();
    for (let i = 0; i < taskData.length; i++) {
      const { date, time } = taskData[i];
      const d = date.split('/');
      const taskDate = new Date(d[0], d[1] - 1, d[2], ...time.split(':'), 0);
      if (taskDate < currentDate && taskData[i].completed_at == "") {
        currentTasks.push(taskData[i]);
      }
    }
    return currentTasks;
  } catch (error) {
    console.error('Error fetching past tasks:', error);
    return [];
  }
}

export async function getCompleted(uid) {
  try {
    const tasks = await getTasks(uid);
    if (!tasks) return [];

    const currentTasks = [];
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].completed_at != "") {
        currentTasks.push(tasks[i]);
      }
    }
    return currentTasks;
  } catch (error) {
    console.error('Error fetching completed tasks:', error);
    return [];
  }
}

export async function createTask({ uid, title, category, date, time, priority, subtasks, recurrence }) {
  try {
    const newTaskData = {
      task: title,
      category,
      date,
      time,
      priority,
      owner: uid,
      completed_at: "",
      subtasks: subtasks || [],
      recurrence: recurrence || null,
      recurrence_parent_id: null,
      is_recurrence_template: recurrence?.enabled ? true : false,
      created_at: serverTimestamp(),
    };

    const taskRef = collection(FIRESTORE_DB, 'Tasks');
    const docRef = await addDoc(taskRef, newTaskData);

    // If recurring, generate instances for the next 2 weeks
    if (recurrence?.enabled) {
      await generateRecurringInstances(uid, docRef.id, newTaskData, 14);
    }

    return docRef.id;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

export async function deleteTask(taskId) {
  try {
    const taskDocRef = doc(FIRESTORE_DB, 'Tasks', taskId);
    await deleteDoc(taskDocRef);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}

export async function updateTaskCompletion(taskId) {
  try {
    const taskDocRef = doc(FIRESTORE_DB, 'Tasks', taskId);
    await updateDoc(taskDocRef, {
      completed_at: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating task completion:', error);
    throw error;
  }
}

export async function updateTask({ taskID, task, date, category, priority, time, subtasks, recurrence }) {
  try {
    const taskDocRef = doc(FIRESTORE_DB, 'Tasks', taskID);
    const updateData = { task, date, time, category, priority };
    if (subtasks !== undefined) updateData.subtasks = subtasks;
    if (recurrence !== undefined) updateData.recurrence = recurrence;
    await updateDoc(taskDocRef, updateData);
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

// ---- Subtask Functions ----

export async function addSubtask(taskId, subtaskTitle) {
  try {
    const subtask = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: subtaskTitle,
      completed: false,
      order: Date.now(),
    };
    const taskDocRef = doc(FIRESTORE_DB, 'Tasks', taskId);
    await updateDoc(taskDocRef, { subtasks: arrayUnion(subtask) });
    return subtask;
  } catch (error) {
    console.error('Error adding subtask:', error);
    throw error;
  }
}

export async function toggleSubtask(taskId, subtaskId) {
  try {
    const taskDoc = await getDoc(doc(FIRESTORE_DB, 'Tasks', taskId));
    if (!taskDoc.exists()) return;

    const subtasks = taskDoc.data().subtasks || [];
    const updated = subtasks.map(st =>
      st.id === subtaskId ? { ...st, completed: !st.completed } : st
    );
    await updateDoc(doc(FIRESTORE_DB, 'Tasks', taskId), { subtasks: updated });
  } catch (error) {
    console.error('Error toggling subtask:', error);
    throw error;
  }
}

export async function deleteSubtask(taskId, subtaskId) {
  try {
    const taskDoc = await getDoc(doc(FIRESTORE_DB, 'Tasks', taskId));
    if (!taskDoc.exists()) return;

    const subtasks = taskDoc.data().subtasks || [];
    const updated = subtasks.filter(st => st.id !== subtaskId);
    await updateDoc(doc(FIRESTORE_DB, 'Tasks', taskId), { subtasks: updated });
  } catch (error) {
    console.error('Error deleting subtask:', error);
    throw error;
  }
}

// ---- Recurrence Functions ----

function formatDateStr(date) {
  const month = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
  const day = (date.getDate() < 10 ? '0' : '') + date.getDate();
  return `${date.getFullYear()}/${month}/${day}`;
}

function getNextDates(recurrence, startDateStr, days) {
  const dates = [];
  const d = startDateStr.split('/');
  const start = new Date(d[0], d[1] - 1, d[2]);

  for (let i = 1; i <= days; i++) {
    const candidate = new Date(start);
    candidate.setDate(candidate.getDate() + i);

    if (recurrence.pattern === 'daily') {
      if (i % (recurrence.interval || 1) === 0) {
        dates.push(formatDateStr(candidate));
      }
    } else if (recurrence.pattern === 'weekly') {
      const dayOfWeek = candidate.getDay();
      const targetDays = recurrence.daysOfWeek || [start.getDay()];
      if (targetDays.includes(dayOfWeek) && Math.floor(i / 7) % (recurrence.interval || 1) === 0) {
        dates.push(formatDateStr(candidate));
      }
    } else if (recurrence.pattern === 'monthly') {
      const targetDay = recurrence.dayOfMonth || start.getDate();
      if (candidate.getDate() === targetDay) {
        dates.push(formatDateStr(candidate));
      }
    }

    if (recurrence.endDate && formatDateStr(candidate) > recurrence.endDate) break;
  }
  return dates;
}

export async function generateRecurringInstances(uid, templateId, templateData, daysAhead) {
  try {
    const recurrence = templateData.recurrence;
    if (!recurrence?.enabled) return;

    const futureDates = getNextDates(recurrence, templateData.date, daysAhead);

    // Check which instances already exist
    const existing = await getDocs(
      query(collection(FIRESTORE_DB, 'Tasks'),
        where('owner', '==', uid),
        where('recurrence_parent_id', '==', templateId)
      )
    );
    const existingDates = new Set();
    existing.forEach(doc => existingDates.add(doc.data().date));

    // Create missing instances
    const taskRef = collection(FIRESTORE_DB, 'Tasks');
    for (const date of futureDates) {
      if (!existingDates.has(date)) {
        await addDoc(taskRef, {
          task: templateData.task,
          category: templateData.category,
          time: templateData.time,
          priority: templateData.priority,
          owner: uid,
          completed_at: "",
          subtasks: templateData.subtasks || [],
          recurrence: null,
          recurrence_parent_id: templateId,
          is_recurrence_template: false,
          date,
          created_at: serverTimestamp(),
        });
      }
    }
  } catch (error) {
    console.error('Error generating recurring instances:', error);
  }
}

export async function stopRecurrence(templateTaskId) {
  try {
    const taskDocRef = doc(FIRESTORE_DB, 'Tasks', templateTaskId);
    const taskDoc = await getDoc(taskDocRef);
    if (!taskDoc.exists()) return;

    const recurrence = taskDoc.data().recurrence;
    if (recurrence) {
      await updateDoc(taskDocRef, {
        recurrence: { ...recurrence, enabled: false },
        is_recurrence_template: false,
      });
    }
  } catch (error) {
    console.error('Error stopping recurrence:', error);
    throw error;
  }
}

// ---- Analytics Queries ----

export async function getTasksInDateRange(uid, startDate, endDate) {
  try {
    const querySnapshot = await getDocs(
      query(collection(FIRESTORE_DB, 'Tasks'),
        where('owner', '==', uid),
        where('date', '>=', startDate),
        where('date', '<=', endDate)
      )
    );
    const tasks = [];
    querySnapshot.forEach(doc => {
      const data = doc.data();
      data.taskID = doc.id;
      tasks.push(data);
    });
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks in date range:', error);
    return [];
  }
}
