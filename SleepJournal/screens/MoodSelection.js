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

})