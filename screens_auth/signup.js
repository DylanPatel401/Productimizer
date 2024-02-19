import { Text, View, TouchableOpacity, StatusBar, Button, TextInput, Image, Modal, StyleSheet} from 'react-native';
import { useContext, useState, useEffect} from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { FIREBASE_AUTH} from "../firebase/firebase"

export default function SignUpScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const auth = FIREBASE_AUTH;


  const handleSignUp = async () => {
    // Basic validation
    if (!email || !password || !confirmPassword) {
      return alert('Please fill in all fields');
    }

    if (password !== confirmPassword) {
      return alert('Passwords do not match');
    }

    if(password.length < 6) return alert("Password must be at least 6 characters");

    setLoading(true);
    try{
      const res = await createUserWithEmailAndPassword(auth, email,password);
      console.log(res);
    }catch(error){
      console.log(error);
    }finally{
      setLoading(false);
    }

   
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

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

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />

      <Button title="Sign Up" onPress={handleSignUp} />

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