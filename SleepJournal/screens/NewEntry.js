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

const NewEntry = ({ navigation }) => {
  const [entry, setEntry] = useState('');
  const { addEntry } = useContext(JournalContext);

  const handleSave = () => {
    if (entry.trim()) {
      console.log('Adding entry:', entry.trim()); // Add this debug log
      addEntry(entry.trim());
    }
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.dateText}>
        {`Today's date: ${new Date().toLocaleDateString()}`}
      </Text>
      <TextInput
        style={styles.textInput}
        multiline
        placeholder="Write your journal entry here..."
        value={entry}
        onChangeText={setEntry}
        autoFocus
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Log</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 25,
    paddingTop: 60
  },
  textInput: {
    marginBottom: 25,
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: 'top',
    padding: 15,
    backgroundColor: 'lightgray',
    borderRadius: 16
  },
  saveButton: {
    width: '50%',
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 50,
    alignItems: 'center'
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600'
  },
  dateText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
    alignSelf: 'center',
  }
});

export default NewEntry;

