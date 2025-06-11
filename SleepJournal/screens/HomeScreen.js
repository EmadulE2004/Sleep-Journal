// src/screens/HomeScreen.js (or just screens/HomeScreen.js)
import React, {useContext} from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image,} from 'react-native';
import { UserContext } from '../UserContext'

function HomeScreen({ navigation }) {
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
        <View>
            <Text style={styles.title}>
                {timeGreeting(user)}
            </Text>
        </View>

        <View style = {styles.navBar}>
            <TouchableOpacity style = {styles.navIcon}>
                <Image source = {require('../assets/icons/home.png')} style={styles.icon}/>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.navIcon}>
                <Image source = {require('../assets/icons/journal.png')} style={styles.icon}/>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.navIcon}>
                <Image source = {require('../assets/icons/graph.png')} style={styles.icon}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Profile')} style = {styles.navIcon}>
                <Image source = {require('../assets/icons/user.png')} style={styles.icon}/>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    
    title: { 
        fontSize: 24, 
        marginBottom: 20 
    },
    navBar: {
        fontFamily: 'roboto',
        marginTop: 545,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'transparent',
        paddingVertical: 10,
        borderTopWidth: 0,
        borderTopColor: 'black',
        gap: 35,
    },

    navIcon: {
        alignItems: 'center'
    },

    icon: {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    }
});

export default HomeScreen;