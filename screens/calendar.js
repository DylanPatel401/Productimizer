import { Text, View, TouchableOpacity, StatusBar, TouchableHighlight, } from 'react-native';
import { useContext, useState} from 'react';
import { ColorContext } from '../styles/colorContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const barHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 24;


export default function CalendarScreen({navigation}) {
  const color = useContext(ColorContext);
  const [dayIndex, setDayIndex] = useState(0);
  
  const Week = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date()
    const currentDayIndex =  date.getDay();

    const futureDays = [];
    for (let i = currentDayIndex ; i <= currentDayIndex + 6; i++) {
      futureDays.push(days[i % 7]);
    }

    const goForward = (index) => {
      setDayIndex(index)
    }

    const goBackward = () => {
    }
    return(
      <View style={{flexDirection: 'row', backgroundColor: color.secondary}}>
        {futureDays.map((day, index) => (
          <TouchableOpacity 
            style={index != dayIndex ? {backgroundColor:'#272727', flex:1, margin: 5} : {backgroundColor:color.primary, flex:1, margin: 10} } 
            key={index} 
            onPress={ () => {goForward(index)}}
          >
            <View style={{alignItems: 'center', margin: 5}}>
              <Text numberOfLines={1} style={{fontFamily: 'lexend-bold',fontSize: barHeight/2, color: ['Sat', 'Sun'].includes(day) ? '#FF4949' : 'white'}}> {day} </Text>
              <Text style={{fontSize: barHeight/2, fontFamily: 'lexend-regular', color: 'white', paddingTop: 10}}>{new Date().getDate() + (index)}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
    );
  } 

  return (
    
      <View style={{flex:10, backgroundColor: color.background}}>
        <StatusBar hidden />

        <View style={{flex:1, backgroundColor: color.secondary}}>
          <View style={{flex:1, flexDirection:'row'}}>
            <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
              <TouchableHighlight style={{color: 'blue'}} onPress={() => {}}>
                <MaterialCommunityIcons name="arrow-left" color={color.primary} size={barHeight} />
              </TouchableHighlight>


            </View>

            <View style={{flex:2, justifyContent: 'center'}}>
              <Text style={{color: 'white', fontFamily: 'lexend-regular', textAlign: 'center', fontSize: barHeight*0.7}}>
                {new Date().toLocaleString('default', { month: 'long' })}
              </Text>
              <Text style={{color: 'white', fontFamily: 'lexend-regular', textAlign: 'center'}}>
                {new Date().getFullYear()}
              </Text>              
            </View>

            <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
              <TouchableHighlight style={{color: 'blue'}} onPress={() => {}}>
                <MaterialCommunityIcons name="arrow-right" color={color.primary} size={barHeight} />
              </TouchableHighlight>
            </View>

          </View>

            <Week/>                
        </View>
    
        

        <View style={{flex:4}}>

        </View>
      </View>
    );
  }
  
