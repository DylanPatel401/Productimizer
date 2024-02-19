import { Text, View, Button} from 'react-native';
import { FIREBASE_AUTH } from '../firebase/firebase';
export default function ProfileScreen({navigation}) {
    return (
      <View style={{flex:1}}>
        <Text>
            Work In Progress: Profile Screen
        </Text>

        <Button title="Log Out" onPress={() => {FIREBASE_AUTH.signOut()}} />

      </View>
    );
  }
  
