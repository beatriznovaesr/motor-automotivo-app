import React, {useState} from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ReturnButton } from "../src/components/returnButton";
import { NavigationMenu } from "../src/components/navigationMenu/navigationMenu";
import { PageTitle } from "../src/components/pageTitle";

export default function MotorDetalhado() {
  const params = useLocalSearchParams(); 
  const motor = JSON.parse(Array.isArray(params.motor) ? params.motor[0] : params.motor);
  const [modalAdicionarComentVisible, setModalAdicionarComentVisible] = useState(false);
  const [novoComentario, setNovoComentario] = useState("");
  const [comentarioRespondendo, setComentarioRespondendo] = useState(null);
  const [respostaTexto, setRespostaTexto] = useState('');
  const [comentarioEditando, setComentarioEditando] = useState(null);
  const [comentarioNovoTexto, setComentarioNovoTexto] = useState('');
  
  const [comentarios, setComentarios] = useState([
  { id: 1, usuario: 'usuário1', texto: 'Motor confiável e fácil de mexer', podeEditar: true },
  { id: 2, usuario: 'usuário2', texto: 'Alguém sabe dizer quanto custa para fazer o cabeçote?', resposta: false },
  { id: 3, usuario: 'usuário3', texto: '@usuário2 Depende do estrago', resposta: true }
]);

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#155fbf',
      width: '100%',
      paddingBottom: 0
    }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Topo */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 }}>
          <ReturnButton />
          <PageTitle text='Motor exemplo' />
          <MaterialCommunityIcons name="bell-ring" size={40} color="white" />
        </View>

        <Image
          source={{uri: motor.desenho}}
          style={{ width: '90%', height: 350, alignSelf: 'center', resizeMode: 'contain', borderRadius: 8 }}
        />

        {/* Informações do motor */}
        <View style={{ paddingHorizontal: 16, marginTop: 16, gap: 6 }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
            Montadora: <Text style={{ fontWeight: 'normal' }}>{motor.montadora || 'Exemplo'}</Text>
          </Text>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
            Carros: <Text style={{ fontWeight: 'normal' }}>{motor.carro}</Text>
          </Text>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
            Descrição: <Text style={{ fontWeight: 'normal' }}>{motor.informacoes}</Text>
          </Text>

          <TouchableOpacity>
            <Text style={{ color: 'salmon', fontSize: 16, marginTop: 8, textDecorationLine: 'underline' }}>Adicionar aos favoritos</Text>
          </TouchableOpacity>
        </View>

        {/* Comentários */}
        <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Comentários:</Text>

          {comentarios.map(com => (
            <View key={com.id} style={{ borderBottomWidth: 1, borderColor: '#ccc', paddingVertical: 8 }}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>{com.usuario}</Text>
              <Text style={{ color: '#fff' }}>{com.texto}</Text>

              {com.podeEditar && (
                <View style={{ flexDirection: 'row', gap: 10, marginTop: 4 }}>
                  <Ionicons name="trash-outline" size={20} color="#ccc" />
                  <TouchableOpacity
                    onPress={() => {
                      setComentarioEditando(com);
                      setComentarioNovoTexto(com.texto);
                    }}
                  >
                    <Ionicons name="pencil-outline" size={20} color="#ccc" />
                  </TouchableOpacity>
                </View>
              )}

              {com.resposta && (
                <TouchableOpacity
                onPress={() => {
                  setComentarioRespondendo(com);
                  setRespostaTexto('');
                }}
>
  <Ionicons name="arrow-undo-outline" size={20} color="#fff" />
</TouchableOpacity>

              )}
            </View>
          ))}
        </View>

        <TouchableOpacity style={{
          backgroundColor: '#64a9ff',
          marginTop: 24,
          marginHorizontal: 40,
          borderRadius: 10,
          padding: 12,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 4,
          marginBottom:60
        }}
          onPress={() => setModalAdicionarComentVisible(true)}>
          <Text style={{ color: '#111', fontWeight: 'bold', fontSize: 16 }}>Adicionar comentário</Text>
        </TouchableOpacity>

      </ScrollView>

      <NavigationMenu />

  <Modal
  visible={modalAdicionarComentVisible}
  transparent={true}
  animationType="fade"
  >
    <View style={{
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <View style={{
        backgroundColor: 'white',
        width: '85%',
        padding: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5
      }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#155fbf', marginBottom: 10 }}>
          Adicionar  comentário:
        </Text>

        <TextInput
          value={novoComentario}
          onChangeText={setNovoComentario}
          placeholder="Digite seu comentário"
          multiline
          style={{
            fontSize: 16,
            padding: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            marginBottom: 20
          }}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={() => setModalAdicionarComentVisible(false)}
            style={{
              backgroundColor: '#f5f5f5',
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 8,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              elevation: 3
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // Aqui você pode salvar o comentário no backend ou adicionar à lista
              console.log("Comentário salvo:", novoComentario);
              setModalAdicionarComentVisible(false);
              setNovoComentario("");
            }}
            style={{
              backgroundColor: '#64a9ff',
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 8,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              elevation: 3
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
</Modal>

<Modal
  visible={comentarioEditando !== null}
  transparent={true}
  animationType="fade"
>
  <View style={{
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <View style={{
      backgroundColor: 'white',
      width: '85%',
      padding: 20,
      borderRadius: 12
    }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#155fbf', marginBottom: 10 }}>
        Editar comentário:
      </Text>

      <TextInput
        value={comentarioNovoTexto}
        onChangeText={setComentarioNovoTexto}
        multiline
        style={{
          fontSize: 16,
          padding: 10,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          marginBottom: 20
        }}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() => setComentarioEditando(null)}
          style={{
            backgroundColor: '#f5f5f5',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            const atualizados = comentarios.map(c =>
              c.id === comentarioEditando.id ? { ...c, texto: comentarioNovoTexto } : c
            );
            setComentarios(atualizados);
            setComentarioEditando(null);
            setComentarioNovoTexto('');
          }}
          style={{
            backgroundColor: '#64a9ff',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

<Modal
  visible={comentarioRespondendo !== null}
  transparent={true}
  animationType="fade"
>
  <View style={{
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <View style={{
      backgroundColor: 'white',
      width: '85%',
      padding: 20,
      borderRadius: 12
    }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#155fbf', marginBottom: 10 }}>
        Responder {comentarioRespondendo?.usuario}:
      </Text>

      <TextInput
        value={respostaTexto}
        onChangeText={setRespostaTexto}
        placeholder="Digite sua resposta"
        multiline
        style={{
          fontSize: 16,
          padding: 10,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          marginBottom: 20
        }}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() => setComentarioRespondendo(null)}
          style={{
            backgroundColor: '#f5f5f5',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            const novaResposta = {
              id: comentarios.length + 1,
              usuario: 'usuárioAtual', // você pode trocar pelo nome logado
              texto: `@${comentarioRespondendo.usuario} ${respostaTexto}`,
              resposta: true
            };
            setComentarios([...comentarios, novaResposta]);
            setComentarioRespondendo(null);
            setRespostaTexto('');
          }}
          style={{
            backgroundColor: '#64a9ff',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>


    </View>
  );
}

