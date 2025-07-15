import React from "react";
import { View, Modal, Text, TouchableOpacity, Image, StyleSheet} from "react-native";
import { useTheme } from '../hooks/useTheme';

export default function MoodSelection({visible, select, close}) {
    const mood = [
        {name: 'happy', image: require('../assets/icons/happy.png')},
        {name: 'neutral', image: require('../assets/icons/neutral.png')},
        {name: 'sad', image: require('../assets/icons/sad.png')},
        {name: 'tired', image: require('../assets/icons/tired.png')},
        {name: 'angry', image: require('../assets/icons/angry.png')}
    ];
    const { colors: color, glass } = useTheme();

    return (
        <Modal
            animationType = "fade"
            transparent
            visible = {visible}
            onRequestClose = {close}
        >
            <View style = {styles.overlay}>
                <View style = {[styles.box, {
                    backgroundColor: glass.background,
                    borderColor: glass.border,
                    borderWidth: 1,
                    shadowColor: glass.shadow,
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.4,
                    shadowRadius: 16,
                    elevation: 16,
                }]}
                >
                    <Text style = {[styles.title, { colors: color.text }]}>
                        How are you feeling?
                    </Text>
                    <View style = {styles.row}>
                        {mood.map((moods, idx) => (
                            <TouchableOpacity
                                key = {idx}
                                style = {styles.moodItem}
                                onPress = {() => select(moods.name)}
                            >
                                <Image 
                                    source = {moods.image} 
                                    style = {[
                                        styles.moodImage, 
                                        { 
                                            tintColor: moods.name === 'happy' 
                                                ? color.green 
                                                : moods.name === 'neutral' 
                                                    ? color.yellow 
                                                    : moods.name === 'sad' 
                                                        ? color.blue 
                                                        : moods.name === 'tired'
                                                            ? color.orange
                                                            : color.red 
                                        }
                                    ]}
                                />
                                <Text style = {[styles.label, { color: color.text }]}>
                                    {moods.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
        </Modal>

    )
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        borderRadius: 24,
        padding: 28,
        width: '85%',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        marginBottom: 18,
        fontWeight: '700',
        letterSpacing: 0.5,
        color: 'white'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: 10
    },
    moodItem: {
        alignItems: 'center',
        margin: 12,
        width: 80
    },
    moodImage: {
        width: 54,
        height: 54,
        resizeMode: 'contain',
        marginBottom: 6,
    },
    label: {
        marginTop: 2,
        fontSize: 15,
        fontWeight: '500',
        textTransform: 'capitalize',
        color: 'white'
    }
});