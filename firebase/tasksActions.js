import { collection, doc, addDoc, getDoc, updateDoc, deleteDoc, arrayUnion, arrayRemove, serverTimestamp, query, where, getDocs, Query} from 'firebase/firestore';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../firebase/firebase'
import { useContext, useEffect, useState, useCallback} from 'react';


export async function getTasks(uid){
  try{
    const querySnapshot = await getDocs(
        query(collection(FIRESTORE_DB, 'Tasks'), where('owner', '==', uid))
    );

    if(querySnapshot.empty) {
      return [];
    }else{
      const tasks = []
      querySnapshot.forEach(async doc => {
          const tempData = doc.data();
          tempData.taskID = doc.id;
          tasks.push(tempData);
        })
      return tasks;
    }
  }catch(error){
    console.log(error);
    return alert(error);
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
        where('date', '==', formatDate)
      )
    );

    if (querySnapshot.empty) {
      return [];
    } else {
      const tasks = [];
      querySnapshot.forEach(doc => {
        const tempData = doc.data();
        tempData.taskID = doc.id;
        tasks.push(tempData);
      });
      console.log(tasks);
      console.log("++^^++");
      return tasks;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export async function getTodaysTasks(uid){
  const tasks = await getTasks(uid);
  if(!tasks) return [];

  const currentTasks = [];
  const currentDate = new Date();

  for(let i = 0; i < tasks.length; i++){
    const d = tasks[i].date.split('/');
    const taskDate = new Date(d[0], d[1]-1, d[2], 0,0,0); 
    if(taskDate.getFullYear() == currentDate.getFullYear() && taskDate.getMonth() == currentDate.getMonth() && taskDate.getDate() == currentDate.getDate()
      && tasks[i].completed_at == "" 
    ){
      currentTasks.push(tasks[i]);
    }

  } 
  return currentTasks;
}

export async function getPastTasks(uid) {
  try {
    const taskData = await getTasks(uid);
    const currentTasks = [];
    const currentDate = new Date();
    for(let i = 0; i < taskData.length; i++){
      const { date, time } = taskData[i];
      const d = date.split('/');
      const taskDate = new Date(d[0], d[1] - 1, d[2], ...time.split(':'), 0); 
      if (taskDate < currentDate && taskData[i].completed_at == "") {
        currentTasks.push(taskData[i]);
      }
    }


    return currentTasks;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getComepleted(uid){
  const tasks = await getTasks(uid);
  let currentTasks = [];
  for(let i = 0; i < tasks.length; i++){
    if(tasks[i].completed_at != ""){
      currentTasks.push(tasks[i]);
    }
  }
  return currentTasks;

}

export async function createTask ({uid,title,category,date,time,priority}) {
    
  const newTaskData = {
    task: title,
    category: category,
    date: date,
    time: time,
    priority: priority,
    owner:uid,
    completed_at: "",
  }
  

    try{
      const taskRef = collection(FIRESTORE_DB, 'Tasks');
      await addDoc(taskRef, newTaskData);

    }catch(err){
        console.log(err);
        return alert(err);
    }

};

export async function deleteTask(taskId) {
  try {
    const taskDocRef = doc(FIRESTORE_DB, 'Tasks', taskId);
    await deleteDoc(taskDocRef);

  } catch (error) {
    console.error('Error deleting task: ', error);
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
    console.error('Error updating task completion time: ', error);
    throw error;
  }
}

