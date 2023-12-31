import { Text, View, ScrollView, TouchableHighlight, TouchableOpacity, } from 'react-native';
import { useContext } from 'react';
import { taskData, activityData } from '../../data';
import { barHeight } from '../../../styles/style';
import { ColorContext } from '../../../styles/colorContext';


export default function TodayScreen({navigation}) {
  const color = useContext(ColorContext);
  const actualDate = new Date();

  const Todo = () => {    

    const currentTasks = [];
    for(let i = 0; i < taskData.length; i++){
      const d = taskData[i].date.split('/');
      const taskDate = new Date(d[2], d[0]-1, d[1], 0,0,0); 
      

      if(taskDate.getFullYear() == actualDate.getFullYear() && 
          taskDate.getMonth() == actualDate.getMonth() &&
          taskDate.getDate() == actualDate.getDate()){
            currentTasks.push(taskData[i]);
          }
    }

    const currentActivity = [];
    for (let i = 0; i < activityData.length; i++) {
      const { frequency, dates } = activityData[i];
      if (
        frequency.type === "daily" ||
        (frequency.type === "weekly" &&
          frequency.daysOfWeek.includes(actualDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase().split(',')[0])) ||
        dates.some((date) => {
          const d = date.split('/');
          const activityDate = new Date(d[2], d[0] - 1, d[1], 0, 0, 0);
          return (
            activityDate.getFullYear() === actualDate.getFullYear() &&
            activityDate.getMonth() === actualDate.getMonth() &&
            activityDate.getDate() === actualDate.getDate()
          );
        })
      ) {
        currentActivity.push(activityData[i]);
      }
    }
    

    const Tasks = () => {
      return( 
        <View>
          <View style={{justifyContent: 'center'}}>
            <Text style={{fontSize: barHeight/1.25, marginTop: barHeight, fontFamily: 'lexend-bold', color:'black', textAlign: 'center'}}>
              Tasks:
            </Text>
          </View>

          {currentTasks.map((todo, index) => (
            <View key={index} style={{backgroundColor: color.secondary, margin: barHeight, marginBottom: 0, flex: 1,flexDirection:'row' }}>
              
              <TouchableHighlight style={{flex:1}} onPress={()=>{ 
                setSelectedItem(todo.task_id)
                setModal(true)}
              }>
  
                <View style={{flexDirection: 'row'}}>
                  {/* Left priority color line*/}
                  <View style={{flex:1, }}>
                    <View style={{ flex: 1,borderWidth: 2, backgroundColor: todo.level ? todo.level : 'grey', width: '50%'}}>
                    </View>
                  </View>  
  
                  {/* Middle task & time*/}
                  <View style={{flex:4,marginTop:barHeight, marginBottom: barHeight,}}>
                    <Text style={{color:'white', fontFamily: 'lexend-bold', marginBottom: barHeight/2}}>
                      {todo.task}
                    </Text>              
  
                    <Text style={{fontFamily: 'lexend-regular', color: '#AFAFAF'}}>
                      {new Date(`2023-12-31 ${todo.time}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
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
        </View>

      );
    }

    const Activity = () => {
      return (
        <View>
          <View style={{justifyContent: 'center'}}>
            <Text style={{fontSize: barHeight/1.25, marginTop: barHeight, fontFamily: 'lexend-bold', color:'black', textAlign: 'center'}}>
              Activity:
            </Text>
          </View>        

          {currentActivity.map((activity, index) => (
            <View key={index} style={{backgroundColor: color.secondary, margin: barHeight, marginBottom: 0, flex: 1,flexDirection:'row' }}>
              
              <TouchableHighlight style={{flex:1}} onPress={()=>{
                setSelectedItem(activity.activity_id)               
                setModal(true)}}>
  
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
                      {new Date(`2023-12-31 ${activity.time}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                    </Text>
                  </View>             
              
                        
                </View>
  
              </TouchableHighlight>
  
  
  
            </View>
          ))}          
        </View>
      )
    }

    return(
      <ScrollView style={{flex:3}}>
        {
          currentTasks.length == 0 ? null :  <Tasks/>
        }

        {
          currentActivity.length == 0 ? null :  <Activity/>
        }       

        {
          currentActivity.length == 0 && currentTasks.length == 0 ? 
          (
            <View style={{flex:1}}>
              <NoData/>
            </View>
          ) :
          (
            null
          )
        }

      </ScrollView>
    );
  }
 
    return (
      <View style={{flex:1}}>
        <Todo/>
      </View>
    );
  }
  
