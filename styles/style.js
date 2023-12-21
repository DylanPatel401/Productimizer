import { StyleSheet, StatusBar} from "react-native";

// IOS is null, 24 is the alternate.
const barHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 24;

const lightScheme = {
  background: '#121212',
  primary: '#8687E7',
  secondary: '#363636',
  text: '#333',
};
  
const darkScheme = {
  background: '#121212',
  primary: '#8687E7',
  secondary: '#363636',
  text: '#333',
};

export {lightScheme, darkScheme, barHeight}
