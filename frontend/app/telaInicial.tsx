import React, { useState } from 'react';
import { View } from 'react-native';
import { Input } from '../src/components/input';
import { Button } from '../src/components/button';
import  Imagem  from '../src/components/image';

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
                    <Imagem source={require('../assets/logo.png')}></Imagem>
                    <Input title='Pesquise por motor, montadora ou carro: ' variant='mainScreen'></Input>
                    <Button text='Pesquisar' onPress={handlePesquisar}></Button>
                </View>
    );


 
}