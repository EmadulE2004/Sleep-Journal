import React from "react";
import { View, Modal, Text, TouchableOpacity, Image } from "react-native";

export default function MoodSelection({visible, select, close}) {
    const mood = [
        {name: 'happy', image: require('../assets/icons/happy.png')},
        {name: 'neutral', image: require('../assets/icons/neutral.png')},
        {name: 'sad', image: require('../assets/icons/sad.png')},
        {name: 'tired', image: require('../assets/icons/tired.png')},
        {name: 'angry', image: require('../assets/icons/angry.png')}
    ]
} 