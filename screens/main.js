import { Text, View, Image, SafeAreaView} from 'react-native';
import { useContext } from 'react';
import { ColorContext } from '../styles/colorContext';


export default function MainScreen({navigation}) {
    const color = useContext(ColorContext);

    return (
      <View style={{flex:10, backgroundColor: color.background}}>
        <View style={{flex:1, flexDirection:'row'}}>
          <View style={{flex:1, justifyContent: 'center'}}>
            <Text style={{color:'white', textAlign: 'center'}}>
              Today
            </Text>
          </View>
          <View style={{flex:1, justifyContent: 'center'}}>
            <Text style={{color:'white', textAlign: 'center'}}>
             Paste Due
            </Text>
          </View>
          <View style={{flex:1, justifyContent: 'center'}}>
            <Text style={{color:'white', textAlign: 'center'}}>
              Completed
            </Text>
          </View>

        </View>

        <View style={{flex:7}}>

        </View>

      </View>
    );
  }
  
