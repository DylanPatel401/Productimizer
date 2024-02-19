import React, { useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/home';
import ActivityScreen from './screens/activity';
import CalendarScreen from './screens/calendar';
import MainScreen from './screens/main';
import ProfileScreen from './screens/profile';
import TaskScreen from './screens/task';
import StopwatchScreen from './screens/nested/stopwatch';

import AuthScreen from './screens_auth/auth';

import { ColorContext } from './styles/colorContext';
import { lightScheme, darkScheme } from './styles/style';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebase/firebase';


const Stack = createStackNavigator();
const currentColorPreference = 'dark'
const colorScheme = currentColorPreference == 'light' ? lightScheme : darkScheme;


export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      console.log(user);
    })
  }, [])
  const AuthFlow = user ? (
    <>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Activity" component={ActivityScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={MainScreen} />
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
        <Stack.Navigator>{AuthFlow}</Stack.Navigator>
      </ColorContext.Provider>
    </NavigationContainer>
  );
}
