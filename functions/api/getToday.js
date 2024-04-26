import {  taskData } from "../../screens/data";

function getTasks(currentDate){

  const currentTasks = [];

  for(let i = 0; i < taskData.length; i++){
    const d = taskData[i].date.split('/');
    const taskDate = new Date(d[2], d[0]-1, d[1], 0,0,0); 

    if(taskDate.getFullYear() == currentDate.getFullYear() && taskDate.getMonth() == currentDate.getMonth() && taskDate.getDate() == currentDate.getDate()){
      currentTasks.push(taskData[i]);
    }

  } 

  return currentTasks;
}


  
export {getTasks}

