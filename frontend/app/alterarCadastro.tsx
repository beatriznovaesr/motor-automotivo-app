import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "../src/contexts/userContext";

import { PageTitle } from "../src/components/pageTitle";
import { Input } from '../src/components/input';
import  InputDeData  from "../src/components/dataEntry";
import { Button } from '../src/components/button';
import { NotificationSwitch } from "../src/components/notificationSwitch";
import { ReturnButton } from "../src/components/returnButton";
import { NavigationMenu } from "../src/components/navigationMenu/navigationMenu";
import ConnectionErrorModal from "../src/components/connectionError/ConnectionErrorModal";
import { NotificationBell } from "../src/components/notificationComponent/notificationBell";

export default function AlterarCadastro() {
    const router = useRouter();
    const { user, setUser } = useUser();
    const userEmail = user?.email;

    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [dataNascimento, setDataNascimento] = useState(new Date());
    const [notificacoesAtivadas, setNotificacoesAtivadas] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        async function carregarUsuario() {
            try {
                const resposta = await fetch(`http://localhost/api/users/usuarios/${userEmail}`);

                if (!resposta.ok) {
                    throw new Error("Falha ao buscar dados do usuário");
                }
                const dados = await resposta.json();

                setNome(dados.nome);
                setEmail(dados.email);
                setDataNascimento(new Date(dados.dataNascimento));
                setNotificacoesAtivadas(dados.notificacoesAtivadas);
                setId(dados.id);

            } catch (error) {
                console.error('Falha ao carregar dados do usuário:', error)
                setModalVisible(true);
            }
        }; 

        carregarUsuario();
    }, [userEmail]);

    const handleAlterarCadastro = async () => {
        try {
            const resposta = await fetch(`http://localhost:5000/api/users/usuarios/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: nome,
                    email: email,
                    dataNascimento: dataNascimento,
                    notificacoesAtivadas: notificacoesAtivadas
                }),
            });

            const mensagem = await resposta.json();

            if (!resposta.ok) {
                const mensagemErro = mensagem.erro || "Erro ao atualizar cadastro";
                throw new Error(mensagemErro);
            }

            const mensagemSucesso = mensagem.sucesso || "Cadastro atualizado com sucesso!";
            console.log('Cadastro atualizado com sucesso');
            Alert.alert(mensagemSucesso);

        } catch (error) {
            console.error(error);
            setModalVisible(true)
            //Alert.alert("Erro ao atualizar cadastro");
        }
    };

    const handleAlterarSenha = () => {
        router.push('/alterarSenha');
    }

    const handleLogoff = async () => {
        setUser(null);
        router.replace('/');
    }

    const closeModal = () => {
        setModalVisible(false);
    };
    
    return (
        <View
            style={{
            flex: 1,
            backgroundColor: '#155fbf',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            gap: 6,
            paddingBottom: 80,
            paddingTop: 100
        }}>
            <View style={{
                flexDirection: 'row', 
                justifyContent: 'flex-start', 
                gap: 60, 
                width: '100%', 
                paddingHorizontal: 30, 
                marginBottom: 30, 
                position: 'absolute', 
                top: 140, 
                left: 0, 
                right: 0}}>
                <ReturnButton></ReturnButton>
                <PageTitle text='Meu perfil'></PageTitle>
                <View style={{
                    marginTop: 10,
                    marginLeft: 10
                }}>
                    <NotificationBell/>
                </View>
            </View>
            <Input title='Nome de usuário' value={nome} onChangeText={setNome}></Input>
            <Input title='E-mail' value={email} onChangeText={setEmail}></Input>
            <InputDeData value={dataNascimento} onChange={setDataNascimento}></InputDeData>
            <View style= {{alignSelf: 'flex-start', marginLeft: '12%', marginVertical: 16}}>
                <NotificationSwitch ativada={notificacoesAtivadas} setAtivada={setNotificacoesAtivadas}></NotificationSwitch>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
                <Button text='Alterar senha' onPress={handleAlterarSenha} variant="textButton"></Button>
                <Button text='Sair da conta' onPress={handleLogoff} variant="logoffButton"></Button>
            </View>
            <Button text='Salvar alterações' onPress={handleAlterarCadastro}></Button>
            <ConnectionErrorModal visible={isModalVisible} onClose={closeModal}/>
            <NavigationMenu/>
        </View>
    );
}