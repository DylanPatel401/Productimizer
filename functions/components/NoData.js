import { View, Text, Image, TouchableHighlight, TouchableOpacity,} from 'react-native';
import { useContext, useState } from 'react';
import { taskData, activityData } from '../../screens/data';
import { barHeight } from '../../styles/style';
import { ColorContext } from '../../styles/colorContext';

export const NoData = () => {
  const color = useContext(ColorContext);

  return(
    <View style={{flex:3, backgroundColor: color.background}}>
      <View style={{flex:2, justifyContent: 'center', alignItems: 'center', marginTop: '10%'}}>
        <Image source={require('./../../assets/Task.gif')} style={{ resizeMode: 'contain'}}/>
      </View>
      <View style={{flex:1}}>
        <Text style={{color: 'white', textAlign: 'center', fontSize: 19, marginBottom: 15, fontFamily: 'lexend-regular'}}>
          What do you want to do on this day?
        </Text>
        <Text style={{color: 'white', textAlign: 'center', fontSize: 14, fontFamily: 'lexend-extrabold'}}>
          Tap + to add your tasks
        </Text>
      </View>
    </View>      
  )

}
  