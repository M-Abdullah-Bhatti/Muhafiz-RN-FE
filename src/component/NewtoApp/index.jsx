import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

import color from '../../styles/color';

const NewtoApp = ({ text, onPress, screen }) => {
    return (
        <View style={styles.register}>
            <Text>
                {text}
            </Text>
            <TouchableOpacity
                onPress={onPress}
            >
                <Text style={styles.text}> {screen}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    register: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 12
    },
    text: {
        color: color.orange,
        fontWeight: '700',
    }
});

export default NewtoApp;