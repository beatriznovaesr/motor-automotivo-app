import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useUser } from '../../contexts/userContext';

export const NavigationMenu = () => {
    const router = useRouter();
    const { user, setUser } = useUser();

    return (
        <View style={style.container}>
            <TouchableOpacity onPress={() => router.push('favoritos')} style={style.item}>
                <Ionicons name='heart' size={45} color='#983B27' style={style.icon}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('telaInicial')} style={style.item}>
                <Ionicons name='home' size={40} color='#666666' style={style.icon}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('alterarCadastro')} style={style.item}>
                <Ionicons name='person-circle' size={45} color='#666666' style={style.icon}/>
            </TouchableOpacity>
        </View>
    )
};

const style = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#FFFFFF'
    },

    item: {
        alignItems: 'center'
    },

    icon: {
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2
    }
})