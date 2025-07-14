import React from "react";
import { View, ScrollView } from 'react-native';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { NavigationMenu } from "../src/components/navigationMenu/navigationMenu";
import { ReturnButton } from "../src/components/returnButton";
import { PageTitle } from "../src/components/pageTitle";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Card, Text } from 'react-native-paper';
import { NotificationBell } from "../src/components/notificationComponent/notificationBell";


export default function ResultadoPesquisa() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const pesquisa = Array.isArray(params.pesquisa) ? params.pesquisa[0] : params.pesquisa;
  const lista = JSON.parse(Array.isArray(params.motores) ? params.motores[0] : params.motores);

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
        {/* Topo da página */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          paddingHorizontal: 16,
          marginTop: 30
        }}>
          <ReturnButton />
          <PageTitle text={pesquisa} />
          <NotificationBell/>
        </View>

        {/* Lista de resultados */}
        {lista.length === 0 ? (
          <Text style={{ color: 'white', marginTop: 20 }}>Nenhum resultado encontrado.</Text>
        ) : (
          lista.map((motor, index) => (
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
                <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>
                  {motor.modelo || 'Motor'}
                </Text>
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
