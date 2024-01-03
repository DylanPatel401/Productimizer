const taskData = [
  {task_id: 101, task: 'Math i dont want to do stats next year ): ', category: 'homework', date: '1/2/2024',   time: '18:43', completed_at: null, notification: '1 hour before', level: '#ff8282'}, 
  {task_id: 201, task: 'Science', category: 'homework', date: '12/31/2023', time: '17:00', completed_at: null, notification: '1 hour before', level: '#fffd8d'}, 
  {task_id: 301, task: 'CS home', category: 'homework', date: '12/31/2023', time: '17:00', completed_at: null, notification: '1 hour before', level: '#98FB98'}, 
  {task_id: 401, task: 'English homework', category: 'homework', date: '12/31/2023', time: '23:10', completed_at: 'done fucker', notification: '1 hour before', level: '#98FB98'}, 
]

const activityData = [
  {
    activity_id: 102,
    title: 'reading',
    time: '17:00', // Using 24-hour format for time
    dates: ['12/29/2023', '12/30/2023'], // Using ISO 8601 format for date
    notificationInMin: 60,
    duration: 120,
    frequency: { type: 'daily' }, // optional
    occurrences: [
      {
        date: '2023/12/31',
        completed: false,
        duration: 0, // Duration in minutes 
        notes: '',
      },
      // Add more occurrences as needed
    ],
  },
  {
    activity_id: 202,
    title: 'gym', 
    time: '17:00', // Using 24-hour format for time
    dates: ['12/30/2023'], // Using ISO 8601 format for date
    notificationInMin: 60,
    duration: 120,
    frequency: { type: 'weekly', daysOfWeek: ['Monday', 'Wednesday'] }, // optional
    occurrences: [
      {
        date: '2023/12/1',
        completed: false,
        duration: 0, // Duration in minutes
        notes: '',
      },
      // Add more occurrences as needed
    ],
  },  
  {
    title: 'coding', 
    time: '17:00', // Using 24-hour format for time
    dates: ['12/30/2023'], // Using ISO 8601 format for date
    notificationInMin: 60,
    duration: 120,
    frequency: { type: 'weekly', daysOfWeek: ['monday', 'wednesday'] }, // optional
    occurrences: [
      {
        date: '2023/12/1',
        completed: false,
        duration: 0, // Duration in minutes
        notes: '',
      },
      // Add more occurrences as needed
    ],
  },  

]


const userData = {
  
}

export {taskData, activityData}