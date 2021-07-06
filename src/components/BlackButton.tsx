import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle, StyleProp } from 'react-native';

interface Props {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

export const BlackButton = ({ title, onPress, style = {}} : Props) => {
    return (
        <TouchableOpacity
            onPress = { onPress }
            activeOpacity = { 0.9 }
            style = {{
                ...style as any,
                ...styles.blackButton
            }}
        >
            <Text style = { styles.buttonText }>{ title }</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    blackButton: {
        height: 50,
        width: 200,
        backgroundColor: 'black',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    }
});