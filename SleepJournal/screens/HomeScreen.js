// src/screens/HomeScreen.js (or just screens/HomeScreen.js)
import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image,} from 'react-native';
import { UserContext } from '../UserContext'
import clockImage from '../assets/images/clock.jpg';

function HomeScreen({ navigation }) {
    const {user} = useContext(UserContext);


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
            <DateDisplay />
        </View>

        <View style={styles.clockContainer}>
            <Image 
                source={clockImage} 
                style={styles.clockImage}
            />
        </View>

        <View style={styles.navBar}>
            <TouchableOpacity style={styles.navIcon}>
                <Image source={require('../assets/icons/home.png')} style={styles.icon}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navIcon}>
                <Image source={require('../assets/icons/journal.png')} style={styles.icon}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navIcon}>
                <Image source={require('../assets/icons/graph.png')} style={styles.icon}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.navIcon}>
                <Image source={require('../assets/icons/user.png')} style={styles.icon}/>
            </TouchableOpacity>
        </View>
    </View>
);

}

const styles = StyleSheet.create({

    dateText: {
        fontFamily: 'Arial',
        fontSize: 20,
        right: 1,
        marginTop: 10,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    title: {
        fontSize: 24,
        marginTop: 100,
        left: 12,
    },

    clockContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    clockImage: {
        marginBottom: 200,
        backgroundColor: 'clear',
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    navBar: {
        position: 'absolute',
        bottom: 20,
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