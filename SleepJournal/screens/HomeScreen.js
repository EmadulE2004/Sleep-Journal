// src/screens/HomeScreen.js (or just screens/HomeScreen.js)
import React, {useContext} from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image,} from 'react-native';
import { UserContext } from '../UserContext'

function HomeScreen({ navigation }) {
    const {user} = useContext(UserContext);

  return (
    <View style={styles.container}>
        <View>
            <Text style={styles.title}>
                Good Morning, {user.username}!
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