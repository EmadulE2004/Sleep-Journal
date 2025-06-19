import React, {useState, useEffect} from "react";
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

function handLine(angle, length) {
    const point = angleCoordinates(angle, length);

    return {
        x1: clockCenterX,
        x2: point.x,
        y1: clockCenterY,
        y2: point.y
    }
}

export default function AnalogClock({sleepStart = 22, sleepEnd = 5}) {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const t = setInterval(() => {
            setNow(new Date());
        }, 1000); 

        return () => clearInterval(t);
    }, []);

    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();

    const hAngle = (360 / 12) * (h % 12 + m / 60);
    const mAngle = (360 / 60) * m;
    const sAngle = (360 / 60) * s;

    let angleStart = (sleepStart % 12) * 30;
    let angleEnd = (sleepEnd % 12) * 30;

    if(sleepEnd <= sleepStart) {
        angleEnd += 360;
    }

    return (
        <View>
            <Svg height = {clockSize} width = {clockSize}>
                <Circle
                    cx = {clockCenterX}
                    cy = {clockCenterY}
                    r = {clockRadius}
                    stroke = 'white'
                    strokeWidth = {4}
                    fill = 'none'
                />

                <Path
                    d = {arc(angleStart, angleEnd)}
                    stroke = 'cyan'
                    strokeWidth = {8}
                    fill = 'none'
                    strokeLinecap = 'round'
                />

                <Line
                    {...handLine(hAngle, clockRadius * 0.5)}
                    stroke = 'white'
                    strokeWidth = {5}
                />

                <Line
                    {...handLine(mAngle, clockRadius * 0.7)}
                    stroke = 'white'
                    strokeWidth = {3}
                />

                <Line
                    {...handLine(sAngle, clockRadius * 0.9)}
                    stroke = 'red'
                    strokeWidth = {1}
                />

                <Circle
                    cx = {clockCenterX}
                    cy = {clockCenterY}
                    r = {4}
                    fill = 'white'
                />
            </Svg>
        </View>
    );
}