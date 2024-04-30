import { Text, View, TouchableOpacity, StatusBar, TouchableHighlight, ScrollView, Image, Modal, StyleSheet} from 'react-native';
import { useContext, useState, useEffect} from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { barHeight } from '../../styles/style';

import { TaskContext } from '../../screens/nested/main_screens/TaskContext';
import { deleteTask, updateTaskCompletion, getTodaysTasks, getPastTasks, getComepleted} from '../../firebase/tasksActions';

import { FIREBASE_AUTH } from '../../firebase/firebase';


const ActionsModal = ({modal, setModal, item_id}) => {
  const navigation = useNavigation();
  const { todayTasks, setTodayTasks, pastdueTasks, setPastdueTasks, completedTasks, setCompletedTasks } = useContext(TaskContext);

  async function fetchData(todayTasks, setTodayTasks, pastdueTasks, setPastdueTasks, completedTasks, setCompletedTasks){

    try {
      const uid = FIREBASE_AUTH.currentUser.uid;
      const todayTasksData = await getTodaysTasks(uid);
      const pastdueTasksData = await getPastTasks(uid);
      const completedTasksData = await getComepleted(uid);
      
      console.log("----");
      console.log(todayTasksData);
      console.log("^^^^^^^");

      setTodayTasks(todayTasksData);
      setPastdueTasks(pastdueTasksData);
      setCompletedTasks(completedTasksData);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  const markAsDone = async() => {
    await updateTaskCompletion(item_id)
    setModal(false);
    
    fetchData(todayTasks, setTodayTasks, pastdueTasks, setPastdueTasks, completedTasks, setCompletedTasks)
  }

  const deleteT = async() => {
    await deleteTask(item_id) 
    setModal(false);
    fetchData(todayTasks, setTodayTasks, pastdueTasks, setPastdueTasks, completedTasks, setCompletedTasks)

  }

  return(
    <Modal
      visible={modal}
      animationType='slide'
      transparent={true}
    >
    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', }}>

      <View style={{flex:1}}/>
      <View style={{ flex:1.5, backgroundColor: 'rgba(0,0,0,0.8)', padding: barHeight, borderRadius: barHeight/2, alignSelf:'center'}}>

        <View style={{borderBottomWidth:3, borderColor:'white', margin:barHeight}}>
          <Text style={{ color: 'white', textAlign: 'center', fontSize: barHeight/1.5, marginBottom: barHeight/1.5, fontFamily: 'lexend-extrabold'}}>
            Choose an action
          </Text>            
        </View>


        <View style={{ flex:1, alignContent:'center'}}>
          <TouchableOpacity
            style={[styles.modalActionButton, {backgroundColor: 'rgba(255,255,255,0.3)'}]}            
            onPress={() => {setModal(false)}}
          >
            <View style={styles.modalActionView}>
              <Text style={styles.modalActionText}>
                Edit 
              </Text>                
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modalActionButton, {backgroundColor: '#2ca83a'}]}
            onPress={() => {
              setModal(false)
              navigation.push('Stopwatch', {
                item_id: item_id
              })

            }}
          >
            <View style={styles.modalActionView}>
              <Text style={styles.modalActionText}>
                Start
              </Text>                
            </View>
          </TouchableOpacity>
        
          <TouchableOpacity
            style={[styles.modalActionButton, {backgroundColor: '#30c7c4'}]}
            onPress={markAsDone}
          >
            <View style={styles.modalActionView}>
              <Text style={styles.modalActionText}>
                Mark as done
              </Text>                
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.modalActionButton, {backgroundColor: '#ab2605'}]}
            onPress={deleteT}
          >
            <View style={styles.modalActionView}>
              <Text style={styles.modalActionText}>
                Delete
              </Text>                
            </View>
          </TouchableOpacity>
        </View>

      </View>
      <View style={{flex:1}}/>

    </View>
  </Modal>
  );
}

const styles = StyleSheet.create({
  modalActionView: {  flex: 1, justifyContent:'center', alignContent:'center', borderRadius:4},
  modalActionText: { textAlign: 'center', color: 'white', fontSize: barHeight/1.5, fontFamily: 'lexend-bold'},
  modalActionButton: {borderRadius: barHeight/3, flex:1, marginTop:barHeight/2},
})
export { ActionsModal}