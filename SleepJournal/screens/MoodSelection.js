import React from "react";
import { View, Modal, Text, TouchableOpacity, Image, StyleSheet} from "react-native";

export default function MoodSelection({visible, select, close}) {
    const mood = [
        {name: 'happy', image: require('../assets/icons/happy.png')},
        {name: 'neutral', image: require('../assets/icons/neutral.png')},
        {name: 'sad', image: require('../assets/icons/sad.png')},
        {name: 'tired', image: require('../assets/icons/tired.png')},
        {name: 'angry', image: require('../assets/icons/angry.png')}
    ];

    return (
        <Modal
            animationType = "fade"
            transparent
            visible = {visible}
            onRequestClose = {close}
        >
            <View style={styles.overlay}>
                <View style={styles.box}>
                    <Text style={styles.title}>
                        How are you feeling?
                    </Text>
                    <View style={styles.row}>
                        {mood.map((moods, idx) => (
                            <TouchableOpacity
                                key = {idx}
                                style = {styles.moodItem}
                                onPress={() => select(moods.name)}
                            >
                                <Image source={moods.image} style={styles.moodImage}/>
                                <Text style={styles.label}>
                                    {moods.name}
                                </Text>
                            </TouchableOpacity>
                        ))};
                    </View>
                </View>
            </View>
        </Modal>

    )
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5',
        justifyContent: 'center',
        alignItems: 'center'
    },

    box: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        width: '85%',
        alignItems: 'center'
    },

    title: {
        fontSize: 20,
        marginBottom: 15,
        fontWeight: '600'
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: 10
    },

    moodItem: {
        alignItems: 'center',
        margin: 10
    },

    moodImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },

    label: {
        marginTop: 5,
        fontSize: 14,
        color: '#333'
    }
});