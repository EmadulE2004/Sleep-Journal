import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image, ScrollView,} from 'react-native';
import { UserContext } from '../UserContext';
import { JournalContext } from '../JournalContext';
import { Calendar } from 'react-native-calendars'; // <-- Add this import
import MoodSelection from './MoodSelection';
import ScreenBackground from '../components/ScreenBackground';
import NavBar from '../components/NavBar';
import Card from '../components/Card';
import { useTheme } from '../hooks/useTheme';

const Journal = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const { entries, removeEntry } = useContext(JournalContext); 
    const { colors: color, textStyles } = useTheme();


  const [mood, setMood] = useState(true);
  const [select, setSelect] = useState(null);

  const moodSelect = (mood) => {
    setSelect(mood);
    setMood(false);
  }

  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-CA'));

  const filteredEntries = entries.filter(
  entry => entry.date === selectedDate
  );

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

  const navIcons = [
    {
      id: 'home',
      icon: require('../assets/icons/home.png'),
      onPress: () => navigation.navigate('Home'),
      isActive: false
    },
    {
      id: 'journal',
      icon: require('../assets/icons/journal.png'),
      isActive: true
    },
    {
      id: 'statistics',
      icon: require('../assets/icons/graph.png'),
      onPress: () => navigation.navigate('Statistics'),
      isActive: false
    },
    {
      id: 'profile',
      icon: require('../assets/icons/user.png'),
      onPress: () => navigation.navigate('Profile'),
      isActive: false
    }
  ];

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
    <ScreenBackground>
      <ScrollView contentContainerStyle = {styles.scrollContent}>
        <View style = {styles.userSection}>
          <Text style = {[styles.greet, { color: color.text }]}> 
            {timeGreeting(user)}
          </Text>
        </View>

        <Text style = {[styles.title, { color: color.text }]}>Sleep Journal</Text>

        <View style = {styles.calendarSection}>
          <Card variant = "secondary" style = {styles.calendarCard}>
            <Calendar
              style = {styles.calendar}
              theme = {{
                backgroundColor: 'transparent',
                calendarBackground: 'transparent',
                textSectionTitleColor: color.text,
                selectedDayBackgroundColor: color.tint,
                selectedDayTextColor: '#0B1426',
                todayTextColor: color.tint,
                dayTextColor: color.text,
                textDisabledColor: color.icon,
                dotColor: color.tint,
                selectedDotColor: '#0B1426',
                arrowColor: color.tint,
                monthTextColor: color.text,
                indicatorColor: color.tint,
                textDayFontWeight: '400',
                textMonthFontWeight: '600',
                textDayHeaderFontWeight: '500',
                textDayFontSize: 16,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 14,
              }}
              onDayPress = {day  => setSelectedDate(day.dateString)}
              markedDates = {{
                [selectedDate]: {
                  selected: true,
                  selectedColor: color.tint,
                  selectedTextColor: '#0B1426',
                },
              }}
            />
          </Card>
        </View>

        <View style = {styles.entriesSection}>
          {filteredEntries.length === 0 ? (
            <View style = {styles.centered}>
              <Card variant = "primary" style = {styles.emptyCard}>
                <Text style = {[styles.placeholderText, { color: color.icon }]}>No journal entries for this day.</Text>
                <Text style = {[styles.placeholderSubtext, { color: color.icon }]}>Tap the pencil button to log your first entry</Text>
              </Card>
            </View>
          ) : (
            <View style = {styles.entriesContainer}>
              {filteredEntries.map((entry, idx) => (
                <Card key = {idx} variant = "primary" style = {styles.entryCard}>
                  <View style = {styles.entryHeader}>
                    <Text style = {[styles.entryDate, { color: color.icon }]}>{entry.date}</Text>
                    <TouchableOpacity style = {styles.removeButton} onPress = {() => removeEntry(idx)}>
                      <Text style = {styles.removeButtonText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style = {[styles.entryText, { color: color.text }]}>{entry.text}</Text>
                </Card>
              ))}
            </View>
          )}
        </View>
        <View style = {styles.bottomSpacing}/>
      </ScrollView>
      <TouchableOpacity
        style = {styles.addButton}
        onPress = {() => navigation.navigate('NewEntry', { date: selectedDate })}
      >
        <Image source = {require('../assets/icons/journalAddButton.png')} style = {styles.addButtonIcon} />
      </TouchableOpacity>
      <NavBar items = {navIcons} />
      <MoodSelection visible = {mood} select = {moodSelect} close = {() => setMood(false)} />
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  headerContent: {
    flex: 1,
  },
  
  greet: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  
  title: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  
  addButton: {
    position: 'absolute',
    top: 80,
    right: 30,
    zIndex: 10,
    padding: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(74, 144, 226, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.3)',
  },
  
  addButtonIcon: {
    width: 24,
    height: 24,
    tintColor: '#4A90E2',
  },
  
  calendarSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  
  calendarCard: {
    paddingVertical: 10,
  },
  
  calendar: {
    borderRadius: 15,
  },
  
  entriesSection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
  
  placeholderText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 8,
  },
  
  placeholderSubtext: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    opacity: 0.7,
  },
  
  entriesContainer: {
    paddingBottom: 120,
  },
  
  entryCard: {
    marginBottom: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  entryDate: {
    fontSize: 14,
    fontWeight: '500',
  },
  
  entryText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  
  removeButton: {
    backgroundColor: 'rgba(255, 77, 77, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 77, 77, 0.3)',
  },
  
  removeButtonText: {
    color: '#FF4D4D',
    fontWeight: '600',
    fontSize: 12,
  },

  scrollContent: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  
  userSection: {
    marginBottom: 12,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  bottomSpacing: {
    height: 120,
  },
});

export default Journal;