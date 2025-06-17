import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Journal = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <View style={{ flex: 1 }}>
            {/* Journal stuff */}
        </View>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('NewEntry')}
      >
        <Ionicons name="add-circle" size={60} color="#4A90E2" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Journal;