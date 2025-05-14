import React, { useState } from "react";
import { View } from "react-native";
import { PageTitle } from "../components/pageTitle";
import { Input } from '../components/input';
import  InputDeData  from "../components/dataEntry";
import { Button } from '../components/button';
import { NotificationSwitch } from "../components/notificationSwitch";

export default function AlterarCadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [dataNascimento, setDataNascimento] = useState(new Date());

    const handleAlterarCadastro = async () => {}
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
            <Input title='Nome de usuário'></Input>
            <Input title='E-mail'></Input>
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