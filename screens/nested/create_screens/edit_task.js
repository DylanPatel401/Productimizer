import { Text, View, StyleSheet, TextInput, KeyboardAvoidingView, SafeAreaView, TouchableOpacity, TouchableHighlight} from 'react-native';
import { useContext, useState} from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ColorContext } from '../../../styles/colorContext';
import { barHeight, priorityLevel} from '../../../styles/style';
import { Title, Priority, Category, DatePickerModal, TimePickerModal} from '../../../functions/components/createTasksModal';
import { categoryData } from '../../../styles/style';
import { getFormatedDate } from "react-native-modern-datepicker";

import { createTask } from '../../../firebase/tasksActions';
import { FIREBASE_AUTH } from '../../../firebase/firebase';
import { TaskContext } from '../main_screens/TaskContext';
import { getComepleted, getPastTasks, getTodaysTasks, updateTask} from '../../../firebase/tasksActions';

export default function EditTaskScreen({route,navigation}) {
  const scheme = useContext(ColorContext);
  const { todayTasks, setTodayTasks, pastdueTasks, setPastdueTasks, completedTasks, setCompletedTasks } = useContext(TaskContext);
  const editT = route.params.editT;
  const logoColor = scheme.primary 
  const logoSize = barHeight*1;
  const [title, changeTitle] = useState(editT.task);

  
  const startDate = editT.date;

  console.log(editT)
  const [priorityText, setPriorityText] = useState(editT.priority);
  const [categoryText, setCategoryText] = useState(editT.category);
  const [currentDate, setCurrentDate] = useState(startDate);
  const [currentTime, setCurrentTime] = useState(editT.time);


  const [priorityModal, setPriorityModal] = useState(false); 
  const [categoryModal, setCategoryModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const [timeModal, setTimeModal] = useState(false);
  
  const handlePrioritySelect = (priority) => {
    setPriorityText(priority);
    setPriorityModal(false);
  };

  const handleCategorySelect = (category) => {
    setCategoryText(category);
    setCategoryModal(false);
  };

  const handleDateSelect = (date) => {
    setCurrentDate(date);
    setDateModal(false);
  }

  const handleTimeSelect = (time) => {
    setCurrentTime(time);
    setTimeModal(false);
  }
  
  async function updateTaskPress () {
    console.log(`title: ${title} \nDate: ${currentDate} \n Time: ${currentTime} \n Category: ${categoryText}\nPriority: ${priorityText}`);
    if(!title) return alert("Please enter a title");

    await updateTask({taskID: editT.taskID, task:title, date: currentDate, category: categoryText, priority: priorityText, time: currentTime});
    navigation.goBack();
    const todayData = await getTodaysTasks(FIREBASE_AUTH.currentUser.uid);
    setTodayTasks(todayData);
    
    const pastData = await getPastTasks(FIREBASE_AUTH.currentUser.uid);
    setPastdueTasks(pastData);   

    const completedData = await getComepleted(FIREBASE_AUTH.currentUser.uid);
    setCompletedTasks(completedData);

   
  }
  
  return (
    <View style={{flex:2, backgroundColor: scheme.background}}>

      <SafeAreaView style={{flex:3}}>

          <View style={[styles.style]}>
            <View style={{justifyContent:'center', marginRight: barHeight}}>
              <MaterialCommunityIcons name="card-bulleted-outline" color={logoColor} size={logoSize} />
            </View>

            <View style={{flex:1, justifyContent: 'center'}}>
              <TextInput
                style={[scheme.text, {borderWidth: 2, borderRadius:10, paddingLeft: 15, borderColor:'grey', flex:1}]}
                onChangeText={changeTitle}
                value={title}
                placeholder={'Title..'}
                placeholderTextColor={'white'}
              />
            </View>
          </View>


          <View style={styles.style}>
            <View style={{justifyContent:'center', marginRight: barHeight}}>
              <MaterialCommunityIcons name="calendar-range" color={logoColor} size={logoSize} />
            </View>

            <View style={{flex:1, justifyContent: 'center'}}>
              <Text style={[scheme.text ]}>
                Date:
              </Text>          
            </View>

            <TouchableOpacity
              style={{flex:1, borderWidth: 3, borderColor: 'grey', borderRadius: barHeight/2}}
              onPress={() => setDateModal(true)}
            >
              <View style={{flex:1, justifyContent: 'center', flexDirection: 'row'}}>

                <View style={{flex:9, justifyContent: 'center'}}>
                  <Text style={[scheme.text, {textAlign: 'right', paddingRight: barHeight/2}]}>
                    {currentDate}
                  </Text>
                  <DatePickerModal dateModal={dateModal} setDateModal={setDateModal} handleDateSelect={handleDateSelect}/>                

                </View>

              </View>              
            </TouchableOpacity>
          </View>

          <View style={styles.style}>
            <View style={{justifyContent:'center', marginRight: barHeight}}>
              <MaterialCommunityIcons name="timer-cog-outline" color={logoColor} size={logoSize} />
            </View>

            <View style={{flex:1, justifyContent: 'center'}}>
              <Text style={[scheme.text ]}>
                Time:
              </Text>          
            </View>

            <TouchableOpacity
              style={{flex:1, borderWidth: 3, borderColor: 'grey', borderRadius: barHeight/2}}
              onPress={() => setTimeModal(true)}
            >
              <View style={{flex:1, justifyContent: 'center', flexDirection: 'row'}}>

                <View style={{flex:9, justifyContent: 'center'}}>
                  <Text style={[scheme.text, {textAlign: 'right', paddingRight: barHeight/2}]}>
                    {currentTime}
                  </Text>
                  <TimePickerModal timeModal={timeModal} setTimeModal={setTimeModal} handleTimeSelect={handleTimeSelect}/>                

                </View>

              </View>              
            </TouchableOpacity>
          </View>


          <View style={styles.style}>
            <View style={{justifyContent:'center', marginRight: barHeight}}>
              <MaterialCommunityIcons name="tag-outline"color={logoColor} size={logoSize} />
            </View>

            <View style={{flex:1, justifyContent: 'center'}}>
              <Text style={[scheme.text ]}>
                Category:
              </Text>          
            </View>

            <TouchableOpacity
              style={{flex:1, borderWidth: 3, borderColor: 'grey', borderRadius: barHeight/2}}
              onPress={() => setCategoryModal(true)}
            >
              <View style={{flex:1, justifyContent: 'center', flexDirection: 'row'}}>
                <View style={{ backgroundColor: categoryData.find(cat => cat.name === categoryText)?.color || 'grey', flex: 1 }} />

                <View style={{flex:9, justifyContent: 'center'}}>
                  <Text style={[scheme.text, {textAlign: 'right', paddingRight: barHeight/2}]}>
                    {categoryText ? categoryText : 'None'} 
                  </Text>
                  <Category categoryModal={categoryModal} setCategoryModal={setCategoryModal} handleCategorySelect={handleCategorySelect}/>                
                </View>

              </View>              
            </TouchableOpacity>
          </View>

          <View style={styles.style}>
            <View style={{justifyContent:'center', marginRight: barHeight}}>
              <MaterialCommunityIcons name="flag-triangle" color={logoColor} size={logoSize} />
            </View>


            <View style={{flex:1, justifyContent: 'center'}}>
              <Text style={[scheme.text ]}>
                Priority:
              </Text>          
            </View>

            <TouchableOpacity
              style={{flex:1, borderWidth: 3, borderColor: 'grey', borderRadius: barHeight/2}}
              onPress={() => setPriorityModal(true)}
            >
              <View style={{flex:1, justifyContent: 'center', flexDirection: 'row'}}>
                <View style={{backgroundColor:priorityLevel[priorityText] ? priorityLevel[priorityText] : 'grey' , flex:1}}/>

                <View style={{flex:9, justifyContent: 'center'}}>
                  <Text style={[scheme.text, {textAlign: 'right', paddingRight: barHeight/2}]}>
                    {priorityText ? priorityText : 'None'} 
                  </Text>
                  <Priority priorityModal={priorityModal} setPriorityModal={setPriorityModal} handlePrioritySelect={handlePrioritySelect} />
                </View>

              </View>              
            </TouchableOpacity>

          </View>


          <View style={styles.style}>
            <TouchableHighlight
              style={{flex:1, backgroundColor:scheme.primary}}
              onPress={updateTaskPress}
            >
              <View style={{flex:1, justifyContent: 'center'}}>
                <Text style={[scheme.text, {textAlign: 'center'}]}>
                  Update task
                </Text>
              </View>              
            </TouchableHighlight>
          </View>
      </SafeAreaView>

      <View style={{flex:1}}/>

      </View>
  );
}
  
const styles = StyleSheet.create({
  style: {flex: 1, flexDirection: 'row', margin: barHeight}
})
