// MyNewSleepJournalApp/App.js 

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import LockScreen from './screens/LockScreen';
import ProfileScreen from './screens/ProfileScreen';
import Statistics from './screens/Statistics'; 
import { UserProvider } from './UserContext'; 
import Journal from './screens/Journal';
import NewEntry from './screens/NewEntry';
import { JournalProvider } from './JournalContext';
import ChatBotScreen from './screens/ChatBotScreen'; // Add this import

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <JournalProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Lock" 
            screenOptions={{
              headerShown: false 
            }}
          >
            <Stack.Screen
              name="Lock"
              component={LockScreen}
              options={{ 
                headerShown: false 
              }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                 title: 'Welcome', 
                 headerShown: false 
                }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ 
                headerShown: false 
              }}
            />

            <Stack.Screen
              name = "Journal"
              component = {Journal}
              options = {{
                title: 'Journal',
                headerShown: false
              }}
            />

            <Stack.Screen
              name = "Statistics"
              component = {Statistics}
              options = {{
                headerShown: false
              }}
            />

            <Stack.Group screenOptions = {{presentation: 'modal'}}>
              <Stack.Screen
                name = "NewEntry"
                component = {NewEntry}
                options = {{
                  title: "New Journal Entry",
                  headerBackTitle: 'Back'
                }}
              />
            </Stack.Group>

            <Stack.Screen
              name="ChatBot"
              component={ChatBotScreen}
              options={{
                title: 'Sleep Chatbot',
                headerShown: true
              }}
            />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </JournalProvider>
    </UserProvider>
  );
}