// Import the functions you need from the SDKs you need
import { initializeApp, initializeAu} from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5AzUnG88sRR9JI0smfd9UKCkc0Uykiks",
  authDomain: "productimizer.firebaseapp.com",
  projectId: "productimizer",
  storageBucket: "productimizer.appspot.com",
  messagingSenderId: "822820772601",
  appId: "1:822820772601:web:dfa882a159508040182028",
  measurementId: "G-4LDV0YTNWC"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage) // for expo, user doesn't get logged out when you close the app
});
