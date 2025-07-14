import React, { useState } from "react";
import { View, Alert } from "react-native";
import { useUser } from "../src/contexts/userContext";

import { Input } from '../src/components/input';
import { Button } from '../src/components/button';
import { PageTitle } from "../src/components/pageTitle";
import { ReturnButton } from "../src/components/returnButton";
import { NavigationMenu } from "../src/components/navigationMenu/navigationMenu";
import ConnectionErrorModal from "../src/components/connectionError/ConnectionErrorModal"
import { NotificationBell } from "../src/components/notificationComponent/notificationBell";

export default function TelaAlterarSenha() {
    const { user } = useUser();
    const userEmail = user?.email;

    const [senhaAtual, setSenhaAtual] = useState("");
    const [senhaNova, setSenhaNova] = useState("");
    const [senhaConfirmada, setSenhaConfirmada] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);

    const validarSenha = (senha: string) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Mínimo 8 caracteres, pelo menos 1 letra e 1 número
        return regex.test(senha);
    };

    const handleNovaSenha = async () => {

        if (senhaNova === senhaAtual) {
            Alert.alert("Erro", "A senha nova não pode ser igual a atual")
            return
        }

        if (!validarSenha(senhaNova)) {
            Alert.alert("Erro", "A senha deve possuir pelo menos 8 caracteres letras e números")
                        alert("Senha antiga igual atual")
            return
        }

        try {
            const resposta = await fetch(`http://192.168.0.117:5000/api/users/usuarios/alterar-senha/${encodeURIComponent(userEmail)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    senhaAtual, 
                    senhaNova,
                    senhaConfirmada 
                }),
            });

            if (!resposta.ok) {
                const erro = await resposta.json();
                throw new Error(erro.erro || "Erro ao atualizar senha");
            }
            const sucesso = await resposta.json();
            console.log("Senha alterada com sucesso")
            Alert.alert("Senha atualizada com sucesso!", sucesso.mensagem);

        } catch (error) {
            console.error(error);
            setModalVisible(true);
            Alert.alert("Erro ao atualizar senha:", error.message);
        }
    };

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
                gap: 10,
                paddingBottom: 80,
                paddingTop: 100
            }}>
            <View style={{
                flexDirection: 'row', 
                justifyContent: 'flex-start', 
                gap: 30, 
                width: '100%', 
                paddingHorizontal: 35, 
                marginBottom: 30, 
                position: 'absolute', 
                top: 140,  
                left: 0, 
                right: 0}}>
                <ReturnButton></ReturnButton>
                <PageTitle text='Alterar senha'></PageTitle>
                <View style={{
                    marginTop: 10,
                    marginLeft: 20
                }}>
                    <NotificationBell/>
                </View>
            </View>
            <Input 
                title='Senha atual: ' 
                value={senhaAtual} 
                onChangeText={setSenhaAtual}  
                showVisibilityToggle>   
            </Input>
            <Input 
                title='Nova senha: ' 
                value={senhaNova} 
                onChangeText={setSenhaNova}                      
                showVisibilityToggle>
            </Input>
            <Input 
                title='Confirme a nova senha: ' 
                value={senhaConfirmada} 
                onChangeText={setSenhaConfirmada}                     
                showVisibilityToggle>
            </Input>
            <Button text='Salvar nova senha' onPress={handleNovaSenha}></Button>
            <ConnectionErrorModal visible={isModalVisible} onClose={closeModal}/>
            <NavigationMenu/>                
        </View>
    );
}