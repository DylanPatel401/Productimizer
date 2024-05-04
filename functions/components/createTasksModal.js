import { Modal, Text, View, TouchableOpacity, TextInput, StyleSheet, ScrollView, TouchableHighlight} from 'react-native';
import { barHeight, priorityLevel} from './../../styles/style.js';

import { useContext, useState } from 'react';
import { ColorContext } from './../../styles/colorContext.js';
import {CloseModalButton} from './closeModalButton.js';
import { categoryData } from './../../styles/style.js';

import { getFormatedDate } from "react-native-modern-datepicker";
import DatePicker from "react-native-modern-datepicker";

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

const Priority= ({priorityModal, setPriorityModal, handlePrioritySelect}) => {
  const scheme = useContext(ColorContext);

  const buttonPress = (level) => {
    setPriorityModal(false);
    handlePrioritySelect(level);
  }

  return(
    <Modal
      visible={priorityModal}
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

const Category = ({categoryModal, setCategoryModal, handleCategorySelect}) => {

  

  const categoryPress = (categoryText) => {
    setCategoryModal(false);
    handleCategorySelect(categoryText);
  }

  return(
    <Modal
      visible={categoryModal}
      animationType='slide'
      transparent={true}
    >
    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', }}>

      <View style={{flex:1}}/>


      <View style={{flex:3}}>
        <View style={{paddingTop: 10, marginRight: barHeight*2+30, justifyContent: 'flex-end', alignSelf:'flex-end'}}>
          <CloseModalButton setCategoryModal={setCategoryModal}/>
        </View>

        <View style={{ flex:1, borderColor: 'white', borderWidth:1,backgroundColor: 'rgba(0,0,0,0.8)', paddingTop: barHeight, paddingLeft: barHeight, paddingBottom: barHeight, paddingRight: barHeight, borderRadius: barHeight/2, alignSelf:'center'}}>        

          <View style={{borderBottomWidth:3, borderColor:'white', marginBottom:barHeight, marginLeft: barHeight, marginRight: barHeight}}>

            <Text style={{ color: 'white', textAlign: 'center', fontSize: barHeight/1.5, marginBottom: barHeight/1.5, fontFamily: 'lexend-extrabold'}}>
              Choose an Category
            </Text>            
          
          </View>
            
          <ScrollView style={{flex:1,borderWidth:3, margin:barHeight/2}}>
            {categoryData.map((cat) => {
              return(
                <View style={{}} key={cat.name}>
                  <TouchableHighlight
                    style={[styles.modalButton, {backgroundColor: 'rgba(255,255,255,0.3)', borderColor:cat.color}]}            
                    onPress={() => categoryPress(cat.name)}
                  >
                    <View style={[styles.modalView, {height:50,}]}>
                      <Text style={styles.modalText}>
                        {cat.name}
                      </Text>                
                    </View>
                  </TouchableHighlight>

                </View>
              )
            })
            }

      </ScrollView>


        </View>        
      </View>


      <View style={{flex:1}}/>

    </View>
  </Modal>
  );
}

const DatePickerModal = ({dateModal, setDateModal, handleDateSelect}) => {
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate()),
    "YYYY/MM/DD"
  );
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [startedDate, setStartedDate] = useState(startDate);

  function handleChangeStartDate(propDate) {
    setStartedDate(propDate);
  }

  const handleOnPressStartDate = () => {
    console.log("close")
    setDateModal(false);
    handleDateSelect(selectedStartDate)
  };

  return(
    <Modal
      visible={dateModal}
      animationType='slide'
      transparent={true}
    >
    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', }}>

      <View style={{flex:1}}/>

        <View style={datestyles.centeredView}>
          <View style={datestyles.modalView}>
            <DatePicker
              mode="calendar"
              minimumDate={startDate}
              selected={startedDate}
              onDateChanged={handleChangeStartDate}
              onSelectedChange={(date) => setSelectedStartDate(date)}
              options={{
                backgroundColor: "#080516",
                textHeaderColor: "#469ab6",
                textDefaultColor: "#FFFFFF",
                selectedTextColor: "#FFF",
                mainColor: "#469ab6",
                textSecondaryColor: "#FFFFFF",
                borderColor: "rgba(122, 146, 165, 0.1)",
              }}
            />

          </View>

        </View>
        
        <View style={{flex:1, margin:50}}>
            <TouchableOpacity 
              style={{backgroundColor:'grey', padding: 22}}
              onPress={handleOnPressStartDate}
            >
              <Text style={{ color: "white", fontSize: 22}}> Close </Text>
            </TouchableOpacity>                      
        </View>
      
      <View style={{flex:1}}/>

    </View>
  </Modal>
  );
}


const TimePickerModal = ({timeModal, setTimeModal, handleTimeSelect}) => {


  return(
    <Modal
      visible={timeModal}
      animationType='slide'
      transparent={true}
    >
    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', }}>

      <View style={{flex:1}}/>

        <View style={datestyles.centeredView}>
          <View style={datestyles.modalView}>
            <DatePicker
              mode="time"
              minuteInterval={1}
              onTimeChange={selectedTime => handleTimeSelect(selectedTime)}
            />

          </View>
        </View>
        

      <View style={{flex:1}}/>

    </View>
  </Modal>
  );
}

const styles = StyleSheet.create({
  style: {flexDirection: 'row', margin: barHeight},
  modalView: {  flex:1,justifyContent:'center', alignContent:'center', borderRadius:4},
  modalText: { textAlign: 'center', color: 'white', fontSize: barHeight/1.5, fontFamily: 'lexend-bold'},
  modalButton: {borderRadius: barHeight/3, borderLeftWidth: 10, flex:1, marginTop:barHeight/2, backgroundColor: 'rgba(255,255,255,0.3)'},
})

const datestyles = StyleSheet.create({
  textHeader: {
    fontSize: 36,
    marginVertical: 60,
    color: "#111",
  },
  textSubHeader: {
    fontSize: 25,
    color: "#111",
  },
  inputBtn: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#222",
    height: 50,
    paddingLeft: 8,
    fontSize: 18,
    justifyContent: "center",
    marginTop: 14,
  },
  submitBtn: {
    backgroundColor: "#342342",
    paddingVertical: 22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 12,
    marginVertical: 16,
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#080516",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 35,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
export {Title, Priority, Category, DatePickerModal, TimePickerModal}