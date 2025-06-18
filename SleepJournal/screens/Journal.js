import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { UserContext } from '../UserContext';

const Journal = ({ navigation }) => {
  const {user} = useContext(UserContext);

  function timeGreeting(user) {
        const time = new Date().getHours();
        let greet = "";

        if (time < 12) {
            greet = "Good Morning";
        } else if (time < 18) {
            greet = "Good Afternoon";
        } else if (time < 22) {
            greet = "Good Evening";
        } else {
            greet = "You're up late";
        }

        let fullGreet = "";
        if(user && user.username) {
            fullGreet = `${greet}, ${user.username}.`;
        } 
        return fullGreet;
    }

  return (
    <View style={styles.container}>
      <View style = {styles.header}>
        <Text style={styles.greet}>
          {timeGreeting(user)}
        </Text>
        <Text style = {styles.title}>My Notes</Text>
      </View>
       <View style={{ flex: 1 }}>
            {/* Journal stuff */}
            <View style = {styles.centered}>

              <Text style = {styles.placeholderText}>
                No journal entries yet.
              </Text>
            </View>
        </View>

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('NewEntry')}
      >
        <Image source = {require('../assets/icons/journalAddButton.png')} style = {styles.addButton}/>
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
    top: 40,
    right: 20,
    zIndex: 10,
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