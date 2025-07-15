//ProfileScreen.js
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Image, TouchableOpacity } from 'react-native';
import { UserContext } from '../UserContext';
import { auth } from '../firebase';
import { updateProfile, updateEmail, signOut, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import ScreenBackground from '../components/ScreenBackground';
import NavBar from '../components/NavBar';
import Card from '../components/Card';
import { useTheme } from '../hooks/useTheme';
import { ScrollView } from 'react-native-gesture-handler';

function ProfileScreen({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  const { colors: color } = useTheme();

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
  }, [user]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfilePic(result.assets[0].uri);
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

  const handleSaveChanges = async () => {
    try {
      if (auth.currentUser) {
        if (username !== auth.currentUser.displayName) {
          await updateProfile(auth.currentUser, { displayName: username });
        }
        if (userEmail !== auth.currentUser.email) {
          await updateEmail(auth.currentUser, userEmail);
        }
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

  const handleChangePassword = () => {
    setPass(true);
  };

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

  function DateDisplay() {
    const [currentDate] = useState(new Date());
    return (
      <Text style={[styles.dateText, { color: color.text }]}> 
        {currentDate.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </Text>
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
    const name = user && (user.displayName || user.username);
    if(name) {
      fullGreet = `${greet}, ${name}.`;
    }
    return fullGreet;
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
      onPress: () => navigation.navigate('Journal'),
      isActive: false
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
      isActive: true
    }
  ];

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle = {styles.scrollContent}>
        <View style = {styles.header}>
          <Text style = {[styles.title, { color: color.text }]}>{timeGreeting(user)}</Text>
          <DateDisplay />
        </View>
        <View style = {styles.profileSection}>
          <Card variant = "secondary" style = {styles.profileCard}>
            <TouchableOpacity style = {styles.avatarContainer} onPress = {pickImage}>
              <Image
                source = {profilePic ? { uri: profilePic } : require('../assets/icons/user.png')}
                style = {styles.avatar}
              />
              <Text style = {[styles.avatarText, { color: color.tint }]}>Change Photo</Text>
            </TouchableOpacity>
            <View style = {styles.fieldGroup}>
              <Text style = {[styles.label, { color: color.icon }]}>Username</Text>
              <TextInput
                style = {[styles.inputBubble, { color: color.text, borderColor: color.cardBorder }]}
                value = {username}
                onChangeText = {setUsername}
                autoCapitalize = "none"
                placeholder = "Enter your username"
                placeholderTextColor = {color.icon}
              />
            </View>
            <View style = {styles.fieldGroup}>
              <Text style = {[styles.label, { color: color.icon }]}>Email</Text>
              <TextInput
                style = {[styles.inputBubble, { color: color.text, borderColor: color.cardBorder }]}
                value = {userEmail}
                onChangeText = {setUserEmail}
                keyboardType = "email-address"
                autoCapitalize = "none"
                placeholder = "Enter your email"
                placeholderTextColor = {color.icon}
              />
            </View>
            <View style = {styles.fieldGroup}>
              <Text style = {[styles.label, { color: color.icon }]}>Bio</Text>
              <TextInput
                style = {[styles.inputBubble, styles.bioInput, { color: color.text, borderColor: color.cardBorder }]}
                value = {userBio}
                onChangeText = {setUserBio}
                multiline
                numberOfLines = {4}
                placeholder = "Tell us about yourself"
                placeholderTextColor = {color.icon}
              />
            </View>
            <TouchableOpacity style = {styles.saveChangesButton} onPress = {handleSaveChanges}>
              <Text style = {[styles.saveChangesButtonText, { color: color.tint }]}>Save Changes</Text>
            </TouchableOpacity>
          </Card>
        </View>
        <View style = {styles.actionsSection}>
          <Card variant = "primary" style = {styles.actionsCard}>
            <TouchableOpacity style = {styles.changePasswordButton} onPress = {handleChangePassword}>
              <Image source = {require('../assets/icons/lock.png')} style = {styles.logoutIcon} />
              <Text style = {[styles.logoutButtonText, { color: color.tint }]}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.logoutButton} onPress = {handleLogout}>
              <Image source = {require('../assets/icons/user.png')} style = {styles.logoutIcon} />
              <Text style = {[styles.logoutButtonText, { color: color.tint }]}>Logout</Text>
            </TouchableOpacity>
          </Card>
        </View>
        {showPass && (
          <View style = {styles.passModalBackdrop}>
            <View style = {styles.passModalBox}>
              <Text style = {styles.passModalTitle}>Change Password</Text>
              <TextInput
                placeholder = "Current Password"
                secureTextEntry
                style = {styles.passModalInput}
                value = {currPass}
                onChangeText = {setCurrPass}
                placeholderTextColor = {color.icon}
              />
              <TextInput
                placeholder = "New Password"
                secureTextEntry
                style = {styles.passModalInput}
                value = {newPass}
                onChangeText = {setNewPass}
                placeholderTextColor = {color.icon}
              />
              <View style = {styles.passModalRow}>
                <TouchableOpacity style = {styles.passModalSave} onPress = {passChange}>
                  <Text style = {styles.passModalSaveText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.passModalCancel} onPress = {() => setPass(false)}>
                  <Text style = {styles.passModalCancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        <View style = {styles.bottomSpacing}/>
      </ScrollView>
      <NavBar items = {navIcons} />
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 0,
  },

  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginBottom: 8,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 0,
  },

  dateText: {
    fontSize: 18,
    fontWeight: '400',
    opacity: 0.8,
  },

  profileSection: {
    marginBottom: 20,
  },

  profileCard: {
    alignItems: 'center',
    paddingVertical: 25,
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
  },

  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e9ecef',
    marginBottom: 8,
  },

  avatarText: {
    fontSize: 14,
    fontWeight: '500',
  },

  fieldGroup: {
    width: '100%',
    marginBottom: 16,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },

  inputBubble: {
    width: '100%',
    height: 50,
    borderRadius: 24,
    paddingHorizontal: 18,
    fontSize: 16,
    borderWidth: 1.5,
    backgroundColor: 'rgba(26, 35, 50, 0.18)',
    marginBottom: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },

  bioInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingVertical: 10,
  },

  saveButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#4A90E2',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },

  saveButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },

  actionsSection: {
    marginBottom: 20,
  },

  actionsCard: {
    alignItems: 'center',
    paddingVertical: 20,
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
  },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 77, 77, 0.12)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 77, 77, 0.25)',
    marginTop: 4,
    shadowColor: '#FF4D4D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
  },

  logoutIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    tintColor: '#FF4D4D',
  },

  logoutButtonText: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  bottomSpacing: {
    height: 120,
  },

  changePasswordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(74, 144, 226, 0.12)',
    borderWidth: 1.5,
    borderColor: 'rgba(74, 144, 226, 0.25)',
    marginBottom: 10,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
  },

  passModalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },

  passModalBox: {
    backgroundColor: 'rgba(26, 35, 50, 0.95)',
    borderRadius: 20,
    padding: 24,
    width: '85%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
  },

  passModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 18,
  },

  passModalInput: {
    width: '100%',
    height: 48,
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(74, 144, 226, 0.3)',
    backgroundColor: 'rgba(255,255,255,0.08)',
    color: '#fff',
    marginBottom: 14,
  },

  passModalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },

  passModalSave: {
    flex: 1,
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    marginRight: 8,
  },

  passModalSaveText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  passModalCancel: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    marginLeft: 8,
    borderWidth: 1.2,
    borderColor: 'rgba(74, 144, 226, 0.2)',
  },

  passModalCancelText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  saveChangesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(74, 144, 226, 0.12)',
    borderWidth: 1.5,
    borderColor: 'rgba(74, 144, 226, 0.25)',
    marginBottom: 10,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    marginTop: 10,
  },
  
  saveChangesButtonText: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default ProfileScreen;