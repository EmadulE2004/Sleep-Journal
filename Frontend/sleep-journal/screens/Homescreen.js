import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Homescreen(){
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Welcome to the Sleep Journal</Text>
        <TouchableOpacity style={styles.button} onPress={() => alert('Button Pressed!')}>
            <Text style={styles.buttonText}>Hello User</Text>
        </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

