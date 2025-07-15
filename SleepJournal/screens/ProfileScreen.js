//ProfileScreen.js
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TextInput, Alert, Modal, Image, TouchableOpacity } from 'react-native';
import { UserContext } from '../UserContext';
import { auth } from '../firebase'; // <-- Import Firebase Auth
import { updateProfile, updateEmail, signOut, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';

function ProfileScreen({ navigation }) {
  const { user, setUser } = useContext(UserContext);

  const [username, setUsername] = useState(user?.displayName || '');
  const [userEmail, setUserEmail] = useState(user?.email || '');
  const [userBio, setUserBio] = useState(user?.bio || '');
  const [profilePic, setProfilePic] = useState(user?.photoURL || null);

  const [showPass, setPass] = useState(false);
  const [currPass, setCurrPass] = useState('');
  const [newPass, setNewPass] = useState('');

  useEffect(() => {
    setUsername(user?.displayName || '');
    setUserEmail(user?.email || '');
    setUserBio(user?.bio || '');
    setProfilePic(user?.photoURL || null);
    navigation.setOptions({headerBackTitle: 'Home'});
  }, [user]);

  // Image picker handler
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfilePic(result.assets[0].uri);
      // Optionally update Firebase user profile
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { photoURL: result.assets[0].uri });
        setUser({
          ...auth.currentUser,
          displayName: username,
          email: userEmail,
          bio: userBio,
          photoURL: result.assets[0].uri,
        });
      }
    }
  };

  // Save changes to Firebase
  const handleSaveChanges = async () => {
    try {
      if (auth.currentUser) {
        // Update display name
        if (username !== auth.currentUser.displayName) {
          await updateProfile(auth.currentUser, { displayName: username });
        }
        // Update email
        if (userEmail !== auth.currentUser.email) {
          await updateEmail(auth.currentUser, userEmail);
        }
        // Optionally update bio in your database if you store it elsewhere
        setUser({
          ...auth.currentUser,
          displayName: username,
          email: userEmail,
          bio: userBio,
        });
        Alert.alert('Success', 'Profile changes saved!');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // Change password with re-authentication
  const passChange = async () => {
    if (!currPass || !newPass) {
      Alert.alert("Error", "Please fill in both fields.");
      return;
    }
    if (currPass === newPass) {
      Alert.alert("Error", "New password must be different from current password!");
      return;
    }
    try {
      const credential = EmailAuthProvider.credential(auth.currentUser.email, currPass);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPass);
      setPass(false);
      setCurrPass('');
      setNewPass('');
      Alert.alert("Password changed", "Your password has updated.");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  // Logout using Firebase
  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {text: "Cancel", style: "cancel"},
      {text: "Logout", style: "destructive", onPress: async () => {
        await signOut(auth);
        setUser(null);
        navigation.replace('Lock');
      }}
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Profile Picture Section */}
        <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
          <Image
            source={
              profilePic
                ? { uri: profilePic }
                : require('../assets/icons/user.png')
            }
            style={styles.avatar}
          />
          <Text style={styles.avatarText}>Change Photo</Text>
        </TouchableOpacity>

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
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e9ecef',
    marginBottom: 8,
  },
  avatarText: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ProfileScreen;