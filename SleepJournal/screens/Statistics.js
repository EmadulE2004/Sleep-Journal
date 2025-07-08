import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UserContext } from '../UserContext';








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
  }
});