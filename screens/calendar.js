import { Text, View, TouchableOpacity, StatusBar, TouchableHighlight, ScrollView} from 'react-native';
import { useContext, useState} from 'react';
import { ColorContext } from '../styles/colorContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
 
const barHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 24;
 
 
export default function CalendarScreen({navigation}) {
  const color = useContext(ColorContext);
  const [dayIndex, setDayIndex] = useState(0);
  const [displayPopup, setDisplayPopup] = useState(true);
 
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
 
  const Todo = () => {
    const data = [
      {task: 'Math ', category: 'homework', date: '12/23/2023', time: '5:00pm', notification: '1 hour before', level: '#ff8282'}, 
      {task: 'Science', category: 'homework', date: '12/23/2023', time: '5:00pm', notification: '1 hour before', level: '#fffd8d'}, 
      {task: 'CS homework', category: 'homework', date: '12/23/2023', time: '5:00pm', notification: '1 hour before', level: '#98FB98'}, 
      {task: 'English homework', category: 'homework', date: '12/23/2023', time: '5:00pm', notification: '1 hour before', level: '#ff9248'}, 
      {task: 'History homework', category: 'HOMEWORK', date: '12/23/2023', time: '5:00pm', notification: '1 hour before'}, 
 
    ]
    
    return(
      <ScrollView style={{flex:3}}>
        {data.map((todo, index) => (
          <View style={{backgroundColor: color.secondary, margin: barHeight, flex: 1,flexDirection:'row' }}>
            
 
 
            <TouchableHighlight style={{flex:1}} onPress={()=>{ alert('Edit task or start task?')}}>
 
              <View style={{flexDirection: 'row'}}>
                {/* Left priority color line*/}
                <View style={{flex:1, }}>
                  <View style={{ flex: 1,borderWidth: 2, backgroundColor: todo.level ? todo.level : 'grey', width: '50%'}}>
                  </View>
                </View>  
 
                {/* Middle task & time*/}
                <View style={{flex:3,marginTop:barHeight, marginBottom: barHeight,}}>
                  <Text style={{color:'white', fontFamily: 'lexend-bold', marginBottom: barHeight/2}}>
                    {todo.task}
                  </Text>              
 
                  <Text style={{fontFamily: 'lexend-regular', color: '#AFAFAF'}}>
                    {todo.time}
                  </Text>
                </View>             
 
                {/* right category name*/}
                <View style={{flex:3}}>
                  <View style={{flex:1,margin: barHeight, backgroundColor: '#809CFF', justifyContent: 'center', borderRadius: barHeight}}>
                    <Text style={{ color: 'white', fontFamily: 'lexend-regular', fontSize: barHeight/2, textAlign: 'center', alignItems: 'center'}}>
                      {todo.category}
                    </Text>
                  </View>
                </View>                                  
              </View>
 
            </TouchableHighlight>
 
 
 
          </View>
        ))}
      
      </ScrollView>
    );
  }
 
  
  return (
    
      <View style={{flex:10, backgroundColor: color.background}}>
        <StatusBar hidden />
 
        {/* Calendar bar*/}
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
    
        <View style={{flex:3,}}>
          <Todo/>
          
        </View>
 
      </View>
    );
  }
  