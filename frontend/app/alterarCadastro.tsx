import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { PageTitle } from "../src/components/pageTitle";
import { Input } from '../src/components/input';
import  InputDeData  from "../src/components/dataEntry";
import { Button } from '../src/components/button';
import { NotificationSwitch } from "../src/components/notificationSwitch";
import { ReturnButton } from "../src/components/returnButton";
import { Link, useRouter } from "expo-router";

export default function AlterarCadastro() {
    const router = useRouter();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [dataNascimento, setDataNascimento] = useState(new Date());

    useEffect(() => {
        async function carregarUsuario() {
            try {
                const resposta = await fetch('http://localhost:5000/api/users/usuarios/:email');

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
        await fetch('http://localhost/api/users/usuario/:id', {
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

    const handleAlterarSenha = () => {
        router.push('alterarSenha');
    }

    const handleLogoff = () => {
        //VERIFICAR SE OS DADOS DO USUÁRIO SALVOS NO GET DE LOGIN IRÃO ATRAPALHAR NOVO LOGIN
        router.replace('/index');
    }
    
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
            <View style={{flexDirection: 'row', justifyContent: 'flex-start', gap: 60, width: '90%', paddingHorizontal: 16, marginBottom: 30}}>
                <ReturnButton></ReturnButton>
                <PageTitle text='Meu perfil'></PageTitle>
            </View>
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