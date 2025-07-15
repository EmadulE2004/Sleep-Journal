// src/screens/HomeScreen.js (or just screens/HomeScreen.js)
import React, {useContext, useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image,} from 'react-native';
import { UserContext } from '../UserContext'
import AnalogClock from './SleepClock';
import { initHealthKit, getSleepSamples } from './utils/AppleHealth';
import ScreenBackground from '../components/ScreenBackground';
import NavBar from '../components/NavBar';
import Card from '../components/Card';
import { useTheme } from '../hooks/useTheme';
import { ScrollView } from 'react-native-gesture-handler';
import ScreenBackgroundNoMoon from '../components/ScreenBackgroundNoMoon';

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
    const { colors: color, textStyles } = useTheme();
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
            isActive: true
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
            onPress: () => navigation.navigate('Profile'),
            isActive: false
        }
    ];

  return (
   <ScreenBackgroundNoMoon>
        <ScrollView>
            <View style = {styles.header}>
                <Text style = {[styles.title, { color: color.text }]}>
                        {timeGreeting(user)}
                    </Text>
                    <DateDisplay />
            </View>

            <View style={styles.clockSection}>
                <Card variant = "accent" style = {styles.clockCard}>
                    <AnalogClock
                        sleepStart = {timeStringToHour(sleep.start)}
                        sleepEnd = {timeStringToHour(sleep.end)}
                    />
                </Card>
            </View>

            {sleep && sleep.duration !== null && (
                <View style = {styles.sleepDataSection}>
                    <Card variant = "secondary" style = {styles.sleepDataCard}>
                        <Text style={[styles.sleepTitle, { color: color.text }]}>
                            Last Night's Sleep
                        </Text>

                        <View style = {styles.sleepStats}>
                            <View style = {styles.sleepStat}>
                                <Text style={[styles.sleepValue, { color: color.tint }]}>
                                    {sleep.duration}
                                </Text>
                                <Text style={[styles.sleepLabel, { color: color.icon }]}>
                                    Hours
                                </Text>
                            </View>
                            <View style = {styles.sleepDivider}/>
                            <View style = {styles.sleepStat}>
                                <Text style={[styles.sleepValue, { color: color.tint }]}>
                                    {sleep.start}
                                </Text>
                                <Text style={[styles.sleepLabel, { color: color.icon }]}>
                                    Bedtime
                                </Text>
                            </View>
                            <View style = {styles.sleepDivider}/>
                            <View style = {styles.sleepStat}>
                                <Text style={[styles.sleepValue, { color: color.tint }]}>
                                    {sleep.end}
                                 </Text>
                                 <Text style={[styles.sleepLabel, { color: color.icon }]}>
                                    Wake Time
                                </Text>
                            </View>
                        </View>
                    </Card>
                </View>
            )}

            <View style = {styles.quickActions}>
                <Card variant = "primary" style = {styles.quickActionsCard}>
                    <Text style={[styles.sectionTitle, { color: color.text }]}>
                        Quick Actions
                    </Text>
                    <View style = {styles.actionButtons}>
                        <TouchableOpacity
                            style = {styles.actionButton}
                            onPress={() => navigation.navigate('NewEntry')}
                        >
                            <Image 
                                source = {require('../assets/icons/journalAddButton.png')} 
                                style = {styles.actionIcon}
                            />
                            <Text style = {[styles.actionText, { color: color.text }]}>
                                New Entry
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style = {styles.actionButton}
                            onPress = {() => navigation.navigate('ChatBot')}
                        >
                            <Image 
                                source={require('../assets/icons/journal.png')} 
                                style={styles.actionIcon}
                            />
                            <Text style = {[styles.actionText, { color: color.text }]}>
                                Sleep Chat
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Card>
            </View>
             <View style={styles.bottomSpacing}/>
        </ScrollView>
        <NavBar items = {navIcons}/>
   </ScreenBackgroundNoMoon>
);

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    
    header: {
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    
    title: {
        fontSize: 32,
        fontWeight: '700',
        letterSpacing: 0.5,
        marginBottom: 8,
    },
    
    dateText: {
        fontSize: 18,
        fontWeight: '400',
        opacity: 0.8,
    },
    
    clockSection: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    
    clockCard: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    
    sleepDataSection: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    
    sleepDataCard: {
        paddingVertical: 25,
    },
    
    sleepTitle: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 20,
    },
    
    sleepStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    
    sleepStat: {
        alignItems: 'center',
        flex: 1,
    },
    
    sleepValue: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 4,
    },
    
    sleepLabel: {
        fontSize: 14,
        fontWeight: '400',
        opacity: 0.7,
    },
    
    sleepDivider: {
        width: 1,
        height: 40,
        backgroundColor: 'rgba(123, 158, 137, 0.3)',
    },
    
    quickActions: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    
    quickActionsCard: {
        paddingVertical: 25,
    },
    
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 20,
    },
    
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    
    actionButton: {
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        backgroundColor: 'rgba(74, 144, 226, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(74, 144, 226, 0.2)',
    },
    
    actionIcon: {
        width: 32,
        height: 32,
        marginBottom: 8,
        tintColor: '#4A90E2',
    },
    
    actionText: {
        fontSize: 14,
        fontWeight: '500',
    },
    
    bottomSpacing: {
        height: 120,
    },
});

export default HomeScreen;