import { Text, View, StyleSheet, TextInput, KeyboardAvoidingView, SafeAreaView, TouchableOpacity, TouchableHighlight} from 'react-native';
import { useContext, useState} from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ColorContext } from '../../../styles/colorContext';
import { barHeight, priorityLevel} from '../../../styles/style';
import { Title, Priority, Category} from '../../../functions/components/createTasksModal';


export default function NewTaskScreen({navigation}) {
  const scheme = useContext(ColorContext);
  const logoColor = scheme.primary 
  const logoSize = barHeight*1;
  const [title, changeTitle] = useState();

  const [priorityText, setPriorityText] = useState('None');
  const [categoryText, setCategoryText] = useState('None');
  const [priorityModal, setPriorityModal] = useState(false); 
  const [categoryModal, setCategoryModal] = useState(false);
  
  const handlePrioritySelect = (priority) => {
    console.log('Priority press');
    setPriorityText(priority);
    setPriorityModal(false);
  };

  const handleCategorySelect = (category) => {
    console.log('Category press');
    setCategoryText(category);
    setCategoryModal(false);
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

            <TouchableOpacity
              style={{flex:1, borderWidth: 3, borderColor: 'grey', borderRadius: barHeight/2}}
              onPress={() => setCategoryModal(true)}
            >
              <View style={{flex:1, justifyContent: 'center', flexDirection: 'row'}}>
                <View style={{backgroundColor:'white' , flex:1}}/>

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
                <View style={{backgroundColor:priorityLevel[priorityText] , flex:1}}/>

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
            <View style={{justifyContent:'center', marginRight: barHeight}}>
              <MaterialCommunityIcons name="professional-hexagon" color={logoColor} size={logoSize} />
            </View>

            <View style={{flex:1, justifyContent: 'center'}}>
              <Text style={[scheme.text ]}>
                Productivity:
              </Text>          
            </View>
          </View>

          <View style={styles.style}>
            <TouchableHighlight
              style={{flex:1, backgroundColor:scheme.primary}}
              onPress={() => alert('true')}
            >
              <View style={{flex:1, justifyContent: 'center'}}>
                <Text style={[scheme.text, {textAlign: 'center'}]}>
                  Add task
                </Text>
              </View>              
            </TouchableHighlight>
          </View>
        </View>


      </View>
  );
}
  
const styles = StyleSheet.create({
  style: {flex: 1, flexDirection: 'row', margin: barHeight}
})