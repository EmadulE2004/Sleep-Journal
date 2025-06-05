// LockScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

function LockScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //this stuff deals with the login//
  const handleLogin = () => {
    if (username && password) {
      Alert.alert('Success', 'Login successful!');
      navigation.navigate('Home'); 
    } else {
      Alert.alert('Error', 'Please enter both username and password');
    }
  };

  return (

    <View style={styles.container}>
      <Text style={styles.title}> Sleep Journal</Text>
      <View style={styles.loginBox}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={'black'}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      {/* Password input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={'black'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Login button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginBox: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#233C67',
    padding: 20,
  },
  title: {
    fontFamily: 'roboto',
    fontWeight: 'bold',
    fontSize: 45,
    color: '#CCDBEE', 
    marginBottom: 25,
  },
  input: {
    width: '100%',
    maxWidth: 300,
    height: 45,
    backgroundColor: '#F0F0F0',
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'black',
  },
  button: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: 'green',
    paddingVertical: 12,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LockScreen;