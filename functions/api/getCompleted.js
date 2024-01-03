import {  taskData } from "../../screens/data";

function getTasks(){

  const currentTasks = [];

  for(let i = 0; i < taskData.length; i++){
    if(taskData[i].completed_at){
      currentTasks.push(taskData[i]);
    }
  } 

  return currentTasks;
}
  
export {getTasks}

