// MyNewSleepJournalApp/App.js

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// IMPORT YOUR SCREENS FROM THE './screens/' SUBFOLDER (ensure this folder exists and files are in it)
import HomeScreen from './screens/HomeScreen';
import LockScreen from './screens/LockScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Lock" // Start with the LockScreen
        screenOptions={{
          headerShown: false // Hide default header for all screens by default
        }}
      >
        <Stack.Screen
          name="Lock"
          component={LockScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome', headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'My Profile', headerShown: true }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}