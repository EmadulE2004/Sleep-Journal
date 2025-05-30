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
    flex: 1, 
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center',    // Centers content horizontally
    backgroundColor: 'lightgray', // don't hate on gray Mahfuz
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'darkblue', 
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'darkgreen', 
  },
});

export default LockScreen;