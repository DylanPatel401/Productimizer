import { Text, View, TouchableOpacity, StatusBar, TouchableHighlight, ScrollView} from 'react-native';
import { useContext, useState, useEffect} from 'react';
import { ColorContext } from '../styles/colorContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { taskData, activityData } from './data';
const barHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 24;
 
function addDaysToDate(date, daysToAdd) {
  var newDate = new Date(date);
  newDate.setDate(newDate.getDate() + daysToAdd);
  return newDate;
}

export default function CalendarScreen({navigation}) {
  const color = useContext(ColorContext);
  const [dayIndex, setDayIndex] = useState(0);
  const [currentDate, setDate] = useState(new Date());
 
  const getDayOfWeekStr = (year, month, day) => (new Date(year, month, day).toLocaleDateString('en-US', { weekday: 'short' }));
  const goForward = () => {
    setDate(prevDate => addDaysToDate(prevDate, 7));
  }
 
  const goBackward = () => {
    setDate(prevDate => addDaysToDate(prevDate, -7));
  }

  const Week = () => { 
    const futureDays = [];

    for (let i = 0 ; i < 7; i++) {
      const tempDate = addDaysToDate(currentDate, i); 
      futureDays.push(getDayOfWeekStr(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()).split(',')[0]);
    }
     
    return(
      <View style={{flexDirection: 'row', backgroundColor: color.secondary}}>
        {futureDays.map((day, index) => (
          <TouchableOpacity 
            style={index != dayIndex ? {backgroundColor:'#272727', flex:1, margin: 5} : {backgroundColor:color.primary, flex:1, margin: 10} } 
            key={index} 
            onPress={ () => {setDayIndex(index)}}
          >
            <View style={{alignItems: 'center', margin: 5}}>
              <Text numberOfLines={1} style={{fontFamily: 'lexend-bold',fontSize: barHeight/2, color: ['Sat', 'Sun'].includes(day) ? '#FF4949' : 'white'}}> 
                {day} 
              </Text>
              <Text style={{fontSize: barHeight/2, fontFamily: 'lexend-regular', color: 'white', paddingTop: 10}}>
                {addDaysToDate(currentDate, index).getDate()}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
    );
  } 
 
  const Todo = () => {    
    return(
      <ScrollView style={{flex:3}}>

        {/* Tasks*/}
        <View style={{justifyContent: 'center'}}>
          <Text style={{fontSize: barHeight/1.25, marginTop: barHeight, fontFamily: 'lexend-bold', color:'white', textAlign: 'center'}}>
            Tasks:
          </Text>
        </View>

        {taskData.map((todo, index) => (
          <View key={index} style={{backgroundColor: color.secondary, margin: barHeight, marginBottom: 0, flex: 1,flexDirection:'row' }}>
            
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
      
        {/* Activity*/}
        <View style={{justifyContent: 'center'}}>
          <Text style={{fontSize: barHeight/1.25, marginTop: barHeight, fontFamily: 'lexend-bold', color:'white', textAlign: 'center'}}>
            Activity:
          </Text>
        </View>        

        {activityData.map((activity, index) => (
          <View key={index} style={{backgroundColor: color.secondary, margin: barHeight, marginBottom: 0, flex: 1,flexDirection:'row' }}>
            
            <TouchableHighlight style={{flex:1}} onPress={()=>{ alert('Edit Activity or start Activity?')}}>
 
              <View style={{flexDirection: 'row'}}>
                {/* Left priority color line*/}
                <View style={{flex:1, }}>
                  <View style={{ flex: 1,borderWidth: 2, backgroundColor: 'grey', width: '50%'}}>
                  </View>
                </View>  
 
                {/* Middle task & time*/}
                <View style={{flex:6,marginTop:barHeight, marginBottom: barHeight,}}>
                  <Text style={{color:'white', fontFamily: 'lexend-bold', marginBottom: barHeight/2}}>
                    {activity.title}
                  </Text>              
 
                  <Text style={{fontFamily: 'lexend-regular', color: '#AFAFAF'}}>
                    {activity.time}
                  </Text>
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
              <TouchableHighlight style={{color: 'blue'}} onPress={() => goBackward()}>
                <MaterialCommunityIcons name="arrow-left" color={color.primary} size={barHeight} />
              </TouchableHighlight>
            </View>
 
            <View style={{flex:2, justifyContent: 'center'}}>
              <Text style={{color: 'white', fontFamily: 'lexend-regular', textAlign: 'center', fontSize: barHeight*0.7}}>
                {currentDate.toLocaleString('default', { month: 'long' })}
              </Text>
              <Text style={{color: 'white', fontFamily: 'lexend-regular', textAlign: 'center'}}>
                {currentDate.getFullYear()}
              </Text>              
            </View>
 
            <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
              <TouchableHighlight style={{color: 'blue'}} onPress={() => goForward()}>
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
  