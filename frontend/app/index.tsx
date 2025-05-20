import React, {useState} from "react";
import { Input } from "../src/components/input"; 
import { PageTitle } from "../src/components/pageTitle"; 
import { Button } from "../src/components/button";
import Imagem from "../src/components/image";
import logo from "./assets/logo.png";

import TextoLink from "../src/components/textoLink";
import { View, Text, Alert } from "react-native";
import { Link } from 'expo-router'

export default function Login(){

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {
      const resposta = await fetch("http://200.17.101.34:5000/api/users/login", {
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
        Alert.alert("Sucesso", json.mensagem || "Login realizado com sucesso");
      } else {
        Alert.alert("Erro", json.erro || "Erro ao realizar login");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível se conectar ao servidor.");
    }
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
      <Imagem source={logo} width={120} height={120} borderRadius={60} />        
      {/*<Imagem source={{ uri: 'https://exemplo.com/logo.png' }} width={120} height={120} />  IMAGEM COM URL REMOTA/EXTERNA */}
      <PageTitle text='The Blueprints'></PageTitle>
      <Input title="E-mail" value={email} onChangeText={setEmail}></Input>
      <Input title="Senha" value={senha} onChangeText={setSenha}></Input>
      <Button text='Entrar' onPress={handleLogin}></Button>

      <Text style={{ color: 'white', marginTop: 20 }}>Não possui cadastro?</Text>
      <Link href="/cadastro">
        <Text style={{color: 'white', textDecorationLine: 'underline'}}>Cadastre-se aqui</Text>
      </Link>
      

    </View>
  
  )
}

