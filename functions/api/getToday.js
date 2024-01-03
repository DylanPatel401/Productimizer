import { activityData, taskData } from "../../screens/data";

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

function getActivity(currentDate){
  const currentActivity = [];
  for (let i = 0; i < activityData.length; i++) {
    const { frequency, dates } = activityData[i];
    if (
      frequency.type === "daily" ||
      (frequency.type === "weekly" &&
        frequency.daysOfWeek.includes(currentDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase().split(',')[0])) ||
      dates.some((date) => {
        const d = date.split('/');
        const activityDate = new Date(d[2], d[0] - 1, d[1], 0, 0, 0);
        return (
          activityDate.getFullYear() === currentDate.getFullYear() &&
          activityDate.getMonth() === currentDate.getMonth() &&
          activityDate.getDate() === currentDate.getDate()
        );
      })
    ) {
      currentActivity.push(activityData[i]);
    }
  }
  return currentActivity;
}
  
  
export {getTasks, getActivity}

