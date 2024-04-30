import React, { useState, useEffect, createContext} from 'react'
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {View,Text} from 'react-native'

import HomeScreen from './screens/home';
import CalendarScreen from './screens/calendar';
import MainScreen from './screens/main';
import ProfileScreen from './screens/profile';
import TaskScreen from './screens/task';
import StopwatchScreen from './screens/nested/stopwatch';

import AuthScreen from './screens_auth/auth';

import { ColorContext } from './styles/colorContext';
import { TaskContext } from './screens/nested/main_screens/TaskContext';

import { lightScheme, darkScheme } from './styles/style';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebase/firebase';



const Stack = createStackNavigator();
const currentColorPreference = 'dark'
const colorScheme = currentColorPreference == 'light' ? lightScheme : darkScheme;

import { getTodaysTasks, getPastTasks, getComepleted} from './firebase/tasksActions';

export default function App() {
  const [user, setUser] = useState(null);
  const [todayTasks, setTodayTasks] = useState([]);
  const [pastdueTasks, setPastdueTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {


    async function fetchData(){ 
      const todayData = await getTodaysTasks(FIREBASE_AUTH.currentUser.uid);
      setTodayTasks(todayData);
      
      const pastData = await getPastTasks(FIREBASE_AUTH.currentUser.uid);
      setPastdueTasks(pastData);   

      const completedData = await getComepleted(FIREBASE_AUTH.currentUser.uid);
      setCompletedTasks(completedData);

      console.log(todayData);
      setLoading(false);
    }
    if(user) fetchData();
  }, [user])

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      console.log("user");

    })    
  }, [])
  
  const AuthFlow = user ? (
    <>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={MainScreen} options={{unmountOnBlur: true}}/>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Task" component={TaskScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Stopwatch" component={StopwatchScreen} options={{ headerShown: false }} />    
    </>

  ) : (
    <>
      <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
    </>
  );

  return (
    <NavigationContainer>
      <ColorContext.Provider value={colorScheme}>
        <TaskContext.Provider value={{ todayTasks, setTodayTasks, pastdueTasks, setPastdueTasks, completedTasks, setCompletedTasks}}>
          {loading == false? (
            <Stack.Navigator>{AuthFlow}</Stack.Navigator>
          ) : (
            <View style={{flex:1, justifyContent: 'center'}}>
              <Text style={{textAlign: 'center'}}> 
                Loading...
              </Text>
            </View>
          )}
        </TaskContext.Provider>
      </ColorContext.Provider>
    </NavigationContainer>
  );
  
}

