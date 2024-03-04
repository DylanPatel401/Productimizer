import {View, Text, TouchableHighlight} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

export const CloseModalButton = ({setCategoryModal}) => {


  return (
    <View>
      <TouchableHighlight onPress={() => {setCategoryModal(false)}}> 
        <MaterialCommunityIcons name="close-box-outline" color={'white'} size={37} />
      </TouchableHighlight>

    </View>
  );

} 