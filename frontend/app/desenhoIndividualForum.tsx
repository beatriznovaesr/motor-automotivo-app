import React, {useState, useEffect} from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ReturnButton } from "../src/components/returnButton";
import { NavigationMenu } from "../src/components/navigationMenu/navigationMenu";
import { PageTitle } from "../src/components/pageTitle";
import { useUser } from "../src/contexts/userContext";
import { NotificationBell } from "../src/components/notificationComponent/notificationBell";
//componente de adicionar comentário
import AddComment from "../src/components/addComment/addComment";
import { style } from "../src/components/button/styles";

export default function MotorDetalhado() {
  const { user, setUser } = useUser();
  const userEmail = user?.email;
  const params = useLocalSearchParams(); 
  const motor = JSON.parse(Array.isArray(params.motor) ? params.motor[0] : params.motor);
  const [modalAdicionarComentVisible, setModalAdicionarComentVisible] = useState(false);
  const [novoComentario, setNovoComentario] = useState("");
  const [comentarioRespondendo, setComentarioRespondendo] = useState(null);
  const [respostaTexto, setRespostaTexto] = useState('');
  const [comentarioEditando, setComentarioEditando] = useState(null);
  const [comentarioNovoTexto, setComentarioNovoTexto] = useState('');
  const [comentarios, setComentarios] = useState([]);

  const [idUsuario, setIdUsuario] = useState("");
  const [nomeUsuario, setNome] = useState("");

  //add comentário
  const[addCommentModal, setAddCommentModal] = useState(false);

  const cancelarComentario = () => {
    setAddCommentModal(false);
  };

  useEffect(() => {
          async function buscaUsuario() {
              try {
                  const resposta = await fetch(`http://192.168.0.117:5000/api/users/usuarios/${userEmail}`);
  
                  if (!resposta.ok) {
                      throw new Error("Falha ao buscar dados do usuário");
                  }
                  const dados = await resposta.json();
                  setNome(dados.nomeUsuario);
                  setIdUsuario(dados.id);
  
              } catch (error) {
                  console.error('Falha ao carregar dados do usuário:', error)
              }
          }; 
          buscaUsuario();
      }, [userEmail]); 

  useEffect(() => {
  const buscarComentarios = async () => {
    try {
      const response = await fetch(`http://192.168.0.117:5000/api/comments/${motor._id}?userId=${user._id}`);
      const data = await response.json();
      setComentarios(data);
    } catch (err) {
      console.error("Erro ao buscar comentários:", err);
    }
  };
  buscarComentarios();
}, [user]); 

    const adicionarComentario = async (novoTexto: string) => {
      //console.log(novoComentario)
      try {
        await fetch(`http://192.168.0.117:5000/api/comments/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: user.nome,
          userId: idUsuario,
          motorId: motor._id,
          text: novoTexto,
        })
      });
        const resposta = await fetch(`http://192.168.0.117:5000/api/comments/${motor._id}?userId=${user._id}`);

        const atualizados = await resposta.json();
        setComentarios(atualizados);

      } catch (err) {
          console.error("Erro ao salvar comentário:", err);
      }
    };

    const editarComentario = async () => {
      try {
        const resposta = await fetch(`http://192.168.0.117:5000/api/comments/edit/${comentarioEditando._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: comentarioNovoTexto })
        });

        if (!resposta.ok) throw new Error("Erro ao editar comentário");

        const response = await fetch(`http://192.168.0.117:5000/api/comments/${motor._id}?userId=${user._id}`);
        const atualizados = await response.json();

        setComentarios(atualizados);
        setComentarioEditando(null);
        setComentarioNovoTexto('');

      } catch (err) {
        console.error("Erro ao editar comentário:", err)
      }
    };

    const adicionarFavorito = async () =>{
      try {
        console.log("ids no front", idUsuario, motor._id)
        await fetch("http://192.168.0.117:5000/api/favorites/add", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: idUsuario,
          motorId: motor._id,
        })
      });
    
      } catch (err) {
          console.error("Erro ao salvar favorito:", err);
      }
    };

    const deletarComentario = async (comentarioId: string) => {
      try {
        const resposta = await fetch(`http://192.168.0.117:5000/api/comments/delete/${comentarioId}`, {
          method: 'DELETE',
        });

        if (!resposta.ok) throw new Error("Erro ao deletar comentário");

        setComentarios(prev => prev.filter(c => c._id !== comentarioId));

      } catch (err) {
        console.error("Erro ao deletar comentário:", err);
      }
    };

    const responderComentario = async (novoTexto: string, parent: string) => {
      console.log("respondendo: ", parent)
      try {
        await fetch(`http://192.168.0.117:5000/api/comments/reply/${parent}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: idUsuario,
          userName: user.nome,
          text: novoTexto,
        })
      });
        const resposta = await fetch(`http://192.168.0.117:5000/api/comments/${motor._id}?userId=${user._id}`);

        const atualizados = await resposta.json();
        setComentarios(atualizados);

      } catch (err) {
          console.error("Erro ao responder comentário:", err);
      }
    };

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
          <PageTitle text={motor.modelo} />
          <NotificationBell/>
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

          <TouchableOpacity onPress={adicionarFavorito}>
            <Text style={{ color: 'salmon', fontSize: 16, marginTop: 8, textDecorationLine: 'underline' }}>Adicionar aos favoritos</Text>
          </TouchableOpacity>
        </View>

        {/* Comentários */}
        <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Comentários:</Text>

          {(() => {
  const mapaComentarios = new Map(comentarios.map(c => [c._id, c.userName]));

  return comentarios.map(com => {
    const nomePai = com.replyTo ? mapaComentarios.get(com.replyTo) : null;

    return (
      <View key={com._id} style={{ borderBottomWidth: 1, borderColor: '#ccc', paddingVertical: 8 }}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>{com.userName}</Text>

        {nomePai ? (
          <Text style={{ color: '#fff' }}>
            <Text style={{ color: '#ccc' }}>Em resposta a </Text>
            <Text style={{ color: '#ccc', fontWeight: 'bold' }}>{nomePai}</Text>: {com.text}
          </Text>
        ) : (
          <Text style={{ color: '#fff' }}>{com.text}</Text>
        )}

        {com.podeEditar && (
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 4 }}>
            <TouchableOpacity onPress={() => {
              Alert.alert("Excluir comentário", "Deseja excluir este comentário?",
                [
                  { text: "Cancelar", style: "cancel" },
                  { text: "Excluir", onPress: () => deletarComentario(com._id), style: "destructive" }
                ]
              );
            }}>
              <Ionicons name="trash-outline" size={20} color="#ccc" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setComentarioEditando(com);
                setComentarioNovoTexto(com.text);
              }}
            >
              <Ionicons name="pencil-outline" size={20} color="#ccc" />
            </TouchableOpacity>
          </View>
        )}

        {com.userId !== idUsuario && (
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
    );
  });
})()}

        </View>

        <View style={{
  marginTop: 24,
  marginHorizontal: 40,
  borderRadius: 10,
  paddingBottom: 60
}}>
  <AddComment
    visible={addCommentModal}
    onCancel={cancelarComentario}
    onSave={async (novoTexto) => {
      await adicionarComentario(novoTexto);
      setAddCommentModal(false); // fecha o modal ao salvar
    }}
  />
  <TouchableOpacity
    style={{
      backgroundColor: '#64a9ff',
      borderRadius: 10,
      padding: 12,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4
    }}
    onPress={() => setAddCommentModal(true)}
  >
    <Text style={{ color: '#111', fontWeight: 'bold', fontSize: 16 }}>
      Adicionar comentário
    </Text>
  </TouchableOpacity>
</View>


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
            /*onPress={}*/

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
          onPress={editarComentario}
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
        Responder {comentarioRespondendo?.userName}:
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
          onPress={async () => {
          await responderComentario(respostaTexto, comentarioRespondendo._id);
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