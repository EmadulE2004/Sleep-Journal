// src/screens/HomeScreen.js (or just screens/HomeScreen.js)
import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <View>
            <Text style={styles.title}>Welcome Home!</Text>
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
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        paddingVertical: 14,
        borderTopWidth: 1,
        borderTopColor: 'black'
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