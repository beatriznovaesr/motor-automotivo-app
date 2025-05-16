import React, {useState} from "react";
import { View, Alert } from "react-native"
import { Input } from "../src/components/input";
import  InputDeData  from "../src/components/dataEntry";
import { PageTitle } from "../src/components/pageTitle";
import { Button } from "../src/components/button";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router'

export default function Cadastro(){

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState(new Date());
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleCadastro = async () => {
    try {
      const resposta = await fetch("http://192.168.0.115:5000/api/users/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome,
          email,
          dataNascimento,
          senha,
          confirmarSenha
        })
      });

      const json = await resposta.json();
      if (resposta.ok) {
        Alert.alert("Sucesso", json.mensagem);
      } else {
        Alert.alert("Erro", json.erro || "Erro ao cadastrar");
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
      <Link href='/' style={{ flexDirection: 'row', alignItems: 'center', marginTop:-100, marginRight:290 }}>
          <Ionicons name="chevron-back-circle-outline" size={30} color="white" />
      </Link>

       <View
        style={{
        backgroundColor: '#155fbf',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop:50
      }}
        >
      <PageTitle text='Cadastro'></PageTitle>
      <Input title="Nome de usuário" value={nome} onChangeText={setNome}></Input>
      <Input title="E-mail" value={email} onChangeText={setEmail}></Input>
      <InputDeData value={dataNascimento} onChange={setDataNascimento}></InputDeData>
      <Input title="Senha" value={senha} onChangeText={setSenha} secureTextEntry={true} showVisibilityToggle></Input>
      <Input title="Confirme sua senha" value={confirmarSenha} onChangeText={setConfirmarSenha} secureTextEntry={true} showVisibilityToggle></Input>
      <Button text='Cadastrar' onPress={handleCadastro}></Button>
      </View>
    </View>
  
  )
}

