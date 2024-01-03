import { StyleSheet, StatusBar} from "react-native";

// IOS is null, 24 is the alternate.
const barHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 24;

const lightScheme = StyleSheet.create({
  background: 'white',
  primary: '#8687E7',
  secondary: '#363636',
});
  
const darkScheme =  StyleSheet.create({
  background: '#121212',
  primary: '#8687E7',
  secondary: '#363636',
  text: {fontFamily: 'lexend-regular', fontSize:  barHeight/1.25, color: 'white'},
  smallText: {fontFamily: 'lexend-regular', fontSize:  barHeight/2, color: 'white'},
});

const priorityLevel = {
  none: 'grey',
  high: '#ff8282',
  low: '#98FB98',
  medium: '#fffd8d'
}

export {lightScheme, darkScheme, barHeight, priorityLevel}
