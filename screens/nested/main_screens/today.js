import { View, Text} from 'react-native';
import { useContext, useEffect, useState, useCallback} from 'react';
import { ColorContext } from '../../../styles/colorContext';
import { TaskContext } from './TaskContext';

// gets the data, conidtions: date = today
import { RenderCards } from '../../../functions/components/RenderCards';

export default function TodayScreen({navigation}) {
  const scheme = useContext(ColorContext);
  const { todayTasks } = useContext(TaskContext);

  return (
    <View style={{flex:1,backgroundColor: scheme.background}}>

        <RenderCards currentTasks={todayTasks} renderDate={false}/>

    </View>
  );
}
  
