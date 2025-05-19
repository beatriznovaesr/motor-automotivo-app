import React, { useState } from 'react';
import { View } from 'react-native';
import { Input } from '../components/input';
import { Button } from '../components/button';
import { LogoImage } from '../components/logoImage';

export default function TelaInicial() {
    const [palavraPesquisada, setPalavraPesquisada] = useState("")

    const handlePesquisar = async () => {}

    return (
                <View
                    style={{
                    flex: 1,
                    backgroundColor: '#155fbf',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    <LogoImage source={require('../assets/the-blueprints-logo.png')} style={{width: 150, height: 150}} resizeMode='contain'></LogoImage>
                    <Input title='Pesquise por motor, montadora ou carro: ' variant='mainScreen'></Input>
                    <Button text='Pesquisar' onPress={handlePesquisar}></Button>
                </View>
    );


 
}