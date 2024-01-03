import { Text, View, ImageBackground, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import { useState, useRef, useEffect} from 'react';
import { barHeight } from '../../styles/style';
import { ColorContext } from '../../styles/colorContext';
import { useContext } from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { activityData, taskData } from '../data';
import {LinearGradient} from 'expo-linear-gradient';

export default function StopwatchScreen({ route, navigation }) {
  const colorScheme = useContext(ColorContext);
  const {item_id} = route.params; 

  const findItemById = (itemId) => {
    const taskItem = taskData.find((item) => item.task_id === itemId);
    const activityItem = activityData.find((item) => item.activity_id === itemId);
    return taskItem || activityItem || null;
  };

  const item = findItemById(item_id);   

  const images = [
    require('./../../assets/background/1.png'), 
    require('./../../assets/background/2.png'),
    require('./../../assets/background/3.png'),
    require('./../../assets/background/4.png'),
    require('./../../assets/background/5.png'),
    require('./../../assets/background/6.jpg'),
    require('./../../assets/background/7.jpg'),
    require('./../../assets/background/8.jpg'),
  ];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  const Stopwatch = () => {
    const [timer, setTimer] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const countRef = useRef(null);// reference to the interval ID

    useEffect(() => {
      const intervalId = setInterval(() => {
        if (!isPaused) {
          setTimer((prevTimer) => prevTimer + 1);
        }
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, [isPaused]);

    const handlePause = () => {
      setIsPaused(true);
    };
  
    const handleContinue = () => {
      setIsPaused(false);
    };
  
    const handleReset = () => {
      clearInterval(countRef.current);
      setTimer(0);
    };

    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
  
    return (
      <View style={styles.container}>
        <View style={{flex:4.5, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>

          <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>

            <TouchableOpacity
              onPress={handleReset}
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <View>
                <MaterialCommunityIcons
                  name={'restart'}
                  color={colorScheme.primary}
                  size={barHeight}
                />
              </View>
            </TouchableOpacity> 

            <Text style={{fontFamily: 'lexend-bold', fontSize: barHeight, color:'white', textAlign:'center', margin:barHeight}}>
              {formatTime(timer)}
            </Text>
            
            <TouchableOpacity
              onPress={isPaused ? handleContinue : handlePause}
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <View>
                <MaterialCommunityIcons
                  name={isPaused ? 'play' : 'pause'}
                  color={colorScheme.primary}
                  size={barHeight}
                />
              </View>
            </TouchableOpacity>                       
          </View>


        </View>

  

      <View style={{flex:2, flexDirection:'row', paddingBottom: barHeight}}>
        <View style={{flex:1}}/>
          <TouchableOpacity
            onPress={() => {}}
            style={{flex:2, justifyContent: 'center', alignSelf: 'center'}}
          >
            <View style={{flex:1, justifyContent: 'center', borderWidth: 3, borderColor: colorScheme.primary, borderRadius: barHeight/2}}>
              <Text style={{fontFamily: 'lexend-bold', fontSize: barHeight/1.25, color:'white', textAlign:'center' }}>
                Done
              </Text>            
            </View>
          </TouchableOpacity>
        <View style={{flex:1}}/>
      </View>
    </View>
    );
  };  

      
  return (  
    <ImageBackground  
      source={getRandomImage()} // Adjust the path as needed
      style={{ flex: 10, resizeMode: 'cover', justifyContent: 'center', }}
    >
      <View style={{ padding: barHeight, flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', flexDirection:'row'}}>

        <View style={{flex:1}}>
          <TouchableOpacity
            onPress={() => navigation.pop()}
          >
            <View style={{ marginLeft: barHeight/10 }}>
              <MaterialCommunityIcons
                name={'arrow-left'}
                color={colorScheme.primary}
                size={barHeight}
              />
            </View>
          </TouchableOpacity>    
        </View>
        
        <View style={{flex:4}}>
          <Text style={{ textAlign: 'center', color:'white', fontSize: barHeight, fontFamily: 'lexend-regular'}}>
            {item.title ? item.title : item.task}  
          </Text>          
        </View>

        <View style={{flex:1, alignSelf: 'center'}}>
          <TouchableOpacity
            onPress={() => {}}
          >
            <View style={{alignItems: 'flex-end', marginRight: barHeight/10}}>
              <MaterialCommunityIcons
                name={'volume-high'}
                color={colorScheme.primary}
                size={barHeight}
              />
            </View>
          </TouchableOpacity>    
        </View>

      </View>

      <View style={{flex:5}}/>

      <View style={{flex:2}}>
        <Stopwatch/>
      </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  timerText: {
    fontSize: barHeight*2,
    marginBottom: barHeight,
    fontFamily: 'lexend-bold',
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#4285f4',
    padding: 15,                  
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily:'lexend-regular'
  },
});  