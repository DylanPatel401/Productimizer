import { StyleSheet, StatusBar} from "react-native";

// IOS is null, 24 is the alternate.
const barHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 24;

const lightScheme = StyleSheet.create({
  background: 'white',
  primary: '#8687E7',
  secondary: '#363636',
  uid: "NKoRsj1CoPMDCfKo9DY5nlxFtF23"
});
  
const darkScheme =  StyleSheet.create({
  background: '#121212',
  primary: '#8687E7',
  secondary: '#363636',
  text: {fontFamily: 'lexend-regular', fontSize:  barHeight/1.25, color: 'white'},
  smallText: {fontFamily: 'lexend-regular', fontSize:  barHeight/2, color: 'white'},
  uid: "NKoRsj1CoPMDCfKo9DY5nlxFtF23"
});

const priorityLevel = {
  None: 'grey',
  high: '#ff8282',
  low: '#98FB98',
  medium: '#fffd8d'
}
const categoryData = [
  {name: "Work", color: 'blue'}, 
  {name: "Study", color: 'green'}, 
  {name: "Health & Fitness", color: 'red'}, 
  {name: "Household", color: 'orange'},
  {name: "Social", color: 'purple'}, 
  {name: "Personal Development", color: 'teal'},
  {name: "Finance", color: 'yellow'}, 
  {name: "Hobbies", color: 'pink'},
  {name: "Travel", color: 'cyan'}, 
  {name: "Volunteering", color: 'lime'},
];
export {lightScheme, darkScheme, barHeight, priorityLevel, categoryData}
