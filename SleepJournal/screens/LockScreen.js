// LockScreen.js

import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { UserContext } from '../UserContext';

function LockScreen({ navigation }) {
  const [Email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Add this line
  const { setUser } = useContext(UserContext);

  const handleLogin = () => {
    if (
      username &&
      password.length === 8 &&
      (password.includes('@') || password.includes('!') || password.includes('#') || password.includes('&')) &&
      (Email.includes('.') && Email.includes('@'))
    ) {
      setUser({
        email: Email,
        username,
        password,
      });
      Alert.alert('Success', 'Login successful!');
      navigation.navigate('Home');
    } else {
      Alert.alert('Oops', 'You forgot to fill in some fields!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Sleep Journal</Text>
      <View style={styles.loginBox}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={'black'}
          value={Email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor={'black'}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="Password"
            placeholderTextColor={'black'}
            value={password}
            onChangeText={text => setPassword(text.slice(0, 8))}
            secureTextEntry={!showPassword}
            maxLength={8}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{ marginLeft: 10, padding: 5 }}
          >
            <Text style={{ color: 'blue', fontWeight: 'bold' }}>
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        </View>
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
    marginTop: 10,
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