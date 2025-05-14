import React, {useState} from "react";
import { View, Alert } from "react-native"
import { Input } from "../components/input"; 
import { PageTitle } from "../components/pageTitle"; 
import { Button } from "../components/button";


export default function Login(){

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {
      const resposta = await fetch("http://192.168.15.66:5000/api/users/login", {
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
        // imagem de logo
        
      <PageTitle text='The Blueprints'></PageTitle>
      <Input title="E-mail" value={email} onChangeText={setEmail}></Input>
      <Input title="Senha" value={senha} onChangeText={setSenha}></Input>
      <Button text='Entrar' onPress={handleLogin}></Button>

      // não possui cadastro 
      // Cadastre-se aqui
      
    </View>
  
  )
}

