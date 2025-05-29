import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Homescreen} from './screens/Homescreen';
import {AICHAT} from './screens/AICHAT';
import {LogScreen} from './screens/LogScreen';
import {Profile} from './screens/Profile';


const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {backgroundColor: '#f8f8f8'},
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#8e8e93',
        }}>
        <Tab.Screen name="Home" component={Homescreen} />
        <Tab.Screen name="AI Chat" component={AIChat} />
        <Tab.Screen name="Log" component={LogScreen} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


