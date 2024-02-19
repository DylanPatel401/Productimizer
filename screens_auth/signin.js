import { Text, View, TouchableOpacity, TextInput, Button, TouchableHighlight, ScrollView, Image, Modal, StyleSheet} from 'react-native';
import { useContext, useState, useEffect} from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from "firebase/auth";

import { FIREBASE_AUTH} from "../firebase/firebase"

export default function SignInScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const auth = FIREBASE_AUTH;

  
  const handleSignIn = async() => {
    // Implement sign-in logic here
    if(password.length < 6) return alert("Password must be at least 6 characters");

    setLoading(true);
    try{
      console.log(email,password);
      const res = await signInWithEmailAndPassword(auth, email,password);
      console.log(res);
    }catch(error){
      console.log(error);
    }finally{
      setLoading(false);
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />


      <Button title="Sign In" onPress={handleSignIn} />

      {/* You can add additional UI components, links, or messages here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '100%',
  },
});