import React, { useState } from "react";
import { View, Alert } from "react-native";
import { useUser } from "../src/contexts/userContext";

import { Input } from '../src/components/input';
import { Button } from '../src/components/button';
import { PageTitle } from "../src/components/pageTitle";
import { ReturnButton } from "../src/components/returnButton";
import { NavigationMenu } from "../src/components/navigationMenu/navigationMenu";
import ConnectionErrorModal from "../src/components/connectionError/ConnectionErrorModal";

export default function TelaAlterarSenha() {
    const { user } = useUser();
    const userEmail = user?.email;

    const [senhaAtual, setSenhaAtual] = useState("");
    const [senhaNova, setSenhaNova] = useState("");
    const [senhaConfirmada, setSenhaConfirmada] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);

    const handleNovaSenha = async () => {
        try {
            const resposta = await fetch(`http://10.0.2.2:5000/api/users/usuarios/alterar-senha/${encodeURIComponent(userEmail)}`, {
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
            //Alert.alert("Erro ao atualizar senha:", error.message);
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
            <View style={{flexDirection: 'row', justifyContent: 'flex-start', gap: 38, width: '100%', paddingHorizontal: 40, marginBottom: 30, position: 'absolute', top: 180,  left: 0, right: 0}}>
                <ReturnButton></ReturnButton>
                <PageTitle text='Alterar senha'></PageTitle>
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