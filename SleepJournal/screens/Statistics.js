import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { UserContext } from '../UserContext';
import SleepScore from './SleepScore';

function timeStringToHour(timeStr) {
    if (!timeStr || typeof timeStr !== 'string') return 0;
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    return hours + minutes / 60;
}

export default function Statistics() {
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

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 20, backgroundColor: 'white' }}>
      <ScrollView>
      <Text style={{ fontSize: 30, marginRight: 130, fontWeight: 'bold', top: 10 }}>Sleep Analytics</Text>
      
        {sleep && (
          <View style={{marginTop: 20, alignItems: 'center'}}>
            <Text style={{color: 'black', fontSize: 18}}>
              Sleep Total: {sleep.duration} hours
            </Text>
            <Text style={{color: 'black', fontSize: 18}}>
              From: {sleep.start} - {sleep.end}
            </Text>
          </View>
        )}

        <SleepScore score={0}/>
        <View style = {styles.placeholderBlock}/>
        <View style = {styles.placeholderBlock}/>
        <View style = {styles.placeholderBlock}/>

      </ScrollView>
        <View style={styles.navBar}>
              <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.navIcon}>
                <Image source={require('../assets/icons/home.png')} style={styles.icon}/>
              </TouchableOpacity>
      
              <TouchableOpacity style={styles.navIcon}>
                <Image source={require('../assets/icons/journal.png')} style={styles.icon}/>
              </TouchableOpacity>
      
              <TouchableOpacity onPress = {() => navigation.navigate('Statistics')} style={styles.navIcon}>
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
  clockContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 40,
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

    placeholderBlock: {
      height: 200,
      width: 390,
      backgroundColor: '#d9d9d9',
      borderRadius: 16,
      marginBottom: 20
    },

});