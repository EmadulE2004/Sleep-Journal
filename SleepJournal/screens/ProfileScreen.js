//ProfileScreen.js
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TextInput, Alert, Modal } from 'react-native';
import { UserContext } from '../UserContext';


function ProfileScreen({ navigation }) {
  const { user, setUser } = useContext(UserContext);

  const [username, setUsername] = useState(user.username);
  const [userEmail, setUserEmail] = useState(user.email);
  const [userBio, setUserBio] = useState(user.bio);

  const [showPass, setPass] = useState(false);
  const [currPass, setCurrPass] = useState('');
  const [newPass, setNewPass] = useState('');

  useEffect(() => {
    setUsername(user.username);
    setUserEmail(user.email);
    setUserBio(user.bio);

    navigation.setOptions({headerBackTitle: 'Home'});
  }, [user]);

  const handleSaveChanges = () => {
    setUser({
      ...user,
      username: username,
      email: userEmail,
      bio: userBio,
    });
    Alert.alert('Success', 'Profile changes saved!');
  };

  const passChange = () => {
    if(currPass === newPass) {
      Alert.alert("Error", "New password must be different from current password!");
    }

    setPass(false);
    setCurrPass('');
    setNewPass('');
    Alert.alert("Password changed", "Your password has updated.");
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {text: "Cancel", style: "cancel"},
      {text: "Logout", style: "destructive", onPress: () => {navigation.replace('Lock')}}
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>My Profile</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Username:</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={userEmail}
            onChangeText={setUserEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Bio:</Text>
          <TextInput
            style={[styles.input, styles.bioInput]}
            value={userBio}
            onChangeText={setUserBio}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Save Changes"
            onPress={handleSaveChanges}
            color="#007bff"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Go Back Home"
            onPress={() => navigation.goBack()} // 
            color="#6c757d"
          />
        </View>

        <View style = {styles.buttonContainer}>
          <Button
            title = "Change Password"
            onPress = {() => setPass(true)}
            color="#6f42c1"
          />
        </View>

        <View style = {styles.buttonContainer}>
          <Button
            title = "Logout"
            onPress = {handleLogout}
          />
        </View>
      </View>

      <Modal visible = {showPass} transparent animationType = 'fade'>
        <View style = {styles.backdrop}>
          <View style = {styles.box}>
            <Text style = {styles.modalTitle}>Change Password</Text>

            <TextInput
              placeholder = "Current Password"
              secureTextEntry
              style = {styles.modalInput}
              value = {currPass}
              onChangeText = {setCurrPass}
            />

            <TextInput
              placeholder = "New Password"
              secureTextEntry
              style = {styles.modalInput}
              value = {newPass}
              onChangeText ={setNewPass}
            />

            <View style = {styles.modalRow}>
              <Button title="Save" color="#007bff" onPress={passChange} />
              <Button title="Cancel" color="#6c757d" onPress={() => setPass(false)} /> 
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingVertical: 30, 
  },
  container: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#343a40',
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#495057',
  },
  input: {
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  bioInput: {
    height: 100, 
    textAlignVertical: 'top', 
    paddingVertical: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },

  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center'  
  },

  box: {
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 10,
    padding: 20,
    elevation: 10
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15
  },

  modalInput: {
    backgroundColor: '#f1f3f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16
  },

  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10
  }
});

export default ProfileScreen;