import React, { useContext, useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../UserContext';
import { JournalContext } from '../JournalContext';
import { Calendar } from 'react-native-calendars';
import MoodSelection from './MoodSelection';
import ScreenBackgroundNoMoon from '../components/ScreenBackgroundNoMoon';
import NavBar from '../components/NavBar';
import Card from '../components/Card';
import { useTheme } from '../hooks/useTheme';

const Journal = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const { entries, removeEntry } = useContext(JournalContext); 
  const { colors: color, textStyles } = useTheme();

  const [showMoodSelection, setShowMoodSelection] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodFeedback, setMoodFeedback] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);

  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-CA'));

  const filteredEntries = entries.filter(
    entry => entry.date === selectedDate
  );

  useEffect(() => {
    const checkMoodSelection = async () => {
      try {
        const today = new Date().toLocaleDateString('en-CA');
        const moodKey = `mood_${today}`;
        const savedMood = await AsyncStorage.getItem(moodKey);
        
        if (savedMood) {
          const moodData = JSON.parse(savedMood);
          setSelectedMood(moodData.mood);
          setMoodFeedback(moodData.feedback);
        } else {
          setShowMoodSelection(true);
        }
        
        await loadMoodHistory();
      } catch (error) {
        console.log('Error checking mood selection:', error);
        setShowMoodSelection(true);
      }
    };

    checkMoodSelection();
  }, []);

  const loadMoodHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('mood_history');
      if (history) {
        setMoodHistory(JSON.parse(history));
      }
    } catch (error) {
      console.log('Error loading mood history:', error);
    }
  };

  const saveMoodHistory = async (mood) => {
    try {
      const today = new Date().toLocaleDateString('en-CA');
      const newEntry = {
        date: today,
        mood: mood,
        timestamp: new Date().toISOString()
      };
      
      const updatedHistory = [...moodHistory, newEntry].slice(-30);
      await AsyncStorage.setItem('mood_history', JSON.stringify(updatedHistory));
      setMoodHistory(updatedHistory);
    } catch (error) {
      console.log('Error saving mood history:', error);
    }
  };

  const analyzeMoodPatterns = () => {
    if (moodHistory.length < 3) return null;
    
    const recentMoods = moodHistory.slice(-7);
    const moodCounts = {};
    
    recentMoods.forEach(entry => {
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
    });
    
    const mostFrequentMood = Object.keys(moodCounts).reduce((a, b) => 
      moodCounts[a] > moodCounts[b] ? a : b
    );
    
    return {
      mostFrequent: mostFrequentMood,
      totalEntries: recentMoods.length,
      moodVariety: Object.keys(moodCounts).length
    };
  };

  const moodSelect = async (mood) => {
    setSelectedMood(mood);
    setShowMoodSelection(false);
    
    const feedback = generateMoodFeedback(mood);
    setMoodFeedback(feedback);
    
    try {
      const today = new Date().toLocaleDateString('en-CA');
      const moodKey = `mood_${today}`;
      const moodData = {
        mood: mood,
        feedback: feedback,
        timestamp: new Date().toISOString()
      };
      await AsyncStorage.setItem(moodKey, JSON.stringify(moodData));
      await saveMoodHistory(mood);
    } catch (error) {
      console.log('Error saving mood:', error);
    }
  };

  const generateMoodFeedback = (mood) => {
    const timeOfDay = new Date().getHours();
    const isEvening = timeOfDay >= 18 || timeOfDay <= 6;
    const isMorning = timeOfDay >= 6 && timeOfDay <= 12;
    const patterns = analyzeMoodPatterns();
    
    const feedbacks = {
      happy: [
        "Great to see you're feeling happy! This positive mood can contribute to better sleep quality. Consider journaling about what made your day special.",
        "Your happiness is contagious! A positive mindset like yours often leads to more restful sleep. Maybe write about the highlights of your day.",
        "Feeling happy is wonderful! This emotional state can help you fall asleep faster and enjoy deeper sleep cycles.",
        "Your positive energy is amazing! Happy people tend to have better sleep patterns. Consider what brought you joy today.",
        "Wonderful to see you in such good spirits! Happiness releases endorphins that can improve your sleep quality naturally."
      ],

      neutral: [
        "Feeling neutral is perfectly normal. Take a moment to reflect on your day and perhaps try some relaxation techniques before bed.",
        "A neutral mood is actually quite balanced. Consider what would help you feel more content before sleep tonight.",
        "Being neutral isn't bad at all. Sometimes it's the calm before finding something that truly makes you happy.",
        "Neutral feelings are valid. Maybe try some gentle stretching or reading to help transition into sleep mode.",
        "It's okay to feel neutral. This might be a good time to practice mindfulness or gratitude before bed."
      ],

      sad: [
        "It's okay to feel sad. Consider talking to someone you trust or writing about your feelings. Remember, tomorrow is a new day with new possibilities.",
        "I'm sorry you're feeling down. Sadness is a natural emotion, and it's important to acknowledge it. Tomorrow brings fresh opportunities.",
        "Feeling sad is part of being human. Consider what might help lift your spirits, even if it's just a small thing.",
        "Your sadness is valid. Sometimes the best thing we can do is be gentle with ourselves and get some rest.",
        "It's okay to not be okay. Sadness often passes with time, and sleep can help your mind process these feelings."
      ],

      tired: [
        "You seem tired today. Make sure to prioritize rest and maybe try going to bed a bit earlier tonight. Your body needs the recovery time.",
        "Being tired is your body's way of asking for rest. Consider what's been draining your energy and how to recharge.",
        "Fatigue is a sign to slow down. Your body is telling you it needs more rest than usual today.",
        "Feeling tired is completely normal. Maybe try some gentle activities and give yourself permission to rest more.",
        "Your tiredness is valid. Sometimes the best self-care is simply getting the sleep your body is asking for."
      ],

      angry: [
        "Feeling angry can be challenging. Try some deep breathing exercises or write down your thoughts to help process these emotions before sleep.",
        "Anger is a powerful emotion. Consider what triggered it and how you might release this energy in a healthy way.",
        "Your anger is understandable. Sometimes writing about what upset you can help process these feelings before bed.",
        "Anger can be exhausting. Try some physical activity or meditation to help calm your mind before sleep.",
        "It's okay to feel angry. The key is finding healthy ways to process it so it doesn't interfere with your rest."
      ]
    };
    
    const moodMessages = feedbacks[mood] || feedbacks.neutral;
    const randomMessage = moodMessages[Math.floor(Math.random() * moodMessages.length)];
    
    let timeContext = "";
    if (isEvening) {
      timeContext = " Since it's evening, consider winding down with some calming activities.";
    } else if (isMorning) {
      timeContext = " Starting your day with this mood sets the tone for how you might feel later.";
    }
    
    let patternInsight = "";
    if (patterns) {
      if (patterns.mostFrequent === mood && patterns.totalEntries >= 3) {
        patternInsight = ` I notice you've been feeling ${mood} frequently lately. `;
        if (mood === 'sad' || mood === 'angry') {
          patternInsight += "Consider what might be contributing to this pattern and what could help shift it.";
        } else if (mood === 'happy') {
          patternInsight += "Your consistent positive mood is wonderful for your overall well-being!";
        } else if (mood === 'tired') {
          patternInsight += "Your body might be telling you it needs more consistent rest or a change in routine.";
        }
      } else if (patterns.moodVariety >= 4) {
        patternInsight = " You've been experiencing a good variety of emotions recently, which shows emotional awareness.";
      }
    }
    
    let sleepAdvice = "";
    switch(mood) {
      case 'happy':
        sleepAdvice = " Your positive mood should help you sleep well tonight.";
        break;
      case 'neutral':
        sleepAdvice = " A neutral mood can actually be ideal for falling asleep.";
        break;
      case 'sad':
        sleepAdvice = " Consider talking to someone or writing in your journal before bed.";
        break;
      case 'tired':
        sleepAdvice = " Listen to your body and get the rest you need.";
        break;
      case 'angry':
        sleepAdvice = " Try some relaxation techniques to help you sleep despite the anger.";
        break;
    }
    
    return randomMessage + timeContext + patternInsight + sleepAdvice;
  };

  const getMoodIcon = (mood) => {
    const icons = {
      happy: require('../assets/icons/happy.png'),
      neutral: require('../assets/icons/neutral.png'),
      sad: require('../assets/icons/sad.png'),
      tired: require('../assets/icons/tired.png'),
      angry: require('../assets/icons/angry.png')
    };
    return icons[mood];
  };

  const getMoodColor = (mood) => {
    const colors = {
      happy: color.green,
      neutral: color.yellow,
      sad: color.blue,
      tired: color.orange,
      angry: color.red
    };
    return colors[mood] || color.tint;
  };

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
    const name = user && (user.displayName || user.username);
    if(name) {
      fullGreet = `${greet}, ${name}.`;
    }
    return fullGreet;
  }

  return (
    <ScreenBackgroundNoMoon>
      <ScrollView contentContainerStyle = {styles.scrollContent}>
        <View style = {styles.userSection}>
          <Text style = {[styles.greet, { color: color.text }]}> 
            {timeGreeting(user)}
          </Text>
        </View>

        <Text style = {[styles.title, { color: color.text }]}>Sleep Journal</Text>

        {selectedMood && (
          <View style = {styles.moodSection}>
            <Card variant = "primary" style = {styles.moodCard}>
              <Text style={[styles.moodTitle, { color: color.text }]}>
                Today's Mood
              </Text>
              <View style = {styles.moodDisplay}>
                <Image 
                  source = {getMoodIcon(selectedMood)} 
                  style = {[
                    styles.moodDisplayIcon, 
                    { tintColor: getMoodColor(selectedMood) }
                  ]}
                />
                <Text style={[styles.moodText, { color: color.text }]}>
                  {selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)}
                </Text>
              </View>
              <Text style={[styles.moodFeedback, { color: color.icon }]}>
                {moodFeedback}
              </Text>
              <TouchableOpacity 
                style={[styles.changeMoodButton, { borderColor: color.tint }]}
                onPress={() => setShowMoodSelection(true)}
              >
                <Text style={[styles.changeMoodButtonText, { color: color.tint }]}>
                  Change Mood
                </Text>
              </TouchableOpacity>
            </Card>
          </View>
        )}

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
        <Image source = {require('../assets/icons/journalAddButton.png')} style = {styles.addButtonIcon}/>
      </TouchableOpacity>
      <NavBar items = {navIcons} />
      <MoodSelection visible = {showMoodSelection} select = {moodSelect} close = {() => setShowMoodSelection(false)}/>
    </ScreenBackgroundNoMoon>
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

  moodSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  moodCard: {
    paddingVertical: 20,
    alignItems: 'center',
  },

  moodTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },

  moodDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  moodDisplayIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },

  moodText: {
    fontSize: 20,
    fontWeight: '600',
    textTransform: 'capitalize',
  },

  moodFeedback: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 10,
  },

  changeMoodButton: {
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.2)',
    alignSelf: 'center',
  },

  changeMoodButtonText: {
    fontSize: 14,
    fontWeight: '600',
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
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(244, 67, 54, 0.2)',
  },
  
  removeButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#F44336',
  },
  
  bottomSpacing: {
    height: 120,
  },
  
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 20,
  },
  
  userSection: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  
  dateText: {
    fontSize: 14,
    fontWeight: '400',
    opacity: 0.7,
    color: 'white',
  },
});

export default Journal;