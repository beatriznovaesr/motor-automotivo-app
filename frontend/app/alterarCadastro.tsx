import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { PageTitle } from "../src/components/pageTitle";
import { Input } from '../src/components/input';
import  InputDeData  from "../src/components/dataEntry";
import { Button } from '../src/components/button';
import { NotificationSwitch } from "../src/components/notificationSwitch";

export default function AlterarCadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [dataNascimento, setDataNascimento] = useState(new Date());

    useEffect(() => {
        async function carregarUsuario() {
            try {//VERIFICAR URL DO FETCH
                const resposta = await fetch('');

                if (!resposta.ok) {
                    throw new Error("Erro ao buscar dados do usuário");
                }
                const dados = await resposta.json();

                setNome(dados.nome);
                setEmail(dados.email);
                setDataNascimento(new Date(dados.dataNascimento));

            } catch (error) {
                console.error('Erro ao carregar dados do usuário:', error)
            }
        }
        carregarUsuario();
    }, []);

    const handleAlterarCadastro = async () => {
        //VERIFICAR URL DO FETCH
        await fetch('', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                dataNascimento: dataNascimento,
            }),
        });
    };

    const handleAlterarSenha = async () => {}
    const handleLogoff = async () => {}
    
    return (
        <View
            style={{
            flex: 1,
            backgroundColor: '#155fbf',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            gap: 6
        }}>
            <PageTitle text='Meu perfil'></PageTitle>
            <Input title='Nome de usuário' value={nome} onChangeText={setNome}></Input>
            <Input title='E-mail' value={email} onChangeText={setEmail}></Input>
            <InputDeData value={dataNascimento} onChange={setDataNascimento}></InputDeData>
            <View style= {{alignSelf: 'flex-start', marginLeft: '12%', marginVertical: 16}}>
                <NotificationSwitch></NotificationSwitch>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
                <Button text='Alterar senha' onPress={handleAlterarSenha} variant="textButton"></Button>
                <Button text='Sair da conta' onPress={handleLogoff} variant="logoffButton"></Button>
            </View>
            <Button text='Salvar alterações' onPress={handleAlterarCadastro}></Button>
        </View>
    )

}