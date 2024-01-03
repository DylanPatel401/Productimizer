import { Text, View, StyleSheet, TextInput, KeyboardAvoidingView, SafeAreaView, TouchableOpacity} from 'react-native';
import { useContext, useState} from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ColorContext } from '../../../styles/colorContext';
import { barHeight, priorityLevel} from '../../../styles/style';
import { Title, Priority } from '../../../functions/components/createTasksModal';


export default function NewTaskScreen({navigation}) {
  const scheme = useContext(ColorContext);
  const logoColor = scheme.primary 
  const logoSize = barHeight*1;
  const [title, changeTitle] = useState();
  const [selectedPriority, setPriority] = useState("none");
  const [modalOnScreen, setModalOnScreen] = useState(false);

  const handlePrioritySelect = (priority) => {
    setPriority(priority);
  };

    return (
      <View style={{flex:2, backgroundColor: scheme.background}}>

        <View style={{flex:1}}>

          <View style={[styles.style]}>
            <View style={{justifyContent:'center', marginRight: barHeight}}>
              <MaterialCommunityIcons name="card-bulleted-outline" color={logoColor} size={logoSize} />
            </View>

            <View style={{flex:1, justifyContent: 'center'}}>
              <TextInput
                style={[scheme.text, {borderWidth: 2, borderRadius:10, paddingLeft: 15, borderColor:'grey', flex:1}]}
                changeTitle={changeTitle}
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
              onPress={() => setModalOnScreen(true)}
            >
              <View style={{flex:1, justifyContent: 'center', flexDirection: 'row'}}>
                <View style={{backgroundColor:priorityLevel[selectedPriority] , flex:1}}/>

                <View style={{flex:9, justifyContent: 'center'}}>
                  <Text style={[scheme.text, {textAlign: 'right', paddingRight: barHeight/2}]}>
                    {selectedPriority ? selectedPriority : 'None'} 
                  </Text>
                  <Priority modalOnScreen={modalOnScreen} setModalOnScreen={setModalOnScreen} handlePrioritySelect={handlePrioritySelect} />                  
                </View>

              </View>              
            </TouchableOpacity>

          </View>

          <View style={styles.style}>
            <View style={{justifyContent:'center', marginRight: barHeight}}>
              <MaterialCommunityIcons name="professional-hexagon" color={logoColor} size={logoSize} />
            </View>

            <View style={{flex:1, justifyContent: 'center'}}>
              <Text style={[scheme.text ]}>
                Productivity:
              </Text>          
            </View>
          </View>

        </View>

        <View style={{flex:0, backgroundColor: 'yellow'}}>

        </View>
      </View>
    );
}
  
const styles = StyleSheet.create({
  style: {flex: 1, flexDirection: 'row', margin: barHeight}
})