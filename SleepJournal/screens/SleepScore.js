import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Circle} from "react-native-svg";

export default function SleepScore({score = 90}) {
    const size = 200;
    const sw = 15;
    const r = (size - sw) / 2;
    const c = 2 * Math.PI * r;
    const p = (score / 100) * c;
}