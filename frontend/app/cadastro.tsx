import React, {useState} from "react";
import { View, Alert, TouchableOpacity } from "react-native"
import { Input } from "../src/components/input";
import  InputDeData  from "../src/components/dataEntry";
import { PageTitle } from "../src/components/pageTitle";
import { Button } from "../src/components/button";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, useRouter } from 'expo-router';
import ConnectionErrorModal from "../src/components/connectionError/ConnectionErrorModal";

export default function Cadastro(){

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState(new Date());
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [isModalVisible, setModalVisible] = useState(false); 

  const handleCadastro = async () => {
    try {
      const resposta = await fetch("http://10.0.2.2:5000/api/users/cadastro", {
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
      setModalVisible(true);
      //Alert.alert("Erro", "Erro de conexão com a internet! Tente novamente mais tarde.");
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const router = useRouter();
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
      
      <TouchableOpacity onPress={() => router.push('/telaInicial')} 
      style={{ flexDirection: 'row', alignItems: 'center', marginTop:-100, marginRight:290 }}>
        <Ionicons name="chevron-back-circle-outline" size={30} color="white" />
      </TouchableOpacity>

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

      <ConnectionErrorModal
        visible={isModalVisible}
        onClose={closeModal}
      />
    </View>
  
  )
}

