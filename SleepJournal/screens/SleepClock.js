import React from "react";
import { View } from "react-native";
import Svg, {Line, Circle, Path} from "react-native-svg";

const clockSize = 250;
const clockCenterX = clockSize / 2;
const clockCenterY = clockSize / 2;
const clockRadius = clockCenterX - 15;

function angleCoordinates(degree, length) {
    const r = (degree - 90) * (Math.PI / 180);
    const x = clockCenterX + length * Math.cos(r);
    const y = clockCenterY + length * Math.sin(r);

    return {
        x, y
    };
}

function arc(start, end) {
    const s = angleCoordinates(end, clockRadius);
    const e = angleCoordinates(start, clockRadius);

    let arcPath = 0;
    const diff = end - start;

    if(diff > 180) {
        arcPath = 1;
    }

    return `M ${s.x} ${s.y} A ${clockRadius} ${clockRadius} 0 ${arcPath} 0 ${e.x} ${e.y}`;
}