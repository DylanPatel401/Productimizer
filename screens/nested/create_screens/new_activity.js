import { Text, View } from 'react-native';
import { useContext } from 'react';
import { ColorContext } from '../../../styles/colorContext';

export default function NewActivityScreen({navigation}) {
  const scheme = useContext(ColorContext);

    return (
      <View style={{flex:1, backgroundColor: scheme.background}}>

      </View>
    );
  }