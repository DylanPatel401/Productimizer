import { collection, doc, addDoc, getDoc, updateDoc, deleteDoc, arrayUnion, arrayRemove, serverTimestamp, query, where, getDocs, Query} from 'firebase/firestore';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../firebase/firebase'

async function getTasks(uid){
  try{
    console.log(uid)
    const querySnapshot = await getDocs(
        query(collection(FIRESTORE_DB, 'Tasks'), where('owner', '==', uid))
    );

    if(querySnapshot.empty) {
      console.log("empty")
      return null;
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
  
export async function getTodaysTasks(uid){
  const tasks = await getTasks(uid);
  if(!tasks) return null;

  const currentTasks = [];
  const currentDate = new Date();

  for(let i = 0; i < tasks.length; i++){
    const d = tasks[i].date.split('/');
    const taskDate = new Date(d[2], d[0]-1, d[1], 0,0,0); 

    if(taskDate.getFullYear() == currentDate.getFullYear() && taskDate.getMonth() == currentDate.getMonth() && taskDate.getDate() == currentDate.getDate()){
      currentTasks.push(tasks[i]);
    }

  } 

  return currentTasks;
}


