import { Text, View, Image } from 'react-native';


import NewTaskScreen from './nested/create_screens/new_task';

export default function TasksScreen({navigation}) {

    return (
      <View style={{flex:1}}>
        <NewTaskScreen/>
      </View>
    );
  }