import { View, Text} from 'react-native';
import { useContext, useEffect, useState, useCallback} from 'react';
import { ColorContext } from '../../../styles/colorContext';

import { RenderCards } from '../../../functions/components/RenderCards';
import { TaskContext } from './TaskContext';


export default function PastdueScreen({navigation}) {
  const scheme = useContext(ColorContext);
  const { pastdueTasks } = useContext(TaskContext);

  return (
    <View style={{flex:1,backgroundColor: scheme.background}}>

          <RenderCards currentTasks={pastdueTasks}/>
       

    </View>
  );
}
  
