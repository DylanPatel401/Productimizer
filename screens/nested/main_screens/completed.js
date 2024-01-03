import { Text, View } from 'react-native';
import { useState, useEffect, useContext } from 'react';

import { Todo } from '../../../functions/components/RenderCards';
import { ColorContext } from '../../../styles/colorContext';
import { getTasks } from '../../../functions/api/getCompleted';
import { RenderCards } from '../../../functions/components/RenderCards';

export default function CompletedScreen({navigation}) {
  const scheme = useContext(ColorContext);

    const currentTasks = getTasks();

    // I don't want to display activities on past due screen.
    const currentActivity = []

    return (
      <View style={{flex:1, backgroundColor: scheme.background}}>
        <RenderCards currentTasks={currentTasks} currentActivity={currentActivity} renderDate={true}/>
      </View>
    );
  }
  
