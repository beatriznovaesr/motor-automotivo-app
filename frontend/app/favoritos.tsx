import React from "react";
import { View, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Card, Text } from 'react-native-paper';

import { NavigationMenu } from "../src/components/navigationMenu/navigationMenu";
import { ReturnButton } from "../src/components/returnButton";
import { PageTitle } from "../src/components/pageTitle";

export default function Favoritos() {
  const router = useRouter();

  const favoritos = [
    {
      modelo: "Motor exemplo",
      desenho: "https://upload.wikimedia.org/wikipedia/commons/5/57/Motor_Exemplo_1.png",
    },
    {
      modelo: "Motor exemplo",
      desenho: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Motor_Exemplo_2.png",
    }
  ];

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#155fbf',
      width: '100%',
      gap: 6,
    }}>
      {/* Header */}
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
          marginTop: 10
        }}>
          <ReturnButton />
          <PageTitle text='Favoritos' />
          <Link href='/'>
            <MaterialCommunityIcons name="bell-ring" size={40} color="white" />
          </Link>
        </View>

        {/* Lista de favoritos */}
        {favoritos.map((motor, index) => (
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
              <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>{motor.modelo}</Text>
            </Card.Content>
            <Card.Cover source={{ uri: motor.desenho }} resizeMode="contain" />
          </Card>
        ))}
      </ScrollView>

      {/* Footer */}
      <NavigationMenu />
    </View>
  );
}
