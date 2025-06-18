import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { UserContext } from '../UserContext';
import { JournalContext } from '../JournalContext'; // <-- Add this
import PencilIcon from '../assets/icons/journalAddButton.png';

const Journal = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const { entries } = useContext(JournalContext); // <-- Add this

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
      <View style={styles.header}>
        <Text style={styles.greet}>
          {timeGreeting(user)}
        </Text>
        <Text style={styles.title}>My Notes</Text>
      </View>
      <View style={{ flex: 1 }}>
        {entries.length === 0 ? (
          <View style={styles.centered}>
            <Text style={styles.placeholderText}>
              No journal entries yet.
            </Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.entriesContainer}>
            {entries.map((entry, idx) => (
              <View key={idx} style={styles.entryCard}>
                <Text style={styles.entryText}>{entry}</Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('NewEntry')}
      >
        <Image source={require('../assets/icons/journalAddButton.png')} style={{ width: 30, height: 30 }}/>
      </TouchableOpacity>

      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.navIcon}>
          <Image source={require('../assets/icons/home.png')} style={styles.icon}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navIcon}>
          <Image source={require('../assets/icons/journal.png')} style={styles.icon}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navIcon}>
          <Image source={require('../assets/icons/graph.png')} style={styles.icon}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.navIcon}>
          <Image source={require('../assets/icons/user.png')} style={styles.icon}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  greet: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: 'bold',
    marginTop: 70,
    marginBottom: -10,
    color: '#333',
  },
  title: {
    fontSize: 35,
    fontWeight: 'sans-serif',
    marginTop: 15,
    color: '#333',
  },
  centered: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    color: '#888',
    top: 200,
    
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingVertical: 30,
  },
  addButton: {
    position: 'absolute',
    bottom: 750,  
    right: 15,
    width: 40,   
    height: 40,  
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,  
    elevation: 5,
  },
  navBar: {
    position: 'absolute',
    top: 770,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 0,
    borderTopColor: 'black',
    gap: 35,
    shadowRadius: 4,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderRadius: 40,
  },
  navIcon: {
    alignItems: 'center'
  },

  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },
  entriesContainer: {
    padding: 20,
  },
  entryCard: {
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  entryText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Journal;