import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Circle} from "react-native-svg";

export default function SleepScore({score = 90}) {
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

    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>Sleep Score</Text>

            <View style = {styles.wrapper}>
                <Svg>
                    <Circle
                        stroke = "#e0e0e0"
                        fill = "none"
                        cx = {s / 2}
                        cy = {s / 2}
                        r = {r}
                        strokeWidth = {sw}
                    />

                    <Circle
                        stroke = "#00C9A7"
                        fill = "none"
                        cx = {s / 2}
                        cy = {s / 2}
                        r = {r}
                        strokeWidth ={sw}
                        strokeDasharray = {`${p}, ${c}`}
                        strokeLinecap = "round"
                        rotation = "-90"
                        origin = {`${s / 2}, ${s / 2}`}
                    />
                </Svg>

                <View style = {styles.center}>
                    <Text style = {styles.bigScore}>{score}</Text>
                </View>
            </View>

            <Text style = {styles.feedback}></Text>
        </View>
    );
}

const styles = StyleSheet.create({

})