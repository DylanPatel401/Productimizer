import { Text, View, Button, TextInput, StyleSheet} from 'react-native';
import { FIREBASE_AUTH } from '../firebase/firebase';
import { ColorContext } from '../styles/colorContext';
import { useContext, useState} from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Linking } from 'react-native';

export default function ProfileScreen({navigation}) {
  const scheme = useContext(ColorContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const auth = FIREBASE_AUTH;

  const handleSignIn = async() => {
    // Implement sign-in logic here
    if(password.length < 6) return alert("Password must be at least 6 characters");

    try{
      await signInWithEmailAndPassword(auth, email,password);
      setLoggedIn(true);
    }catch(error){
      alert(error)
      console.log(error);
    }
  };

  const deleteAccount = () => {
    try{
      handleSignIn();
      if(loggedIn){
        let account = FIREBASE_AUTH.currentUser;
        account.delete(); 
      }
      
    }catch(error){
      console.log(error.code);
      if (error.code === 'auth/requires-recent-login') {
        console.log('User must re-authenticate before this operation can be executed.');
        // Prompt user to re-authenticate
      } else {
        console.error('Error deleting user account:', error);
      }
    }

  }
  
    return (
      <View style={{flex:1, backgroundColor: scheme.background}}>
        <View style={{flex:1}}>
          <Text style={[scheme.text, {fontSize:25, margin: 25}]}>
            Credits
          </Text>         


          <Text style={[scheme.text, {color: "#1E90FF",textDecorationLine: 'underline', marginLeft: 20, marginBottom: 20}]} onPress={() => Linking.openURL('https://storyset.com/work')}>
            Work illustrations by Storyset
          </Text>          
        </View>

        <View style={{flex:1}}>
          <Button title="Log Out" onPress={() => {FIREBASE_AUTH.signOut()}} />

          <TextInput
            style={[styles.input, {marginTop:20}]}
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
        
          <Button title="Delete Account" onPress={deleteAccount}/>
        </View>




      </View>
    );
  }

  const styles = StyleSheet.create({
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      
    },
    input: {
      height: 40,
      backgroundColor: 'white',
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      marginLeft: 20,
      marginRight: 20,
      padding: 10,
      
    },
  });
  
