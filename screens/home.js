import { TextInput, Text, View, StyleSheet, TouchableHighlight, Dimensions, StatusBar, FlatList, ActivityIndicator} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';

import ActivityScreen from './activity';
import MainScreen from './main';
import TaskScreen from './task';
import CalendarScreen from './calendar';
import ProfileScreen from './profile';

import { ColorContext } from '../styles/colorContext';
import { lightScheme, darkScheme } from '../styles/style';


var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
const barHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 24;


const Tab = createBottomTabNavigator();

const Main = () => { return(<MainScreen/>)}
const Calendar = () => {return(<CalendarScreen/>)}
const Task = () => {return(<TaskScreen/>)}
const Activity = () => {return(<ActivityScreen/>)}
const Profile = () => {return(<ProfileScreen/>)}




export default function HomeScreen({navigation}) {
    const [fontLoaded, setFontsLoaded] = useState(false);
    const colorScheme = useContext(ColorContext);

    useEffect(()=> {
        async function fontz() {
            await Font.loadAsync({
                'lexend-bold': require('./../assets/fonts/static/Lexend-Bold.ttf'),
                'lexend-extrabold': require('./../assets/fonts/static/Lexend-ExtraBold.ttf'),
                'lexend-regular': require('./../assets/fonts/static/Lexend-Regular.ttf'),
            })
            setFontsLoaded(true);
        }
        fontz();
    }, [])
    if(!fontLoaded){
        return (
            <View style={{flex:1, margin:30}}>
                <Text style={{fontSize: 54, textAlign: 'center'}}>
                    LOADING!!!!!
                </Text>
            </View>
          );
    }else{
        return (
            <ColorContext.Provider value={colorScheme}>
                <Tab.Navigator
                    activeColor="red"
                    inactiveColor="orange"
                    screenOptions={{
                        headerStyle: { backgroundColor: colorScheme.background},
                        tabBarStyle: { backgroundColor: colorScheme.secondary },
                        headerTintColor: '#fff',
                        headerTitleStyle: { fontWeight: 'bold'},
                        headerTitleAlign: 'center'
                    }}

                >   
            
                <Tab.Screen name="Main" component={Main}       
                    options={{
                    title: 'Home',
                    style:{margin:10},
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="home" color={color} size={deviceHeight/30} />
                    ), 
                    headerShown: false,
                    }}
                />
                <Tab.Screen name="Calendar" component={Calendar} 
                  options={{
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="calendar-clock" color={color} size={deviceHeight/30} />
                    ), 
                    headerShown: true,
                  }}
                />      
                
                <Tab.Screen name="Create" component={Task} 
                    options={{
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="plus-circle" color={color} size={deviceHeight/30} />
                    ), 
                    headerShown: false,
                    }}
                />      
                
                <Tab.Screen name="Activity" component={Activity} 
                    options={{
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="run-fast" color={color} size={deviceHeight/30} />
                    ), 
                    }}
                />      

                <Tab.Screen name="Profile" component={Profile} 
                    options={{
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={deviceHeight/30} />
                    ), 
                    }}
                />          
                </Tab.Navigator>              
            </ColorContext.Provider>

        );    
    }
   
}
  
