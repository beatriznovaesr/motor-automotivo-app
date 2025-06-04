import React, { useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { Input } from '../src/components/input';
import { Button } from '../src/components/button';
import  Imagem  from '../src/components/image';
import { NavigationMenu } from '../src/components/navigationMenu/navigationMenu';

export default function TelaInicial() {
    const router = useRouter();
    const [palavraPesquisada, setPalavraPesquisada] = useState("");
    const [loading, setLoading] = useState(false);
    const [jaPesquisou, setJaPesquisou] = useState(false);
    const [nenhumResultado, setNenhumResultado] = useState(false);

    useFocusEffect(
        useCallback(() => {
            setPalavraPesquisada('');
        }, [])
    );

    const handlePesquisar = async () => {
        if (palavraPesquisada.trim() === '') {
            setJaPesquisou(true);
            setNenhumResultado(true);
            return;
        }
        setLoading(true);
        setJaPesquisou(true);
        setNenhumResultado(false);
        
        try {
            const resposta = await fetch("http://localhost:5000/api/motors/procurar-motor", {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( { palavraPesquisada } )
            });
            const json = await resposta.json();

            if (resposta.ok) {

                if (json.length > 0) {
                    router.push('resultadoPesquisa')
                } else {
                    setNenhumResultado(true);
                    setPalavraPesquisada('');
                }

            } else {
                Alert.alert("Erro", json.erro || "Erro ao procurar motor");
            }

        }  catch (error) {
            console.error(error);
            Alert.alert("Erro", "Não foi possível se conectar ao servidor");
        }
    };

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
                    {jaPesquisou && nenhumResultado && (
                        <Text style={{ 
                            color: 'white', 
                            marginTop: - 45, 
                            marginBottom: 20, 
                            fontSize: 20, 
                            fontFamily: 'RobotoSerif_400Regular',
                            textShadowColor: '#000000',
                            textShadowOffset: {width: 2, height: 2},
                        }}>
                            Nenhum resultado encontrado!
                        </Text>
                    )}
                    <Imagem source={require('./assets/logo.png')} width={150} height={150} borderRadius={60}></Imagem>
                    <Input title='Pesquise por motor, montadora ou carro: ' variant='mainScreen' value={palavraPesquisada} onChangeText={setPalavraPesquisada}></Input>
                    <Button text='Pesquisar' onPress={handlePesquisar}></Button>

                    <NavigationMenu/>
                </View>
    );


 
}