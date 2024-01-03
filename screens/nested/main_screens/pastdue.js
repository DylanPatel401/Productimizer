import { View} from 'react-native';
import { useContext } from 'react';
import { ColorContext } from '../../../styles/colorContext';

// gets the data, conidtions: date = today
import { getTasks } from '../../../functions/api/getPast';
import { RenderCards } from '../../../functions/components/RenderCards';

export default function PastdueScreen({navigation}) {
  const scheme = useContext(ColorContext);
  const currentTasks = getTasks(new Date());
  // I don't want to display activities on past due screen.
  const currentActivity = []

    return (
      <View style={{flex:1,backgroundColor: scheme.background}}>
        <RenderCards currentActivity={currentActivity} currentTasks={currentTasks} renderDate={true}/>
      </View>
    );
  }
  
