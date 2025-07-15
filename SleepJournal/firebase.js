// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlMd_WrJiHXeJmwbi0IKweHLmuZXLVXSg",
  authDomain: "sleepjournal-89076.firebaseapp.com",
  projectId: "sleepjournal-89076",
  storageBucket: "sleepjournal-89076.appspot.com",
  messagingSenderId: "340936373931",
  appId: "1:340936373931:web:d1ebcf9a038d19ab52a9ee",
  measurementId: "G-HW8J1D7GFX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the Auth instance for use in your app
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});