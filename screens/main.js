import { Text, View, Image, SafeAreaView} from 'react-native';
import { useContext } from 'react';
import { ColorContext } from '../styles/colorContext';


export default function MainScreen({navigation}) {
    const color = useContext(ColorContext);

    return (
      <View style={{flex:3, backgroundColor: color.background}}>
        <SafeAreaView style={{flex:2, justifyContent: 'center', alignItems: 'center', marginTop: '10%'}}>
          <Image source={require('./../assets/Task.gif')} style={{ resizeMode: 'contain'}}/>
        </SafeAreaView>
        <View style={{flex:1}}>
          <Text style={{color: 'white', textAlign: 'center', fontSize: 19, marginBottom: 15, fontFamily: 'lexend-regular'}}>
            What do you want to do today?
          </Text>
          <Text style={{color: 'white', textAlign: 'center', fontSize: 14, fontFamily: 'lexend-extrabold'}}>
            Tap + to add your tasks
          </Text>
        </View>
      </View>
    );
  }
  
