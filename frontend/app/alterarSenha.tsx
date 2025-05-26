import React, { useState } from "react";
import { View } from "react-native";
import { Input } from '../src/components/input';
import { Button } from '../src/components/button';
import { PageTitle } from "../src/components/pageTitle";

export default function TelaAlterarSenha() {

    const handleNovaSenha = async () => {}

    return (
                <View
                    style={{
                    flex: 1,
                    backgroundColor: '#155fbf',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    gap: 5,
                }}>
                    <PageTitle text='Alterar senha'></PageTitle>
                    <Input title='Senha atual: '></Input>
                    <Input title='Nova senha: '></Input>
                    <Input title='Confirme a nova senha: '></Input>
                    <Button text='Salvar nova senha' onPress={handleNovaSenha}></Button>
                </View>
    );
}