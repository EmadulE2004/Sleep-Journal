// LockScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function LockScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔒 LOCK SCREEN TEST 🔒</Text>
      <Text style={styles.subtitle}>If you see this, it's working!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up the whole screen
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center',    // Centers content horizontally
    backgroundColor: 'lightgray', // A clear, distinct background color
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'darkblue', // A dark, distinct text color
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'darkgreen', // Another distinct text color
  },
});

export default LockScreen;