// src/screens/HomeScreen.js (or just screens/HomeScreen.js)
import React, {useContext, useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image, ImageBackground} from 'react-native';
import { UserContext } from '../UserContext'
import background from '../assets/backgrounds/sleepjournalbackground.png';
import AnalogClock from './SleepClock';
import { initHealthKit, getSleepSamples } from './utils/AppleHealth';

function timeStringToHour(timeStr) {
    if (!timeStr || typeof timeStr !== 'string') return 0;
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    return hours + minutes / 60;
}

function HomeScreen({ navigation }) {
    const {user} = useContext(UserContext);
    const [sleep, setSleep] = useState({
        duration: '6.5',
        start: '11:30 PM',
        end: '6:00 AM'
    });

    useEffect(function () {
        async function getSleep() {
            try {
                await initHealthKit();
                const data = await getSleepSamples();

                if(data.length > 0) {
                    const latest = data[data.length - 1];
                    const start = new Date(latest.startDate);
                    const end = new Date(latest.endDate);
                    const dur = ((end - start) / (1000 * 60 * 60)).toFixed(1);

                    setSleep({
                        duration: dur,
                        start: start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        end: end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    });
                } else {
                    setSleep({ duration: 'null', start: 'null', end: 'null' });
                }
            } catch (error) {
                console.log("Cannot fetch sleep data", error);
            }
        }
        getSleep();
    }, []);

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
    <ImageBackground source={background} style={styles.background}>
    <View style={styles.container}>
        <View>
            <Text style={styles.title}>
                {timeGreeting(user)}
            </Text>
            <DateDisplay />
        </View>

        <View style={styles.clockContainer}>
            <AnalogClock
                sleepStart={timeStringToHour(sleep.start)}
                sleepEnd={timeStringToHour(sleep.end)}
            />

            {sleep && (
            <View style = {{marginTop: 20, alignItems: 'center'}}>
                <Text style = {{color: 'white', fontSize: 18}}>
                    Last Sleep: {sleep.duration} hours
                </Text>
                <Text style = {{color: 'white', fontSize: 18}}>
                    {sleep.start} - {sleep.end}
                </Text>
            </View>
        )}
        </View>

        <View style={styles.navBar}>
            <TouchableOpacity style={styles.navIcon}>
                <Image source={require('../assets/icons/home.png')} style={styles.icon}/>
            </TouchableOpacity>

            <TouchableOpacity onPress = {() => navigation.navigate('Journal')} style={styles.navIcon}>
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
    </ImageBackground>
);

}

const styles = StyleSheet.create({

    dateText: {
        fontFamily: 'Arial',
        fontSize: 20,
        right: -5,
        marginTop: 10,
        color: 'white'
    },

    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent'
        
    },

    title: {
        fontSize: 24,
        marginTop: 100,
        left: 1,
        color: 'white'
    },

    clockContainer: {
        flex: 1,
        justifyContent: 'center',
        marginTop: -100,
        alignItems: 'center',
        marginVertical: 10
    },
    navBar: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopWidth: 0,
        borderTopColor: 'black',
        gap: 35,
        shadowRadius: 4,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderRadius: 40,
    },

    navIcon: {
        alignItems: 'center'
    },

    icon: {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },

    background: {
        flex: 1,
        resizeMode: 'cover'
    }
});

export default HomeScreen;