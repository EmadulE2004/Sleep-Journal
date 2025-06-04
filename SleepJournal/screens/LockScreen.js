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
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      {/* Password input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Login button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#233C67',
    padding: 20,
  },
  title: {
    fontFamily: 'LilitaOne',
    fontSize: 40,
    color: '#CCDBEE', 
    marginBottom: 25,
  },
  input: {
    width: '100%',
    maxWidth: 300,
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: 'green',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LockScreen;