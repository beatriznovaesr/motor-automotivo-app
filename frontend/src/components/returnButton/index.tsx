import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export const ReturnButton = () => {
    const router = useRouter();

    const handleVoltar = () => {
        router.back();
    };

    return (
        <Pressable style={style.button} onPress={handleVoltar}>
            <View style={style.contents}>
                <Ionicons name='arrow-back' size={40} color='#FFFFFF'/>
            </View>
        </Pressable>
    );
};

const style = StyleSheet.create({
    button: {
        padding: 5,
        marginBottom: 5
    },

    contents: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})