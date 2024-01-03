import { taskData } from "../../screens/data";


function getTasks(currentDate){

  const currentTasks = [];
  
  for(let i = 0; i < taskData.length; i++){
    const { date, time } = taskData[i];
    const d = date.split('/');
    const taskDate = new Date(d[2], d[0] - 1, d[1], ...time.split(':'), 0); 
  
    if (taskDate < currentDate) {
      currentTasks.push(taskData[i]);
    }
  }
  

  return currentTasks;
}
  
export {getTasks}

