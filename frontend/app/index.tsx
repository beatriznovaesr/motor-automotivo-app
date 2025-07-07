import React, {useState} from "react";
import { Input } from "../src/components/input"; 
import { PageTitle } from "../src/components/pageTitle"; 
import { Button } from "../src/components/button";
import Imagem from "../src/components/image";
import logo from "./assets/logo.png";
import ConnectionErrorModal from "../src/components/connectionError/ConnectionErrorModal";

import { View, Text, Alert } from "react-native";
import { Link, useRouter } from 'expo-router';

import { useUser } from '../src/contexts/userContext';

export default function Login(){

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isModalVisible, setModalVisible] = useState(false); 

  const { setUser } = useUser();
  const router = useRouter()

  const validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {

    // Validação de campos obrigatórios
    if (!email || !senha) {
      Alert.alert("Erro", "E-mail e senha são obrigatórios");
      return;
    }

    // Validação de formato de e-mail
    if (!validarEmail(email)) {
      Alert.alert("Erro", "Informe um e-mail válido");
      return;
    }

    try {
      const resposta = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          senha
        })
      });

      const json = await resposta.json();
      if (resposta.ok) {
        setUser({ email })
        router.push('telaInicial')
        Alert.alert("Sucesso", json.mensagem || "Login realizado com sucesso");
      } else {
        switch (resposta.status) {
          case 404:
            Alert.alert("Erro", "Usuário não cadastrado");
            break;
          case 401:
            Alert.alert("Erro", "E-mail ou senha incorretos");
            break;
          default:
            Alert.alert("Erro", json.erro || "Erro ao realizar login");
        }
      }
    } catch (error) {
      console.error(error);
      setModalVisible(true);
      //Alert.alert("Erro", "Não foi possível se conectar ao servidor.");
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return(
    <View
      style={{
        flex: 1,
        backgroundColor: '#155fbf',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <Imagem source={logo} width={150} height={150} borderRadius={60} />        
      <PageTitle text='The Blueprints'></PageTitle>
      <Input title="E-mail" value={email} onChangeText={setEmail}></Input>
      <Input title="Senha" value={senha} onChangeText={setSenha} secureTextEntry={true} showVisibilityToggle></Input>
        <Button text='Entrar' onPress={handleLogin}></Button>
      <Text style={{ color: 'white', marginTop: 100 }}>Não possui cadastro?</Text>
      <Link href="/cadastro">
        <Text style={{color: 'white', textDecorationLine: 'underline'}}>Cadastre-se aqui</Text>
      </Link>
      
      <ConnectionErrorModal
        visible={isModalVisible}
        onClose={closeModal}
      />

    </View>
  
  )
}

