import { Text, View, TextInput, StyleSheet, Image} from 'react-native';
import { useContext, useState} from 'react';
import { ColorContext } from '../styles/colorContext';
import { barHeight } from '../styles/style';
import {Card} from 'react-native-shadow-cards';
import DropDownPicker from 'react-native-dropdown-picker';


export default function TaskScreen({navigation}) {
  const color = useContext(ColorContext);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  
  const styles = StyleSheet.create({
    box: {margin: 25, backgroundColor: color.secondary, borderRadius: barHeight},
    boxShadow: {shadowOffset: {width:3, height: 3}, shadowOpacity: 0.3, shadowRadius: 6, elevation:10, shadowColor: 'white'},
    subtitle: {fontFamily: 'lexend-regular', fontSize: barHeight/1.5, color: 'white'},
    subtext: {fontFamily: 'lexend-bold', fontSize: barHeight/2, color: 'white'}
  })

  return (
    <View style={{flex:1, backgroundColor: color.background}}>

      <View style={{flex:1}}>
        <View style={[styles.box, styles.boxShadow]}>
          <TextInput
            style={{color: 'white', margin: 15, fontSize: barHeight,}}
            placeholder='Title..'
            placeholderTextColor={'grey'}
            onChangeText={(text) => {setTitle(text)}}
            value={title}
            numberOfLines={1}
          />
        </View>
      </View>

      <View style={{flex:2}}>
        <View style={[styles.box, styles.boxShadow]}>
            <TextInput
              style={{color: 'white', margin: 15, fontSize: barHeight, fontFamily: 'lexend-regular'}}
              placeholder='Description..'
              placeholderTextColor={'grey'}
              onChangeText={(text) => {setDescription(text)}}
              value={description}
              numberOfLines={2}
            />
          </View>
        </View>

        <View style={{flex:1}}>
          <DropDownPicker
            items={[
              { label: "High Priority", value: 0, icon: () => (<Image source={'./assets/num1.png'} style={{flex:1}}/>)},
            ]}
          />
        </View>

        <View style={{flex:1}}>
      
        </View>
    </View>
    );
  }
  
