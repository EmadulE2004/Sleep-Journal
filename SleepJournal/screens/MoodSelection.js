import React from "react";
import { View, Modal, Text, TouchableOpacity, Image } from "react-native";

export default function MoodSelection({visible, select, close}) {
    const mood = [
        {name: 'happy'},
        {name: 'neutral'},
        {name: 'sad'},
        {name: 'tired'},
        {name: 'angry'}
    ]
} 