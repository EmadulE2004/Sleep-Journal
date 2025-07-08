import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Circle} from "react-native-svg";

export default function SleepScore({score}) {
    const size = 200;
    const sw = 15;
    const r = (size - sw) / 2;
    const c = 2 * Math.PI * r;
    const p = (score / 100) * c;

    const rating = () => {
        if(score >= 90) {
            return "Excellent";
        } else if(score >= 70) {
            return "Good";
        } else if(score >= 50) {
            return "Average";
        } else {
            return "Poor";
        }
    }

    const ratingColor = () => {
        if(score >= 90) {
            return '#00C9A7';
        } else if(score >= 70) {
            return '#4CAF50';
        } else if(score >= 50) {
            return '#FFC107';
        } else {
            return '#F44336';
        }
    }

    return (
        <View style = {styles.block}>
            <View style = {styles.container}>
                <Text style = {styles.title}>Sleep Score</Text>

                <View style = {styles.wrapper}>
                    <Svg width = {size} height = {size}>
                        <Circle
                            stroke = "#e0e0e0"
                            fill = "none"
                            cx = {size / 2}
                            cy = {size / 2}
                            r = {r}
                            strokeWidth = {sw}
                        />

                        <Circle
                            stroke = {ratingColor()}
                            fill = "none"
                            cx = {size / 2}
                            cy = {size / 2}
                            r = {r}
                            strokeWidth ={sw}
                            strokeDasharray = {`${p}, ${c}`}
                            strokeLinecap = "round"
                            rotation = "-90"
                            origin = {`${size / 2}, ${size / 2}`}
                        />
                    </Svg>

                    <View style = {styles.center}>
                        <Text style = {styles.bigScore}>{score}</Text>
                    </View>
                </View>

                <Text style = {styles.feedback}>{rating()}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    alignItems: 'center',
    marginBottom: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },

  wrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },

  center: {
    position: 'absolute',
    top: '35%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  bigScore: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#333',
  },

  feedback: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  
  block: {
    height: 300,
    width: 390,
    backgroundColor: '#d9d9d9',
    borderRadius: 16,
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20,
  }
});