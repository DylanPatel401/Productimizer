import { View, Text} from 'react-native';
import { useContext, useEffect, useState} from 'react';
import { ColorContext } from '../../../styles/colorContext';

// gets the data, conidtions: date = today
import { getTasks } from '../../../functions/api/getToday';
import { RenderCards } from '../../../functions/components/RenderCards';
import { getTodaysTasks } from '../../../firebase/tasksActions';
import { FIREBASE_AUTH } from '../../../firebase/firebase';

export default function TodayScreen({navigation}) {
  const scheme = useContext(ColorContext);
  const [currentTasks, setCurrentTasks] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function today(){ 
      const data = await getTodaysTasks(FIREBASE_AUTH.currentUser.uid);
      setCurrentTasks(data);      
    }

    today();
    setLoading(false);
  }, [])

  return (
    <View style={{flex:1,backgroundColor: scheme.background}}>

      {loading == true ?
      (
        <View style={{flex:1}}>
          <Text style={{ textAlign: 'center', fontFamily: 'lexend-regular', fontSize:34, color:'white'}}>
            Loading...
          </Text>
        </View>
      ) : 
      (
        <RenderCards currentTasks={currentTasks}/>
      )}
    </View>
  );
}
  
