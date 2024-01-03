import { View, Text, ScrollView, TouchableHighlight, TouchableOpacity,} from 'react-native';
import { useContext, useState, useEffect } from 'react';

import { barHeight } from '../../styles/style';
import { ColorContext } from '../../styles/colorContext';
import { ActionsModal } from './actionsModal';
import { NoData } from './NoData';

export const RenderCards = ({currentTasks, currentActivity, renderDate}) => {    
  const color = useContext(ColorContext);
  
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const Tasks = () => {
    return( 
      <View>
        <View style={{justifyContent: 'center'}}>
          <Text style={{fontSize: barHeight/1.25, marginTop: barHeight, fontFamily: 'lexend-bold', color:'white', textAlign: 'center'}}>
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

                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex:1}}>
                      <Text style={{fontFamily: 'lexend-regular', color: '#AFAFAF'}}>
                        {new Date(`2023-12-31 ${todo.time}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                      </Text>                      
                    </View>

                    {
                      renderDate == true  ?                    
                      (
                        <Text style={{fontFamily: 'lexend-regular', color: '#AFAFAF'}}>
                          {(todo.date)}
                        </Text>      
                      ) : null
                    }
              
                  </View>

                  

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
          <Text style={{fontSize: barHeight/1.25, marginTop: barHeight, fontFamily: 'lexend-bold', color:'white', textAlign: 'center'}}>
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
        <ActionsModal modal={modal} setModal={setModal} item_id={selectedItem}/>

    </ScrollView>
  );
}

