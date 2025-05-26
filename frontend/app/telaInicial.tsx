import React, { useState } from 'react';
import { View } from 'react-native';
import { Input } from '../src/components/input';
import { Button } from '../src/components/button';
import  Imagem  from '../src/components/image';

import { useRouter } from 'expo-router';
import AlterarCadastro from './alterarCadastro';

export default function TelaInicial() {
    const router = useRouter()
    const [palavraPesquisada, setPalavraPesquisada] = useState("")

    const handlePesquisar = async () => {
        //MODIFICAR POSTERIORMENTE
        router.push('alterarCadastro')
    }


    return (
                <View
                    style={{
                    flex: 1,
                    backgroundColor: '#155fbf',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%', 
                    paddingBottom: 80
                }}>
                    <Imagem source={require('./assets/logo.png')} width={150} height={150} borderRadius={60}></Imagem>
                    <Input title='Pesquise por motor, montadora ou carro: ' variant='mainScreen'></Input>
                    <Button text='Pesquisar' onPress={handlePesquisar}></Button>
                </View>
    );


 
}