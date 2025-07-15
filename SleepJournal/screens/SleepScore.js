import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Circle} from "react-native-svg";
import { useTheme } from '../hooks/useTheme';

export default function SleepScore({score, style}) {
    const { colors: color } = useTheme();
    const size = 160;
    const sw = 14;
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
            return color.tint;
        } else if(score >= 70) {
            return color.accent;
        } else if(score >= 50) {
            return '#FFC107';
        } else {
            return '#F44336';
        }
    }

    return (
        <View style={[styles.container, style]}>
            <Text style={[styles.title, { color: color.text }]}>Sleep Score</Text>
            <View style={styles.wrapper}>
                <Svg width={size} height={size}>
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
                        strokeWidth = {sw}
                        strokeDasharray = {`${p}, ${c}`}
                        strokeLinecap = "round"
                        rotation = "-90"
                        origin = {`${size / 2}, ${size / 2}`}
                    />
                </Svg>
                <View style = {styles.center}>
                    <Text style = {[styles.bigScore, { color: color.text }]}>{score}</Text>
                </View>
            </View>
            <Text style = {[styles.feedback, { color: color.icon }]}>{rating()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingVertical: 10,
    },

    title: {
        fontSize: 20,
        fontWeight: '600',
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
    },
    
    feedback: {
        marginTop: 15,
        fontSize: 16,
        fontStyle: 'italic',
    },
});