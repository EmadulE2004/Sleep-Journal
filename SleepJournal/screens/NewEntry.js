import React, { useState, useContext } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Text,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
import { JournalContext } from '../JournalContext';
import ScreenBackground from '../components/ScreenBackground';
import Card from '../components/Card';
import { useTheme } from '../hooks/useTheme';
import { ScrollView } from 'react-native-gesture-handler';

const NewEntry = ({ navigation, route }) => {
  const [entry, setEntry] = useState('');
  const { addEntry } = useContext(JournalContext);
  const {colors: color, textStyles} = useTheme();
  const date = route?.params?.date || new Date().toISOString().slice(0, 10);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleSave = () => {
    if (entry.trim()) {
      addEntry(entry.trim(), date);
    }
    navigation.goBack();
  };

  return (
    <ScreenBackground>
      <KeyboardAvoidingView
        behavior = {Platform.OS === 'ios' ? 'padding' : 'height'}
        style = {styles.container}
      >
        <ScrollView
          style = {styles.scrollContainer}
          showsVerticalScrollIndicator = {false}
          contentContainerStyle = {styles.scrollContent}
        >
          <View style = {styles.header}>
            <Text style = {[styles.title, { color: color.text }]}>
              New Journal Entry
            </Text>
            <Text style = {[styles.dateText, { color: color.icon }]}>
              {formatDate(date)}
            </Text>
          </View>

          <Card variant = "primary" style = {styles.entryCard}>
            <Text style = {[styles.label, { color: color.text }]}>
              How was your sleep?
            </Text>
            <TextInput
              style = {[styles.textInput, { 
                color: color.text,
                borderColor: color.cardBorder,
                backgroundColor: 'rgba(26, 35, 50, 0.3)'
              }]}
              multiline
              placeholder = "Write about your sleep experience, dreams, or how you're feeling."
              placeholderTextColor = {color.icon}
              value = {entry}
              onChangeText = {setEntry}
              autoFocus
              textAlignVertical = "top"
            />
          </Card>

          <View style = {styles.actionButtons}>
            <TouchableOpacity 
              style = {styles.cancelButton}
              onPress = {() => navigation.goBack()}
            >
              <Text style = {[styles.cancelButtonText, { color: color.icon }]}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style = {[
                styles.saveButton,
                { 
                  backgroundColor: entry.trim() ? color.tint : 'rgba(74, 144, 226, 0.3)',
                  borderColor: entry.trim() ? color.tint : 'rgba(74, 144, 226, 0.2)'
                }
              ]} 
              onPress = {handleSave}
              disabled = {!entry.trim()}
            >
              <Text style = {[
                styles.saveButtonText,
                { color: entry.trim() ? '#0B1426' : color.icon }
              ]}>
                Save Entry
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  scrollContainer: {
    flex: 1,
  },
  
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  
  title: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  
  dateText: {
    fontSize: 16,
    fontWeight: '400',
    opacity: 0.8,
  },
  
  entryCard: {
    flex: 1,
    marginBottom: 30,
  },
  
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  
  textInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    minHeight: 200,
  },
  
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    backgroundColor: 'rgba(123, 158, 137, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(123, 158, 137, 0.2)',
    alignItems: 'center',
  },
  
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  
  saveButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NewEntry;

