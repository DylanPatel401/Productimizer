import { Modal, Text, View, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import { barHeight, priorityLevel} from './../../styles/style.js';

import { useContext, useState } from 'react';
import { ColorContext } from './../../styles/colorContext.js';

const Title = ({visiblility}) => {
  const scheme = useContext(ColorContext);
  const [title, changeTitle] = useState();

  return(
    <Modal
      visible={visiblility}
      animationType="slide"
      transparent={true}
    >
    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center' }}>
      <View style={{flex:1}}/>

      <View style={{ flex:1.5, backgroundColor: 'rgba(0,0,0,0.8)', padding: barHeight, borderRadius: barHeight/2, alignSelf:'center'}}>
        <View style={{flex:2}}>
          <TextInput
            style={[scheme.text, {borderWidth: 4, borderColor:'green', flex:1}]}
            changeTitle={changeTitle}
            value={title}
            placeholder={'Title..'}
            placeholderTextColor={'grey'}
          />
        </View>

      </View>

      <View style={{flex:1}}/>
    </View>
  </Modal>    
  );
}

const Priority = ({modalOnScreen, setModalOnScreen, handlePrioritySelect}) => {

  const buttonPress = (level) => {
    setModalOnScreen(false);
    handlePrioritySelect(level)
  }

  return(
    <Modal
      visible={modalOnScreen}
      animationType="slide"
      transparent={true}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center' }}>
        <View style={{flex:1}}/>

        <View style={{ flex:2, backgroundColor: 'rgba(0,0,0,0.8)', padding: barHeight, borderRadius: barHeight/2, alignSelf:'center'}}>
          <View style={{borderBottomWidth:3, borderColor:'white', margin:barHeight}}>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: barHeight/1.5, marginBottom: barHeight/1.5, fontFamily: 'lexend-extrabold'}}>
              Choose Priority level
            </Text>            
          </View>
          
          <TouchableOpacity
              style={[styles.modalButton, {backgroundColor: 'rgba(255,255,255,0.3)', borderColor: priorityLevel.none}]}            
              onPress={() => buttonPress("none")}
            >
              <View style={[styles.modalView]}>
                <Text style={styles.modalText}>
                  None 
                </Text>                
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, {backgroundColor: 'rgba(255,255,255,0.3)', borderColor: priorityLevel.low}]}            
              onPress={() => buttonPress("low")}
            >
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  low 
                </Text>                
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, {backgroundColor: 'rgba(255,255,255,0.3)', borderColor: priorityLevel.medium}]}            
              onPress={() => buttonPress("medium")}
              >
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  medium 
                </Text>                
              </View>
            </TouchableOpacity>


            <TouchableOpacity
              style={[styles.modalButton, {backgroundColor: 'rgba(255,255,255,0.3)', borderColor: priorityLevel.high}]}            
              onPress={() => buttonPress("high")}
              >
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  High 
                </Text>                
              </View>
            </TouchableOpacity>
        </View>

        <View style={{flex:1}}/>
      </View>
    </Modal>      
  )
}
const styles = StyleSheet.create({
  modalView: {  flex: 1, justifyContent:'center', alignContent:'center', borderRadius:4},
  modalText: { textAlign: 'center', color: 'white', fontSize: barHeight/1.5, fontFamily: 'lexend-bold'},
  modalButton: {borderRadius: barHeight/3, borderLeftWidth: 10, flex:1, marginTop:barHeight/2, backgroundColor: 'rgba(255,255,255,0.3)'},
})

export {Title, Priority}