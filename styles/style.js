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
  text: {fontFamily: 'lexend-regular', fontSize:  barHeight, color: 'white'},
  smallText: {fontFamily: 'lexend-regular', fontSize:  barHeight/2, color: 'white'},
});

export {lightScheme, darkScheme, barHeight}
