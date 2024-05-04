
  import { View, Text} from 'react-native';
  import { useContext, useEffect, useState, useCallback} from 'react';
  import { ColorContext } from '../../../styles/colorContext';
  
  import { RenderCards } from '../../../functions/components/RenderCards';
  import { TaskContext } from './TaskContext';

  export default function CompletedScreen({navigation}) {
    const scheme = useContext(ColorContext);
    const { completedTasks } = useContext(TaskContext);
    
    return (
      <View style={{flex:1,backgroundColor: scheme.background}}>
        
        {completedTasks && completedTasks.length > 0 ?
        ( <RenderCards currentTasks={completedTasks}/> ) :
        (
          <View style={{flex:1, justifyContent: 'center'}}>
            <Text style={{color:'white', textAlign: 'center', fontFamily: 'lexend-bold', fontSize: 22}}>
              None
            </Text>
          </View>
        )}
      </View>
    );
  }
    
  