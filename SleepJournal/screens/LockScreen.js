// LockScreen.js

import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { UserContext } from '../UserContext';
import ScreenBackground from '../components/ScreenBackground';
import Card from '../components/Card';
import { useTheme } from '../hooks/useTheme';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

function LockScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [displayName, setDisplayName] = useState('');
  const { setUser } = useContext(UserContext);
  const { colors: color, textStyles } = useTheme();

  const handleAuth = async () => {
    if (!email || !password || (!isLogin && !displayName)) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    try {
      if (isLogin) {
        // Login
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        Alert.alert('Success', 'Login successful!');
        navigation.navigate('Home');
      } else {
        // Sign up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Set display name after signup
        await updateProfile(userCredential.user, { displayName });
        setUser({ ...userCredential.user, displayName });
        Alert.alert('Success', 'Account is now active!');
        navigation.navigate('Home');
      }
    } catch (error) {
      Alert.alert('Uh oh Authentication Error', error.message);
    }
  };

  return (
    <ScreenBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: color.text }]}>
            Sleep Journal
          </Text>
          <Text style={[styles.subtitle, { color: color.icon }]}>
            Your path to a peaceful night.
          </Text>

          <Card variant="primary" style={styles.loginBox}>
            <Text style={[styles.loginTitle, { color: color.text }]}>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </Text>

            {!isLogin && (
              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, { color: color.text }]}>
                  Display Name
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: color.text,
                      borderColor: color.cardBorder,
                      backgroundColor: 'rgba(26, 35, 50, 0.3)',
                    },
                  ]}
                  placeholder="Enter your name"
                  placeholderTextColor={color.icon}
                  value={displayName}
                  onChangeText={setDisplayName}
                  autoCapitalize="words"
                />
              </View>
            )}

            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, { color: color.text }]}>
                Email
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: color.text,
                    borderColor: color.cardBorder,
                    backgroundColor: 'rgba(26, 35, 50, 0.3)',
                  },
                ]}
                placeholder="Enter your email"
                placeholderTextColor={color.icon}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, { color: color.text }]}>
                Password
              </Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.input,
                    styles.passwordInput,
                    {
                      color: color.text,
                      borderColor: color.cardBorder,
                      backgroundColor: 'rgba(26, 35, 50, 0.3)',
                    },
                  ]}
                  placeholder="Enter your password"
                  placeholderTextColor={color.icon}
                  value={password}
                  onChangeText={text => setPassword(text.slice(0, 8))}
                  secureTextEntry={!showPassword}
                  maxLength={8}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.showPasswordButton}
                >
                  <Text style={[styles.showPasswordText, { color: color.tint }]}>
                    {showPassword ? 'Hide' : 'Show'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.loginButton,
                {
                  backgroundColor: email.includes('@') && password.length === 8
                    ? color.tint
                    : 'rgba(74, 144, 226, 0.3)',
                },
              ]}
              onPress={handleAuth}
              disabled={!(email.includes('@') && password.length === 8)}
            >
              <Text style={[
                styles.loginButtonText,
                {
                  color: email.includes('@') && password.length === 8
                    ? '#0B1426'
                    : color.icon
                }
              ]}>
                {isLogin ? 'Log in' : 'Sign up'}
              </Text>
            </TouchableOpacity>

            {isLogin && (
              <>
                <TouchableOpacity
                  style={[
                    styles.saveChangesButton,
                    { 
                      backgroundColor: 'rgba(74, 144, 226, 0.12)',
                      borderColor: 'rgba(74, 144, 226, 0.25)',
                      borderWidth: 1.5,
                      marginTop: 16,
                    }
                  ]}
                  onPress={() => setIsLogin(false)}
                >
                  <Text style={[styles.saveChangesButtonText, { color: color.tint }]}>Sign up</Text>
                </TouchableOpacity>
                <Text style={[styles.signUpPrompt, { color: color.icon }]}>New? Sign up now!</Text>
              </>
            )}

            <TouchableOpacity
              onPress={() => setIsLogin(!isLogin)}
              style={styles.toggleButton}
            >
              {!isLogin && (
                <Text style={[styles.toggleButtonText, { color: color.text }]}>Already have an account? Log in</Text>
              )}
            </TouchableOpacity>
          </Card>
        </View>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  header: {
    alignItems: 'center',
    marginBottom: 40,
  },

  title: {
    fontSize: 42,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: 8,
  },

  loginCard: {
    width: '100%',
    maxWidth: 350,
    marginBottom: 40,
  },

  loginBox: {
    width: 350,
    height: 500,
    maxWidth: '90%',
  },

  loginTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
  },

  inputContainer: {
    marginBottom: 20,
  },

  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },

  input: {
    width: '100%',
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  passwordInput: {
    flex: 1,
    marginRight: 12,
  },

  showPasswordButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.2)',
  },

  showPasswordText: {
    fontSize: 14,
    fontWeight: '600',
  },

  loginButton: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
  },

  loginButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },

  toggleButton: {
    marginTop: 15,
    alignItems: 'center',
  },

  toggleButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  signUpButton: {
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  signUpPrompt: {
    marginTop: 6,
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
  },
  saveChangesButton: {
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  saveChangesButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LockScreen;