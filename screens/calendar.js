import { Text, View, TouchableOpacity, StatusBar, TouchableHighlight, ScrollView, Image, Modal, StyleSheet} from 'react-native';
import { useContext, useState, useEffect} from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ActionsModal } from '../functions/components/actionsModal';
import { ColorContext } from '../styles/colorContext';
import { barHeight } from '../styles/style'; 
import { RenderCards } from '../functions/components/RenderCards';
import { getTasksGivenDate } from '../firebase/tasksActions';
import { FIREBASE_AUTH } from '../firebase/firebase';

export default function CalendarScreen({navigation}) {
  const color = useContext(ColorContext);
  
  const [dayIndex, setDayIndex] = useState(0);
  const [currentDate, setDate] = useState(new Date());
  const [actualDate, setActualDate] = useState(new Date());
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    async function getData(){
      const data = await getTasksGivenDate(FIREBASE_AUTH.currentUser.uid, actualDate)
     
      setTasks(data);
    }
    getData();
    setLoading(false);
  }, [])
  
  const fetchNewData = async(index) => {
    
    setLoading(true);
    const data = await getTasksGivenDate(FIREBASE_AUTH.currentUser.uid, addDaysToDate(currentDate, index))
    
    setTasks(data);
    setLoading(false);
  }

  const newDatePress = async(index) => {
    setDayIndex(index)
    setActualDate(addDaysToDate(currentDate, index))

    await fetchNewData(index);
  }
  const getDayOfWeekStr = (year, month, day) => (new Date(year, month, day).toLocaleDateString('en-US', { weekday: 'short' }));
  
  const goForward = async () => {
    setDate(prevDate => addDaysToDate(prevDate, 7))
    setActualDate(addDaysToDate(currentDate, dayIndex+7))
    await fetchNewData(dayIndex+7)
  };
  const goBackward = async () => { 
    setDate(prevDate => addDaysToDate(prevDate, -7))
    setActualDate(addDaysToDate(currentDate, dayIndex-7))
    await fetchNewData(dayIndex-7)

  };
  
  function addDaysToDate(date, daysToAdd) {
    var newDate = new Date(date);
    newDate.setDate(newDate.getDate() + daysToAdd);
    return newDate;
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
            onPress={()=> newDatePress(index)}
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
          {loading == false ?
            ( <RenderCards currentTasks={tasks}/> ) :
            (
              <View style={{flex:1, justifyContent: 'center'}}>
                <Text style={{textAlign:'center',color:'white'}}>
                  loading...
                </Text>
              </View>
            )
          }
        </View>

      
        <ActionsModal modal={modal} setModal={setModal} item_id={selectedItem}/>
 
      </View>
    );
  }
  
