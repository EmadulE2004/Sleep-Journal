import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { UserContext } from '../UserContext';
import { JournalContext } from '../JournalContext';
import { Calendar } from 'react-native-calendars'; // <-- Add this import

const Journal = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const { entries, removeEntry } = useContext(JournalContext); 

  // Add selectedDate state
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-CA'));

  // Filter entries for the selected date
  const filteredEntries = entries.filter(
  entry => entry.date === selectedDate
  );

  //Display today's date
      function DateDisplay() {
          const [currentDate] = useState(new Date());
          return (
              <View>
                  <Text style={styles.dateText}>
                      Today's date: {currentDate.toLocaleDateString()}
                  </Text>
              </View>
          );
      }

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

      {/* Calendar at the top */}
      <Calendar
        style={styles.calendar}
        onDayPress={day => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: {selected: true, selectedColor: '#007AFF'}
        }}
      />

      <View style={{ flex: 1 }}>
        {filteredEntries.length === 0 ? (
          <View style={styles.centered}>
            <Text style={styles.placeholderText}>
              No journal entries for this day.
            </Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.entriesContainer}>
            {filteredEntries.map((entry, idx) => (
              <View key={idx} style={styles.entryCard}>
                <Text style={styles.entryDate}>{entry.date}</Text>
                <Text style={styles.entryText}>{entry.text}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeEntry(idx)}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}
      </View>

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('NewEntry', { date: selectedDate })}
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
  dateText: {
    fontFamily: 'Arial',
    fontSize: 20,
    right: -5,
    marginTop: 10,
    color: 'black',
  },

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
    bottom: 95,  
    right: 25,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,  
    elevation: 5,
  },
  navBar: {
    position: 'absolute',
    bottom: 20,
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
  entryDate: {
    fontSize: 13,
    color: '#888',
    marginBottom: 5,
  },
  entryText: {
    fontSize: 16,
    color: '#333',
  },
  removeButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
    backgroundColor: '#ff4d4d',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  calendar: {
    margin: 10,
    borderRadius: 10,
    elevation: 2,
  },
});

export default Journal;