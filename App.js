import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/home';
import ActivityScreen from './screens/activity';
import CalendarScreen from './screens/calendar';
import MainScreen from './screens/main';
import ProfileScreen from './screens/profile';
import TaskScreen from './screens/task';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer> 
      <Stack.Navigator>
 
        <Stack.Screen name="Home" component={HomeScreen}   options={{headerShown: false}}/>
        <Stack.Screen name="Activity" component={ActivityScreen}   options={{headerShown: false}}/>
        <Stack.Screen name="Calendar" component={CalendarScreen}   options={{headerShown: false}}/>
        <Stack.Screen name="Main" component={MainScreen}/>
        <Stack.Screen name="Profile" component={ProfileScreen}   options={{headerShown: false}}/>
        <Stack.Screen name="Task" component={TaskScreen}   options={{headerShown: false}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}