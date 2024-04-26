import { View, Text} from 'react-native';
import { useContext, useEffect, useState} from 'react';
import { ColorContext } from '../../../styles/colorContext';

import { RenderCards } from '../../../functions/components/RenderCards';
import { getPastTasks } from '../../../firebase/tasksActions';
import { FIREBASE_AUTH } from '../../../firebase/firebase';

export default function PastdueScreen({navigation}) {
  const scheme = useContext(ColorContext);
  const [currentTasks, setCurrentTasks] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function today(){ 
      const data = await getPastTasks(FIREBASE_AUTH.currentUser.uid);
      setCurrentTasks(data);      
    }

    today();
    setLoading(false);
  }, [])

  return (
    <View style={{flex:1,backgroundColor: scheme.background}}>

      {loading == true ? (
        <View style={{flex:1}}>
          <Text style={{ textAlign: 'center', fontFamily: 'lexend-regular', fontSize:34, color:'white'}}>
            Loading...
          </Text>
        </View>
      ) : (
        currentTasks.length == 0 ? (
          <View style={{flex:1, justifyContent: 'center'}}>
            <Text style={{color:'white', textAlign: 'center', fontFamily: 'lexend-bold', fontSize:22}}>
              None (:
            </Text>
          </View>
        ) : (
          <RenderCards currentTasks={currentTasks}/>
        )
      )}

    </View>
  );
}
  
