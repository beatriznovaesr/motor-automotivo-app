import React, { useEffect, useState } from "react";
import { View, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Card, Text } from 'react-native-paper';
import { NavigationMenu } from "../src/components/navigationMenu/navigationMenu";
import { ReturnButton } from "../src/components/returnButton";
import { PageTitle } from "../src/components/pageTitle";
import { useUser } from "../src/contexts/userContext";
import { NotificationBell } from "../src/components/notificationComponent/notificationBell";
export default function Favoritos() {
  const router = useRouter();
  const { user } = useUser();
  const [favoritos, setFavoritos] = useState([]);
  const [idUsuario, setIdUsuario] = useState("");
  const userEmail = user?.email;

  useEffect(() => {
            async function buscaUsuario() {
                try {
                    const resposta = await fetch(`http://localhost:5000/api/users/usuarios/${userEmail}`);
    
                    if (!resposta.ok) {
                        throw new Error("Falha ao buscar dados do usuário");
                    }
                    const dados = await resposta.json();
                    setIdUsuario(dados.id);
    
                } catch (error) {
                    console.error('Falha ao carregar dados do usuário:', error)
                }
            }; 
            buscaUsuario();
        }, [userEmail]); 

    useEffect(() => {
      const carregarFavoritos = async () => {
        if (!user?._id) return;

        try {
          console.log("log dentro do try", user._id)
          const response = await fetch(`http://localhost:5000/api/favorites/${user._id}`);
          const data = await response.json();
          setFavoritos(data);
          console.log(data);
        } catch (err) {
          console.error("Erro ao buscar favoritos:", err);
        }
      };
      carregarFavoritos();
    }, [user]); 

    

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#155fbf',
      width: '100%',
      gap: 6,
    }}>
      <ScrollView contentContainerStyle={{
        flexGrow: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 90,
        gap: 10
      }}>
        {/* Top Bar */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          paddingHorizontal: 16,
          marginTop: 30
        }}>
          <ReturnButton />
          <PageTitle text='Favoritos' />
          <NotificationBell/>
        </View>

        {/* Lista dinâmica de favoritos */}
        {favoritos.length === 0 ? (
          <Text style={{ color: 'white', marginTop: 20 }}>Nenhum favorito encontrado.</Text>
        ) : (
          favoritos.map((motor, index) => (
            <Card
              key={index}
              style={{
                width: '85%',
                backgroundColor: '#ffffff',
                borderRadius: 12,
                overflow: 'hidden'
              }}
              onPress={() =>
                router.push({
                  pathname: 'desenhoIndividualForum',
                  params: { motor: JSON.stringify(motor) }
                })
              }>
              <Card.Content>
                <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>{motor.modelo || 'Motor'}</Text>
              </Card.Content>
              <Card.Cover source={{ uri: motor.desenho }} resizeMode="contain" />
            </Card>
          ))
        )}
      </ScrollView>

      <NavigationMenu />
    </View>
  );
}

