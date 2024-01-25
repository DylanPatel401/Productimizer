import { Text, View, TouchableOpacity, StatusBar, Button, TextInput, Image, Modal, StyleSheet} from 'react-native';
import { useContext, useState, useEffect} from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const bcrypt = require('bcryptjs');
import isaac from "isaac";

bcrypt.setRandomFallback((len) => {
	const buf = new Uint8Array(len);

	return buf.map(() => Math.floor(isaac.random() * 256));
});


export default function SignUp({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    // Basic validation
    if (!email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // You can add your sign-up logic here
    console.log(`Signing up with Email: ${email}, Password: ${password}`);
    var hashedPassword = bcrypt.hashSync(password,10);
    console.log(hashedPassword);

    const sendData = async () => {
      try{
        console.log('sending data...');
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    // Call the function
    sendData();
    

    // Add further logic like API calls, validation, etc.
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